# 内容来源与公开边界

审计日期：2026-09-18。只读上游：`D:\StormForge`。
来源提交：`984837c730f18459d4e21a86c27f225389deb8c1`。
审计开始时已跟踪工作树无修改；本任务未修改上游。
未读取或复制 Library、LocalData、CascCache、build、Server/secrets、.env 或用户数据。打包脚本中的路径引用仅作为文本依据，不访问其构建产物。

| 公开表述 | 上游依据 | 采用范围 |
| --- | --- | --- |
| 本地索引、搜索、收藏、集合 | README.md；docs/ProjectStructure.md | 仅描述既有用户工作流，不披露实现源码 |
| MDX / M2 / WMO / ADT / M3 预览 | README.md 的 Implemented asset and preview paths | 不声称全部资源兼容或画面完全还原 |
| 场景与动画的限制 | README.md 的 Still intentionally incomplete | 明示跨游戏光照、材质和特效仍有缺口 |
| 完整解压、显式索引、Inspector 导出 | tools/distribution/README.md | Windows 10/11 x64、D3D12；原文称内部未签名预览包，不转换成稳定发行承诺 |
| SFM 0.99 | README.md；tools/distribution/README.md；tools/distribution/Unity-README.md | 保留 .sfm / .sfmb / .ktx2 依赖闭包 |
| Unity 1.2.0 | Packages/com.stormforge.unity/package.json；tools/distribution/Unity-README.md | Unity 2022.3，URP 14.0.12，Newtonsoft 3.2.1 |
| Unreal 0.99.0 Beta | Plugins/StormForgeSfm/StormForgeSfm.uplugin；同目录 README.md | UE 5.8.1 / Win64；SFM 0.99；不扩大兼容范围 |
| 打包范围 | tools/BuildStormForgeDistribution.ps1:581–600 | Unity 包和 Unreal 插件进入上游分发；不表示已签名或可公开授权 |
| 资源与第三方边界 | docs/LegalNotes.md；tools/distribution/README.md | 不分发原游戏资产，不将项目许可视为第三方内容授权 |
| 账号门禁 | README.md；config/editor.dist.json | 当前正式配置声明 GitHub 登录，不声称微信登录可用 |
| 部署根与代理 | config/editor.dist.json；Server/deploy/nginx/stormforge.conf | 域名不变；正式 Server 19443、beta 18443；保留既有 TLS 设置 |
| OAuth 路由 | Server/src/ServerApplication.cpp 路由注册行 299–311（只读定点查询） | GitHub/微信 callback 均在 /v1/；没有复制任何 Server 实现 |

## 插件与许可证结论

已跟踪根目录及两个插件路径未找到明确的一方公开 LICENSE；Unity package.json 没有 license 字段，Unreal 描述符无许可声明。第三方许可证不授予 StormForge 插件自身的公开许可。两个插件都停止复制；本仓库仅存原创的集成说明。未导入 uasset、插件源码或第三方二进制。

## 真实截图审计

本次公开网站采用 **0 张产品截图**。无 AI 图、第三方游戏 Logo 或宣传图。

| 上游候选 | 审核结果 |
| --- | --- |
| docs/Goals/CATALOG-PREVIEW-INDEX/evidence/CPI-006/screenshots/Editor_AssetBrowser_Toolbar.png | 已实际查看。内部探针资源、紫色诊断视图和机器构建路径；不适合作为公开产品展示，未复制 |
| docs/Goals/CATALOG-PREVIEW-INDEX/evidence/CPI-008/screenshots/WoW_Model.png、WC3_Object.png、SH2R_Scene.png 等 | 已枚举到真实文件，但第三方资源的公开使用权未确认；不采用，不声称逐张视觉验收 |
| docs/evidence/wow-assets/m2-closeout/*/editor.png | 资源问题排查证据，未获公开展示授权；不采用 |

### 待采集清单

1. 实际 Editor 主工作区：使用一方自有或明确授权的合成模型，显示资产浏览器、Inspector 和预览；清除用户名、机器路径、账号与诊断覆盖层。
2. 实际 SFM 导出操作及完成状态：使用同一合成模型，保留真实版本与可复现步骤。
3. 实际 Unity / Unreal 导入结果：对应已验证引擎版本，不展示第三方游戏资产。

每张截图须记录上游 SHA、产品版本、采集日期、操作步骤、素材权属与公开许可、原始文件 SHA-256。允许裁切或脱敏时记录处理，禁止生成或重绘冒充实机截图。

当前网页 QA 截图仅证明官网布局，绝不作为产品实机截图。缺少合格实机视觉资料时禁止部署为微信审核官网。

## 内部测试部署补充（2026-09-18）

用户在本任务中提供运营主体展示名称“杭州伏腊科技”、联系邮箱 dev@vollagames.com，并明确要求备案取得前先部署用于内部测试。页面据此展示主体、邮箱及“备案办理中”，不添加公司法定全称、备案号码或未经提供的证明。该授权不等同于正式协议定稿或微信审核通过。

## 开物有方介绍主页更新（2026-10-20）

- 网站名称“开物有方”、备案号“浙ICP备2023045009号-2”由用户在本任务明确提供；联系邮箱沿用已确认的 dev@vollagames.com。备案号链接至 https://beian.miit.gov.cn/；未声称已独立查询数据库核验。
- 新增只读上游来源提交：`494d132a768736a1656d16c9cf50e7dd82c34f50`。本次读取的 README.md、docs/AssetResearchPreviewScope.md 与图标路径均无未提交修改。
- 首页定位依据最新 README.md、docs/AssetResearchPreviewScope.md：本地游戏资源的学习、研究、检查与预览；只读来源；不提供 Mod 制作或写回；不承诺原客户端画面等价。未将规划中的 Probe 或 Runtime 能力包装为已发行功能。
- 用户已明确说明产品图标完成并要求采用上游图片。采用 `assets/stormforge/stormforge-icon-108.png`，逐字节复制到 `public/images/stormforge-icon.png`，用于页头、产品介绍和 favicon；没有生成、重绘或修改图片。
- 图标尺寸 108 × 108；SHA-256：`1f2f44f28da51c5d120759d8134c2b9b2902c586614afe92d7dd9af8ceafc9e8`。该图是产品标识，不是产品实机截图；品牌图标不受本仓库 MIT 许可授权，不转授品牌权益。
- Unity package.json 同次复核为 1.3.0，目标仍为 Unity 2022.3 / URP 14.0.12。只更新说明，不复制插件。
- 未读取缓存、游戏原始资源、数据库、用户数据或秘密；未修改、构建上游。旧审计记录仍保留为历史，不代表最新能力范围。

## 2026-10-20 官网正式公开

用户明确授权移除内部测试与 noindex，并更新云服务器。整理首页介绍与排版，新增 robots.txt、7 个公开网页的 sitemap.xml。网站隐私说明的 nginx 日志轮转信息来自现网 /etc/logrotate.d/nginx（daily、rotate 14）；产品发行状态保持据实展示。

## 2026-11-06 首页 CLI 截图

用户确认持有本次截图用于 StormForge 产品官网公开展示的授权，并要求直接使用。权利确认来自用户，未收到书面许可副本。公开文件仅包含四张截图。根据画面筛掉调试视图、被覆盖的主体和测试过程帧，保留角色轮廓清晰、场景可辨识的取景。

采集证据在相邻的 `StormForgeRef`，图片各有原始回执。只读核对 StormForge CLI 文档的上游提交为 `99d1418805f38cf27bec2b0164be0c65d311a952`。历史回执未记录各采集时的源码提交，不能以文档核对提交替代构建身份。日期按 Asia/Shanghai 记录。

| 网站文件 | 原始截图（相对 StormForgeRef） | 采集 |
| --- | --- | --- |
| `jaina.webp` | `CatalogRefactor20261023/hots-jaina-final.png` | 2026-10-24，Editor 0.5.3 Release，CLI 离屏 M3 模型 |
| `blademaster.webp` | `captures/wc3-301-20261023/blademaster-sd-framed.png` | 2026-10-23，Editor 0.5.3 Release，CLI 离屏经典 MDX 模型 |
| `human-campaign.webp` | `20261023t140927322z_wc3-301-human01-close_f8129_n1_4306aaf8b2de/viewport.png` | 2026-10-23，Editor 后台 CLI 视口，加载 `human01.w3m` 后取景。回执未记录产品版本 |
| `azeroth.webp` | `WorldHiddenCapture/StormForge World Explorer_wow-1215-azeroth-20261027.png` | 2026-10-27，World Explorer 后台 CLI 截取 Ready 帧。回执版本 0 为采集契约版本，未记录产品版本 |

裁切移除空白边缘或视口界面，按原像素大小转为无损 WebP。坐标为左、上、右、下，右下边界不包含在内。

| 网站文件 | 裁切 | 原始 PNG SHA-256 | WebP SHA-256 |
| --- | --- | --- | --- |
| `jaina.webp` | 230, 210, 1190, 750 | `f15e3db62b4259b5da99097ac35a86dc7994206308769ce1371a3fbc873d10ea` | `787a705a7a32da3188b3f0e10a6a6840af51bf359c2f5c531e5e53cae8c4119c` |
| `blademaster.webp` | 150, 220, 1110, 760 | `d4cde05f30b8e159fe8b80708fe2f62e83f8f925dd98541ea13fee3daa8057b9` | `63d643e2f91a9db05ea2a4d7649c7a1a66763fe753d98b35118aaf662355dd64` |
| `human-campaign.webp` | 118, 45, 678, 360 | `785d2280dc0bd282592cbc096713668fad0be2e813287f88411dab8e964cebe9` | `17f023ebea11da2fd40f39f3837b6400be5c31738c9de1a2b6e2cad3f8bb4e24` |
| `azeroth.webp` | 100, 177, 1028, 699 | `4d2392e93da6f1a3efc298acec7a679a537875ccd3788421ad30238cf6098528` | `ceaa26978870e18d265dc5b90d0d904f83585a8da9637c09291867bca9c5c3b5` |

### 吉安娜重拍

2026-11-06 使用 StormForge Editor 0.5.3 Release 的 CLI 离屏渲染重新采集，比较寒冰锥与寒冰箭动作和多个镜头后，采用寒冰锥的模型动作 `Spell C`（序列 6），固定在 230 毫秒。透视镜头偏航 −15°、俯仰 5°、距离 4.6、目标 (0.30, 1.32, 0)、垂直视场角 43°。

- 原始截图为相邻目录中的 `StormForgeRef/captures/website-hots-20261106/jaina-cone-r2.png`，同目录保存同名 JSON 回执。采集的 Editor SHA-256 为 `4f857a58d306e528e185ccfc8574cde07e4e56127ca259a1355d4ba8e986dd0a`。上游核对提交仍为 `99d1418805f38cf27bec2b0164be0c65d311a952`，采集回执未记录该二进制的源码提交。
- 原始 PNG 为 1280 × 720，SHA-256 为 `0aea945d775ff9f0c97c983a500cdec5427915d58818984542344900b0f4e91b`。
- 裁切坐标为 (0, 85, 1104, 706)，无缩放。新图 `jaina-cone-of-cold.webp` 为 1104 × 621 的无损 WebP，SHA-256 为 `2f61140d83fb4abce06eb571daf6da93b07f0c8c083c95341a7ec4ea3c8161fd`，替换初版站姿 `jaina.webp`。

## StormHub 与 Windows 发行

2026-11-21 的 StormHub 图标直接取自已发程序共用的 `assets/hub/stormhub.ico` 的 256 像素 PNG 图层。
两个产品、两个通道的 ZIP 大小和 SHA-256 已与官方签名通道及独立 Windows 验收回执核对。
Hub 发布构建来源为 `95b71a2de`，StormForge 为 `94e3cd035`。网站公开数据仅列出发布版本与归档校验信息。

## 游戏支持清单

2026-11-22 的公开清单对应 StormForge 提交 `95d798bcce82c952f10066ee118e4311d26a9f76`。`src/supported-games.md` 同步上游 README 的 Source Coverage 表格，官网功能页直接渲染该文件。具名游戏与通用来源的分类取自 GameRegistry，索引域取自 CatalogIndexerRegistry，场景范围按 World Explorer 的实际入口和启动条件核对。Editor 帮助中的本机来源与索引进度只在用户设备上显示。
