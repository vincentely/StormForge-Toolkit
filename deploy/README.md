# 现有云服务器静态部署准备

**2026-10-20 用户已明确授权官网正式上线。** 主体为杭州伏腊科技，备案浙ICP备2023045009号-2，邮箱 dev@vollagames.com。移除内部测试标识与页面/响应头 noindex，提供 robots.txt 和站点地图。产品发行与账号服务政策另行管理。服务器为 runtime-only，仅接收本地构建的静态产物，不执行任何源码构建。

## 已核对的事实

来源 `984837c730f18459d4e21a86c27f225389deb8c1` 的 `config/editor.dist.json` 将 API 根固定为 `https://stormforge.vollagames.com`。上游 nginx 正式站代理 `https://127.0.0.1:19443`，beta 代理 18443。新配置仅为正式站 `/` 增加静态服务，`/v1/`、`/healthz` 继续代理；已核对两个 OAuth 回调均在 `/v1/oauth/` 下，query 原样保留。beta 整站保持原代理。

`/srv/stormforge-site/current` 指向当前网站版本。`deploy/nginx/stormforge.conf` 是模板，生产站点还包含账号和论坛路由。部署前备份并对比线上配置，保留现有站点及其 TLS、代理和 include。

正式域名加载本仓库的 `stormforge-site-download-pages.conf` 和发行服务原有的 `stormhub-downloads.conf`。网站把 `/download/`、`/downloads/` 和对应 HTML 地址映射到同一下载页，各入口遵循相同的通道开放状态。产品发布仓库维护签名清单、文件、ZIP 的路由和连接限制区。两个通道共用正式域名。初次接入时，备份线上虚拟主机，在原有发行服务 include 前添加网站 include，完成语法检查后 reload。

## 本地 / CI 准备

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm audit:public
# 源码须已提交、工作树干净
pnpm package:site
```

产物仅在被忽略的 artifacts/：`stormforge-site-<12位提交>.tar.gz`、`.sha256`、`.json`，包含版本来源、大小和小写哈希。发布前审阅包内容只含 dist 静态文件。CI 上传 dist 检查 artifact，不部署生产。

## 上传与切换

以下占位参数必须替换为实际经确认值；没有可用服务器凭据时不要运行。仅上传 tar.gz 与 .sha256，不上传仓库、node_modules 或核心产品。

```sh
scp artifacts/stormforge-site-<commit>.tar.gz artifacts/stormforge-site-<commit>.tar.gz.sha256 <ssh-target>:<approved-upload-directory>/
```

在服务器上使用已审核的实际文件名执行：

```sh
set -eu
cd <approved-upload-directory>
sha256sum -c stormforge-site-<commit>.tar.gz.sha256
tar -tzf stormforge-site-<commit>.tar.gz
# 检查全部成员是相对静态文件，无 ..、绝对路径、符号/硬链接。
# releases/<commit> 必须不存在；失败就停止，不覆盖已有版本。
mkdir -p /srv/stormforge-site/releases
mkdir /srv/stormforge-site/releases/<commit>
tar --no-same-owner --no-same-permissions -xzf stormforge-site-<commit>.tar.gz -C /srv/stormforge-site/releases/<commit>
test -f /srv/stormforge-site/releases/<commit>/index.html
```

确认 nginx 用户具有只读权限。初次部署先备份当前 nginx 站点文件与 include 关系，审查 `nginx -T` 的域名冲突，在正确 include 位置安装候选配置，保留其备份文件路径。当前 nginx 进程在 reload 前继续使用旧配置。

记录旧链接目标（首次安装可以不存在）：

```sh
readlink /srv/stormforge-site/current
```

使用实际审核版本执行原子切换；current 必须是符号链接或不存在，不能覆盖真实目录：

```sh
set -eu
test ! -e /srv/stormforge-site/current || test -L /srv/stormforge-site/current
test ! -e /srv/stormforge-site/current.next
ln -s /srv/stormforge-site/releases/<commit> /srv/stormforge-site/current.next
mv -Tf /srv/stormforge-site/current.next /srv/stormforge-site/current
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` 或 reload 失败立即按下节恢复旧链接与配置，禁止将失败描述为完成。已上线静态站切换后立刻生效，不依赖 reload；因此需先验证版本目录，再切换并检查。

切换后核对首页、安装文档、各下载页入口及 404。所有下载页入口应直接返回 200，并显示同一套按钮。当前稳定版按钮打开「后续开放」提示，测试版 ZIP 及校验文件可直接下载。比较两通道 `/healthz` 和签名清单的响应，确认桌面更新服务正常。

## 回滚

保留最近已接受版本，不删除未知目录。将 `<previous-release>` 替换为刚记录的实际目录，使用新的临时链接 + `mv -Tf` 原子恢复 current。初次部署则恢复已备份的原 nginx 配置以回到全站代理，不臆造旧版本。恢复配置后运行 `sudo nginx -t`，成功才 reload，再复查 API、OAuth 和网站。失败时停止并保留日志，禁止在服务器尝试源码构建修复。
