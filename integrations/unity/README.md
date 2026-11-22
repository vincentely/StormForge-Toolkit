# Unity 接收端

StormForge Windows beta 通过内置 MCP 提供接入规范、机器可读协议和 Unity 参考源码。开发版本为 0.99，UPM 包名为 `com.stormforge.unity`，清单版本为 `0.99.0`。

Agent 用 `resources/list` 发现资源，再用 `resources/read` 读取 `stormforge://transfer/receiver/unity-reference`。参考包使用 Unity 2022.3、URP 14.0.12 和 Newtonsoft JSON 3.2.1。自写接收端可按协议登记自己的版本，通过 StormForge MCP 完成预检、重建与回执查询。

本目录仅维护公开接入说明。参考包通过 StormForge 提供，其许可独立于本仓库文档的 MIT 许可。

来源为 StormForge 提交 `54ba0cb4b` 中的 `Packages/com.stormforge.unity/package.json` 和 `docs/EngineTransferReceiver.md`。
