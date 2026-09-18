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
