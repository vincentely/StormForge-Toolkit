# Unreal Engine 集成：公开快照尚未发行

来源：StormForge `984837c730f18459d4e21a86c27f225389deb8c1`，`Plugins/StormForgeSfm/StormForgeSfm.uplugin`、同目录 README，打包脚本第 583–584 行。

- 上游版本：0.99.0（Version 99，Beta）；严格 SFM 0.99。
- 支持目标：Unreal Engine 5.8.1（CL 56057345，compatible CL 55116800），Windows Editor / Win64 Runtime。其他补丁及小版本须重新构建和验证。
- 许可：未找到明确公开许可；未复制源码、Content 或二进制。本说明的 MIT 不覆盖插件。
- 当前文件范围：仅本说明。候选快照包括描述符、Source、经授权的 Content 与自有文档；逐文件权属和哈希清单必须先审核。

取得未来授权的正式源码包后，将 StormForgeSfm 放入项目 Plugins/，启用插件并重启。用户本地需要 Visual Studio 2022 C++ 游戏开发组件与 Windows SDK，允许 UnrealBuildTool 编译模块。上游打包器不调用 RunUAT，不含预编译 UE DLL。

在 Content Browser 导入 .sfm，并保留 buffers/、textures/ 侧文件。游戏运行时仅使用 Runtime 模块；源文件解析在编辑器侧完成。复杂角色应使用顶层 aggregate，不能把单个 renderer partition 当作完整角色。

阻塞：公开许可证、正式发行与文件授权尚未确认。禁止 Binaries、Intermediate、Saved、第三方游戏资产和未审核二进制进入仓库。所有权迁移前只做正式 Release 的发行快照，不修改功能，不做双向同步。
