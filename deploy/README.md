# 现有云服务器静态部署准备

**内部测试部署已获明确授权（2026-09-18）。** 用户提供主体“杭州伏腊科技”和邮箱 dev@vollagames.com，并明确要求备案办理期间先部署测试。当前版本显示内部测试和备案办理中，设置 noindex；不作为微信审核官网。正式公开上线仍需真实产品截图、备案信息及完整隐私/协议资料。服务器为 runtime-only，只接收静态产物；禁止 npm build、CMake、MSBuild、docker build 或任何源码构建。不另建托管平台。

## 已核对的事实

来源 `984837c730f18459d4e21a86c27f225389deb8c1` 的 `config/editor.dist.json` 将 API 根固定为 `https://stormforge.vollagames.com`。上游 nginx 正式站代理 `https://127.0.0.1:19443`，beta 代理 18443。新配置仅为正式站 `/` 增加静态服务，`/v1/`、`/healthz` 继续代理；已核对两个 OAuth 回调均在 `/v1/oauth/` 下，query 原样保留。beta 整站保持原代理。

`deploy/nginx/stormforge.conf` 是内部测试部署配置，安装前须对比并备份线上版本。保留上游 TLS 1.2、证书路径与 loopback proxy_ssl_verify off，不在这次网站工作中改变 Server TLS 策略。`/srv/stormforge-site` 是建议的新静态目录，需在真实服务器确认无冲突后采用。当前没有独立产品下载目录映射，不承诺不存在的云下载 URL。

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

## 上传与切换（获得生产授权后）

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

检查首页、文档、404；比较部署前后 `/healthz`、无效凭据的 `/v1/auth/refresh`、无 state 的两个 OAuth callback 状态与内容类型，不应得到网站 HTML。避免真实登录写操作。实际 Editor 登录回归由有权限用户完成。TLS、代理可用性与 nginx 语法需要目标服务器实测，本地文本测试不替代这些验证。

## 回滚

保留最近已接受版本，不删除未知目录。将 `<previous-release>` 替换为刚记录的实际目录，使用新的临时链接 + `mv -Tf` 原子恢复 current。初次部署则恢复已备份的原 nginx 配置以回到全站代理，不臆造旧版本。恢复配置后运行 `sudo nginx -t`，成功才 reload，再复查 API、OAuth 和网站。失败时停止并保留日志，禁止在服务器尝试源码构建修复。
