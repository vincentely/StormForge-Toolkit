# Unity 接收端

StormForge Windows beta 在 Editor 安装目录中提供 `Unity/StormForge-Unity-Reference.zip` 和 `Unity/README.md`。从官网下载 ZIP 或使用 StormHub 安装均可获得这两个文件。将 README 和目标工程路径交给 Agent，可将 `com.stormforge.unity` 安装为工程内的嵌入包。开发版本为 0.99，UPM 清单版本为 `0.99.0`。

Agent 可通过 StormForge MCP 的 `resources/read` 读取 `stormforge://transfer/receiver/unity-installation` 和 `stormforge://transfer/receiver/unity-reference`，分别获得同一份指南和 ZIP。参考包使用 Unity 2022.3、URP 14.0.12 和 Newtonsoft JSON 3.2.1。自写接收端可按协议登记自己的版本，通过 StormForge MCP 完成预检、重建与回执查询。

本目录仅维护公开接入说明。参考包通过 StormForge 提供，其许可独立于本仓库文档的 MIT 许可。

来源为 StormForge 提交 `be131821b64afad1a08798793fe5173ef8f7be89` 中的 `Packages/com.stormforge.unity/package.json`、`docs/EngineTransferReceiver.md` 和 `tools/distribution/Unity-README.md`。
