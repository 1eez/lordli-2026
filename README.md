# lord Li 个人官网 · 首页预览

Node.js 24.16.0，Astro 静态输出。当前版本用于设计评审，尚未替换线上站点。

```sh
npm ci
npm run build
npm run preview -- --port 4321
```

打开 http://127.0.0.1:4321/ 。构建时会生成全文搜索索引；`npm run dev` 可实时开发，但首次搜索需要先构建索引并使用 preview。

当前 Astro 的预览命令会启动后台服务，可使用 `npx astro preview status` 查看状态、`npx astro preview stop` 停止服务。

## 已实现

- 艺术展陈式首页、响应式样式、章节标题错峰显现及减少动态效果支持。
- `lord Li` 原创 SVG 字标；精简版洛伦兹轨迹在进入页面时描绘一次，作品展板支持轻微悬停与键盘聚焦反馈。
- 洛伦兹标题链接到维基百科；σ、ρ、β 滑块实时重绘，支持重置经典参数。收敛时显示稳定点，关闭 JavaScript 时仍保留静态图形和百科链接。
- 六大栏目入口、首页精选与独立 `/work/` 作品集；10 件作品按小游戏、小程序、公众号排列，支持二维码放大、保存和查看原图。
- 首页中英文文案切换；31 篇文章、4 个个人资料页面保留旧站原文语言。
- 7 篇乐理文章阅读页及 `/data/v1/music-theory/` 静态 JSON 输出。
- Pagefind 全文搜索、`⌘K / Ctrl+K`、移动端导航。
- 正式文章位于 `src/content/articles/`，发布产物仅位于 `dist/`。

当前阅读页是首页入口的基础配套。完整双语文章、正式语言 URL、最终 SEO 元数据、站点地图和旧链接重定向按设计方案后续实施。预览页面暂设 `noindex, nofollow`，正式发布前需按生产域名配置替换。

## 主要文件

- `src/pages/index.astro`：首页内容与布局。
- `src/pages/work.astro`：完整作品集页面，分类及数量随作品清单更新。
- `src/data/works.ts`：作品清单、类别、顺序、首页精选及可选的中英文简介。
- `src/components/WorkCard.astro`：首页和作品页共用的二维码作品展板。
- `src/styles/portfolio.css`：作品区、作品集页面和宽幅二维码弹窗样式。
- `src/styles/global.css`：视觉变量、版式、响应式和动效。
- `src/lib/interactions.ts`：搜索、二维码、语言切换与菜单。
- `src/lib/content.ts`：原始 Markdown 的构建时读取与渲染。
- `src/content/articles/`：35 个迁入项目的 Markdown 内容文件，不依赖原备份仓库。
- `src/components/Wordmark.astro`：原创小写 SVG 字标。
- `scripts/generate-lorenz.mjs`：使用 RK4 积分生成精简版洛伦兹吸引子，运行 `node scripts/generate-lorenz.mjs` 可重新生成 SVG。
- `src/lib/lorenz.mjs`：构建与浏览器共用的 RK4 求解、轨迹投影及稳定点判断。
- `src/lib/lorenz-controls.ts`：参数滑块、数值显示、限频重绘与重置。
- `src/data/music.json`：参考小程序文件取得的乐理内容快照，网页与 JSON 保持同源更新。
- `public/fonts/`：本地托管字体与 OFL 授权说明。

乐理内容当前为一次性导入快照。后续确定内容维护方案后，再接入构建时统一导出流程；现有小程序没有改动。

原站文章来源：`1eez/2023_SouceCode_Backup` 的 `MkDocs/lordsite/docs`，提交 `cabc9683df6aa3365068cf0b45c6d4f049a4ea43`。所需文章与图片均已迁入正式内容和素材目录；临时下载目录已清理。
