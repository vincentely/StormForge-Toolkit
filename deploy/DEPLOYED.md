# 当前网站部署：正式公开上线

2026-10-20（Asia/Shanghai），用户明确授权网站正式上线。地址：https://stormforge.vollagames.com/。

- 源码提交：`c85a8dabdccc`。
- 静态包：`stormforge-site-c85a8dabdccc.tar.gz`，24080 字节。
- SHA-256：`16b8971f4fdad4cbac30d56d373dee00802ab7df26ff8545c2fc4f2ab0968d5a`。
- current → `/srv/stormforge-site/releases/c85a8dabdccc`。
- 上一版本：`/srv/stormforge-site/releases/caa3b42d1190`，保留供回滚。
- 配置与探测回执备份：`/var/backups/stormforge-site/20261019T162706Z-c85a8dabdccc`（服务器 UTC）。
- nginx 配置当前 SHA-256：`161157430f16eb94f7f3946330aa8452f1469b185ce0e12295fd96d37f71d6ae`。

移除网站内部测试标签与所有正常网页 robots noindex；仅 404 错误页保留 noindex。新增允许抓取的 robots.txt 与包含 7 个正式网页的 sitemap.xml。首页调整留白、能力分栏、介绍文案与移动排版，隐私/使用说明限定在实际网站范围。保留默认跟随系统的主题选择、真实备案、邮箱与产品发行状态。

现网 nginx 只删除静态 location 下的 X-Robots-Tag 行，没有覆盖配置模板；API、OAuth、beta、开发验证 include 与 TLS 均保留。服务器只接收本地静态产物，不构建源码。

验证：Astro check 无诊断；14 项测试、131 项内部链接、56 项主题/尺寸组合、21 项页面/尺寸检查、键盘与 200% 文字检查通过。服务器全部 7 页、图标、主题脚本、robots 与 sitemap 为 200；正式/beta health 为 200 JSON，两个无 state OAuth callback 均为 400 HTML，部署前后一致。外网 9 个网页/索引路径为 200 且无 noindex，sitemap 含 7 个 URL，首页字节哈希与本地相同；桌面与手机浏览器通过。截图：本地 artifacts/visual/public-live-desktop.png、public-live-mobile.png。

回滚：以临时链接 + 原子重命名恢复上一版本 current，同时从上述备份恢复 stormforge.conf，再 nginx -t 成功后 reload；这会恢复原内部测试收录设置。不得覆盖其他后续运维变更。

---

# 2026-10-20 品牌更新部署（历史记录）

更新日期：2026-10-20（Asia/Shanghai）。线上地址：https://stormforge.vollagames.com/。

- 网站源码提交：`caa3b42d1190`。
- 静态包：`stormforge-site-caa3b42d1190.tar.gz`，23865 字节。
- SHA-256：`4815372ef5eea662e7fc25681d91c0033613b42b8926323ce419c6d998a06cbf`。
- 当前目录：`/srv/stormforge-site/current` → `/srv/stormforge-site/releases/caa3b42d1190`。
- 上一版本：`/srv/stormforge-site/releases/ea21de1ca81f`，保留未删除。
- 本次服务器备份与验证回执：`/var/backups/stormforge-site/20261019T161449Z-caa3b42d1190`（目录时间为服务器 UTC）。
- 服务器现有 nginx 配置 SHA-256 为 `e45d421dbfe95114c761e5e3a984cfee0bdb629a1138dab97ecc786afca5242a`，本次前后完全一致；未覆盖旧仓库中的 nginx 模板，也未改 API、OAuth 或 TLS 设置。

本次上线网站名称“开物有方”、正式产品图标、介绍主页、备案号“浙ICP备2023045009号-2”及工信部备案链接、联系邮箱 dev@vollagames.com。产品仍称 StormForge。继续保留现有测试与 noindex 状态；备案完成不代表产品发行或账号服务协议已经定稿。

验证：本地 Astro check、14 项测试、132 项内部链接、56 项主题/尺寸组合及21项响应式检查通过；服务器 7 页、图标与主题脚本均 200，正式/beta 健康检查和两个 OAuth 无 state 回调前后响应一致。外网真实浏览器桌面/手机均成功；线上 HTML SHA-256 与本地构建完全相同，备案链接、默认系统主题和布局通过检查。截图位于本地忽略目录 artifacts/visual/kaiwu-live-desktop.png 与 kaiwu-live-mobile.png。

本次只上传本地构建静态包和切换脚本，在校验归档与当前配置哈希后原子切换 current；没有云端源码构建。回滚只需用临时符号链接和原子重命名将 current 恢复为上述上一版本，不需要恢复或覆盖 nginx 配置。

---

# 2026-09-18 初次部署记录

部署时间：2026-09-18 12:24 UTC。用户明确授权备案取得前先进行内部测试。

- 地址：https://stormforge.vollagames.com/
- 网站源码提交：`ea21de1ca81f`。
- 静态包：`stormforge-site-ea21de1ca81f.tar.gz`，12011 字节。
- SHA-256：`ed1d48fac0e4975d5dcab3ead2d1cbb2fe68ceac04b6452fe3f9633f7f176454`。
- 当前目录：`/srv/stormforge-site/current` → `/srv/stormforge-site/releases/ea21de1ca81f`。
- 原 nginx 配置备份：`/var/backups/stormforge-site/20260918T122403Z-ea21de1ca81f/stormforge.conf`。
- 生效配置：`/etc/nginx/sites-available/stormforge.conf`，SHA-256 `ad3d1531bdd2a538c6bd7ff5e471b0dbdfd510e65c67e0816a431e8f769902a7`。

仅上传本地构建的静态包、校验文件及运维配置/脚本，未在云端安装依赖或构建源码。包与配置均在服务器验证 SHA-256 后安装。原配置已备份，current 原子切换，nginx -t 与 reload 成功。

网站显示“杭州伏腊科技”、dev@vollagames.com、“内部测试”和“备案办理中”；HTML robots 与静态响应 X-Robots-Tag 均为 noindex, nofollow。此设置不构成访问控制，域名仍可公开访问。没有伪造备案号，没有发布核心产品 Release，也不用于微信审核。

## 实际验证

- 本地：Astro check、14 项测试、静态构建、125 项内部链接检查、公开文件扫描通过。
- 服务器：全部 7 个用户页面为 200，不存在页面为 404。
- 正式和 beta `/healthz` 在部署前后均为 200 JSON。
- 无 state 的 GitHub / 微信 callback 在部署前后均为 400 HTML；未知 API 路由和 beta 首页仍为 404。未执行真实账号登录或修改账号状态。
- 外网桌面浏览器首次访问成功，主体、默认系统主题、手动主题及刷新保留通过，截图在本地忽略目录 `artifacts/visual/deployed-desktop.png`。
- 后续本机外网连接间歇性关闭/重置，含未改变的 beta 域名；手机外网浏览器验收未完成。复查服务器 nginx 为 active、语法检查通过，站点与 API 均为 200；尚未确定外网连接问题原因，不将其描述为全面外网验收通过。

## 此次部署回滚

恢复上述备份文件到 `/etc/nginx/sites-available/stormforge.conf`，执行 `nginx -t`，成功后 reload。原配置将正式站恢复为全站 Server 代理，保留静态版本目录用于排查。不要删除未知文件或覆盖其他站点配置。回滚后再次确认 `/healthz` 和 OAuth 回调。
