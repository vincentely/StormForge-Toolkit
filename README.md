# StormForge-Toolkit

StormForge 面向本地合法安装的受支持游戏，提供资源索引、预览与 SFM 资产工作流。
本仓库是公开产品与发行面；核心产品仍由私有 StormForge 上游维护。

- 官网目标地址：[stormforge.vollagames.com](https://stormforge.vollagames.com)（本次尚未生产部署）
- [下载页](https://stormforge.vollagames.com/download/)（部署后可用；当前无公开稳定版或测试版）
- 集成说明：[Unity](integrations/unity/README.md) · [Unreal Engine](integrations/unreal/README.md)
- [发行规范](release/README.md) · [内容来源](docs/content-sources.md) · [部署说明](deploy/README.md)

## 内容与边界

包含 Astro 静态官网、中文公开用户文档、版本清单 Schema、发行验证、CI 和现有云服务器 nginx 配置。
插件源码目前未导入：公开许可证及对应正式 Release 尚待确认。未来仅保留与正式 Release 对应的已审核发行快照。

不包含 Editor / Server / Launcher / Client / Runtime 核心实现、游戏资源、数据库、缓存、用户数据、核心构建工具链或二进制。EXE、DLL、ZIP 只通过经验证的 GitHub Releases / 云服务器发行，绝不进入 Git 历史。

## 本地开发

Node.js >= 22.12.0；使用 package.json 固定的 pnpm 版本。

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

浏览器验收：`pnpm exec playwright install chromium`，启动 `pnpm preview --port 4321`，另一个终端执行 `node scripts/visual-check.mjs`。截图写入被忽略的 `artifacts/visual/`。

官网不使用 CMS、SSR、数据库、登录后台、广告或分析追踪。真实 manifest 放入 `release/manifests/stable.json` 或 `beta.json`，在构建时验证并静态渲染；不请求未经审查的远程清单。无 manifest 是正常的“尚未发行”状态，格式错误会使构建失败。

## 下载校验

每个真实下载须有版本、字节大小和小写 SHA-256。取得文件后比较：

```powershell
Get-Item .\下载的文件 | Select-Object Length
(Get-FileHash .\下载的文件 -Algorithm SHA256).Hash.ToLowerInvariant()
```

不同则停止安装。维护者须运行 `node scripts/validate-release.mjs --verify <manifest.json> <正式包目录>` 校验实际字节。清单通过不代表签名、授权或产品测试已经通过。

## 反馈与许可

通过 [Issues](https://github.com/vincentely/StormForge-Toolkit/issues) 提交非敏感问题。安全问题见 [SECURITY.md](SECURITY.md)。不要公开令牌、用户信息、数据库或游戏文件。

原创官网、文档和发行工具采用 [MIT](LICENSE)。此许可不覆盖私有核心、尚未导入的插件、游戏资源、第三方依赖或商标。StormForge 不分发原游戏资源；用户必须合法拥有并安装游戏，另行确认使用、导出及再分发权利。游戏和引擎名称仅用于兼容说明，不代表厂商关联或背书。

生产部署、微信审核及真实发行的剩余条件见 [上线阻塞](docs/launch-blockers.md)。
