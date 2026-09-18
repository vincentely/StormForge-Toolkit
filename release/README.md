# 发行清单 v1

`schema/manifest.v1.schema.json` 定义清单结构。`examples/*.example.json` 是故意不可下载的样例：保留域 example.invalid 和全零示意哈希，不对应真实文件，不用于网站，也不得改名为 latest.json。

正式清单放入 `release/manifests/stable.json` 或 `beta.json`。当前没有正式清单，不创建空文件。官网在构建时读取并严格验证；缺失显示“尚未公开发布”，非法内容使构建失败。稳定版必须是最终版本，beta 必须含 prerelease 标识。添加新平台或下载域名必须经过 Schema/校验规则审查。

## 发行顺序

1. 私有上游完成核心构建、测试、签名、许可闭包审计与包冻结。记录源提交及脏工作树状态；不可复现的临时产物不作为正式来源。
2. 授权插件快照记录许可证、版本、支持范围、文件清单和源提交。不得从 Toolkit 反向修改或同步上游。
3. 计算冻结包的字节大小和小写 SHA-256，生成精确 HTTPS 下载地址与对应 GitHub Release 镜像地址。文件名必须含版本，无路径或 `..`。
4. `node scripts/validate-release.mjs --verify manifest.json /path/to/frozen-artifacts` 校验真实字节。脚本不下载和构建核心产品。
5. 在获得真实包和通过门禁后创建相应 GitHub Release 并上传文件，beta 标记 prerelease。逐个检查远端文件大小与哈希，最后提交正式清单、构建官网。
6. 网站与云部署遵循 deploy/README.md；CI 不自动创建产品 Release 或部署生产。

默认 `pnpm validate:release` 校验 Schema、日期、轨道、文件名、URL 与 SHA-256 格式。它**不表示实际包字节已经校验**。本地 `--verify` 对比实际文件。手动 release-validation 的 verify_remote 检查两个公开 HTTPS 地址的实际字节；不要在发布文件尚不可用时提交真实清单。

仅允许 stormforge.vollagames.com 与本仓库 GitHub Releases 的 HTTPS 地址，无凭据、端口、查询参数或片段。版本说明必须来自同一允许域。正式下载没有广告或跟踪跳转。增加其他云下载域需明确审核。
