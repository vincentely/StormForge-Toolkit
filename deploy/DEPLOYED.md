# 官网部署记录

## 2026-11-22　「山门鸣钟」首页上线

北京时间 23:46，正式站从 `3032befc3fa1` 切换到 `d0644b8c65b6`。首页通过原创机关呈现观物、格物、开物、造物。静态包为 1,960,080 字节，SHA-256 为 `d9f47a5ee0facb91598c1681c4b090ac5b26ae9817bc3754e1fd16ba2fd540c1`。[官网首页](https://stormforge.vollagames.com/)

- 公网按桌面 1440 × 1000 和手机 390 × 844 视口检查了首屏。钟声可以播放、停止并自然结束，默认规则在敲钟后 0.45 秒开门，切到「造物」可以改为敲两次。键盘切层、浏览器前进后退、320 像素窄屏和关闭 JavaScript 时的阅读与音频入口均已验证。[机关示例](https://stormforge.vollagames.com/#make)
- 源站和公网的 24 个静态文件逐项与本地构建一致。网站的 WAV 路径返回 `audio/wav`，支持 HTTP 206。下载页及兼容入口、beta ZIP 和校验文件通过核验，正式与 beta 账户服务健康。Windows 下载快照为 `89a5fd3631d63811b97ff5ae55374650f03c66da7278ab9d2137ec1b8ae82a8e`。[官网下载页](https://stormforge.vollagames.com/download/)
- 网站上一个版本、切换前的虚拟主机配置和回执保存在 `/var/backups/stormforge-site/20261122T154636Z-d0644b8c65b6-exi2pnmv`。本次 nginx 变更仅为官网钟声设置媒体类型，已通过语法检查并平滑重载。

## 2026-11-22　游戏支持清单与 Windows beta

官网功能页已发布 27 个具名游戏或版本、3 类通用来源，并单列仅登记的《炉石传说》。Editor 的「帮助 → 支持的游戏」显示每项能力与本机索引状态。官网清单和上游 README 已按全部来源逐行核对。[官网游戏支持清单](https://stormforge.vollagames.com/features/#supported-games)

StormForge Windows x64 beta 已在当日地址替换为更新序号 `7`，发布源码为 `95d798bcce82c952f10066ee118e4311d26a9f76`。固定地址和日期归档均从公网完整下载，大小为 65,832,545 字节，SHA-256 为 `fdbd0383a910f3b50c22dfee809faba46838cd0d3b57bf1a02ab5fb6a9582de6`。签名清单中的 Editor 与帮助面板实拍使用同一文件。[官网下载页](https://stormforge.vollagames.com/download/)

官网构建为 `3032befc3fa1`，静态包 SHA-256 为 `93f6b6fa367584d878a2950361b20e30c59ac01a8de1a060f3c5d65693863d35`。下载快照为 `89a5fd3631d63811b97ff5ae55374650f03c66da7278ab9d2137ec1b8ae82a8e`。

## 2026-11-22　StormForge beta 同日更新

StormForge Windows x64 beta 当天的下载包已更新至序号 `6`，含 StormForge MCP 0.99 和 Unity 接收端参考实现。发布源码为 `a10bd4bdbcd1486cecd029870dede15d44e83fc1`。官网的固定地址和日期地址均已从公网完整下载，大小同为 65,832,445 字节，SHA-256 为 `2821beedf7ae8dd04c4d71bc575516bd1ed315099e8d10a210f32bdc2840421e`。[官网下载页](https://stormforge.vollagames.com/download/)

下载快照为 `9d42881f21ea8fcca7332e99148fc7384f3630ddac785c02f238fb8ec95eb20e`。线上官网构建为 `ce71c9b6ec92`，静态包 SHA-256 为 `786f7f2fd6c2454fa82f301cd39147df8a8b8632a42ee7b22d294c61a3e4dd42`。两个下载入口、校验文件、签名清单与网页所示的摘要已核对。

官方 StormHub 已将同一隔离安装从序号 5 原地升级到 6。前两次下载遇到 Windows 12002 超时，正常重试后返回成功，安装状态为健康。安装后的 Editor 和 MCP 文件摘要均与签名清单一致。

## 2026-11-22　StormForge beta 固定下载地址

官网从 `ec2b9d705b84` 切换到 `a85c39819c50`。StormForge beta 的按钮与校验文件使用固定地址，当前版本为 `2026-11-22`，StormHub 更新序号为 `5`。dist 两个按钮继续显示「后续开放」。[官网下载页](https://stormforge.vollagames.com/download/)

- 新 ZIP 为 65,436,501 字节，SHA-256 为 `31bf3eea71af69f1370a53a8412e20d264d18a5753cc703fa45e2fedbbf5daeb`。固定直链和日期链接已从公网整包下载并核对，旧日期链接仍支持范围下载。[固定直链](https://stormforge.vollagames.com/downloads/packages/beta/editor/StormForge-beta-Windows-x64.zip)
- 官网静态包为 `stormforge-site-a85c39819c50.tar.gz`，1,355,177 字节，SHA-256 为 `aa24983e8fc83f0418c1abba60e370e43ccfcb6ad6c6959e1726eb0c5339831c`。旧官网备份为 `/srv/stormforge-site/backups/ec2b9d705b84.tar.gz`。
- 活动下载快照为 `8e1ec8ae03780ae3975724a3144800434e88bdffa76b19cce4a3fa31f4029bfd`。切换前的完整快照已备份到 `/srv/stormforge/backups/downloads/47d538eab36321e43fce8da2e28f088de79a0be92c86e1f9763eeb6dd6825c7d.tar.gz`，已核对归档摘要及其中的旧版 beta ZIP。

## 2026-11-21　稳定版网页下载暂缓开放

北京时间 23:46，正式网站从 `e8c491420c6e` 切换到 `ec2b9d705b84b58406cb5692b7ec9876e39f9479`。各下载页的 dist 产品按钮显示「后续开放」对话框，beta 提供原有 ZIP 与 SHA-256。两个通道的桌面更新清单已逐字节核对。

- 静态包 `stormforge-site-ec2b9d705b84.tar.gz`，1,354,994 字节，SHA-256 为 `162da67357aa4ead32be93a4ffe6aa54bc2f7945de6db65d3797bd2bc3eeb730`。
- 官网及旧入口 `/downloads/`、`/downloads/index.html` 直接返回相同网页。公网已核对两个 beta 包的范围下载和校验文件。
- 回滚回执位于 `/var/backups/stormforge-site/20261121T154607Z-ec2b9d705b84-5rp4__z0`，包含旧网站链接和网站下载路由配置。

## 2026-11-21　StormHub 和 StormForge 下载上线

北京时间 23:28，正式站切换到 `e8c491420c6e314ce2fd6d3b64cc4f4e79b8f1d9`。首页提供 Windows 下载入口，下载页提供 dist 和 beta 两个通道的 StormHub、StormForge ZIP、精确字节数和 SHA-256。安装指南涵盖首次安装、切换通道、更新和修复。

- 静态包 `stormforge-site-e8c491420c6e.tar.gz`，1,353,947 字节，SHA-256 为 `46e91f2824b83ee66f052f9470504faa8f4b800ceecc21d8ae46bf1f0a37c096`。
- 网站从 `0243c71c59df` 切换到 `e8c491420c6e`。正式虚拟主机加入网站专用的下载页配置。发行服务继续提供实时清单、通道签名、归档和校验文件。
- 源站验收覆盖网站、两个下载入口、两通道健康检查和 OAuth 回调。发行工具核对 4 个包、161 条路径。公网读取的首页、下载页、安装指南及 Hub 图标与本地构建逐字节一致，4 个 ZIP 均支持 HTTP 范围下载。
- 构建及公网文件校验见 [网站 CI](https://github.com/vincentely/StormForge-Toolkit/actions/runs/44919205734) 和 [四个 ZIP 的远程校验](https://github.com/vincentely/StormForge-Toolkit/actions/runs/44919411567)。
- 上一版网站、虚拟主机及实时列表的回滚回执位于 `/var/backups/stormforge-site/20261121T152837Z-e8c491420c6e-wbbm9uok`。回滚这次部署需一同恢复旧网站链接、虚拟主机配置和实时列表，随后检查配置并重载 nginx。

## 2026-11-06　CLI 实拍展区

2026-11-06 17:12（Asia/Shanghai），经用户授权更新正式官网。地址：https://stormforge.vollagames.com/#showcase。

- 源码提交：`0243c71c59df06d6fd53bb365fdb531ec876b947`。
- 静态包：`stormforge-site-0243c71c59df.tar.gz`，1332899 字节。
- SHA-256：`ab27fa98bd88f7eda3645e6fa9d4ed711c9f40dfada590a8f83f0bf04fa796c6`。
- current → `/srv/stormforge-site/releases/0243c71c59df`。
- 上一版本：`/srv/stormforge-site/releases/c85a8dabdccc`。
- 服务器验证回执：`/var/backups/stormforge-site/20261106T091216Z-0243c71c59df-YCiAPu`（目录时间为 UTC）。

首页展示吉安娜寒冰锥、兽族剑圣、人族战役第一章和艾泽拉斯山林。服务器校验本地构建包后原子切换静态目录。nginx 配置哈希部署前后一致，服务器通过语法检查。

线上首页及四张图均为 200，SHA-256 与本地产物一致。桌面和手机宽度下四图均成功解码，页面无横向溢出。正式和 beta 健康检查均为 200 JSON，GitHub 和微信无 state 回调均为 400 HTML。服务器同时验证六个内页、robots.txt 和 sitemap.xml。

回滚时先确认 current 仍指向本次版本，再使用临时符号链接和原子重命名切回上一版本。此次只切换了静态目录。

---

# 2026-10-20 官网正式公开上线（历史记录）

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
