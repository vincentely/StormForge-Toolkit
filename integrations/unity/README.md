# Unity 集成：公开快照尚未发行

来源：StormForge `984837c730f18459d4e21a86c27f225389deb8c1`，`Packages/com.stormforge.unity/package.json`、`tools/distribution/Unity-README.md`，打包脚本第 581–582 行。

- 上游版本：1.2.0；SFM 0.99。
- 支持目标：Unity 2022.3、URP 14.0.12、Newtonsoft JSON 3.2.1。未承诺其他版本。
- 许可：尚未找到一方明确公开许可；未复制插件内容。本目录 README 采用仓库 MIT，不能推定插件许可。
- 当前文件范围：仅本说明。候选为上游完整 UPM 包，正式快照前须审核逐文件清单、依赖与许可证。

取得未来经授权的正式包后，将 com.stormforge.unity 复制到项目 Packages/，或通过 Package Manager 的 Add package from disk 选择 package.json。将完整 SFM 目录放入 Assets/，保留 .sfmb/.ktx2 依赖并选择 .sfm 导入。运行时使用 Unity 原生资产，不直接解析 SFM。

限制：公开许可证、对应正式 Release、文件哈希清单和公开验证结果尚缺。不得安装不存在的本仓库包，不得引入 Library、Temp、缓存、游戏资源或未经审核的二进制。所有权迁移前仅做正式 Release 发行快照，不在本仓库修改插件功能，不做双向同步。
