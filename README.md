# 岛藏 · Island Atlas

一个从零实现的《集合啦！动物森友会》收集手册。界面采用独立的书面图鉴设计，代码使用原生 ES Modules，无运行时依赖，可直接作为 Cloudflare Workers 静态资源部署。

## 功能

- 80 种鱼、80 种昆虫、40 种海洋生物：南北半球、月份、小时、场所、天气与鱼影筛选。
- 「此刻能遇见」按本机日期时间列出当前生物，可只看未收集并直接标记。
- 43 件艺术品：类型、真伪与收集状态筛选，真赝说明和图片对照。
- 107 张唱片：中英文名称、封面、价格、获取方式与说明。
- 417 位小动物：种族、性别、性格、生日、爱好与联动组合筛选。
- 大头菜计算器：买入价和 12 个卖价时段、价格区间图表、走势参考概率；未知价格可留空，价格单独保存在浏览器。
- 排序、分类与总进度、批量标记、批量撤销。
- 浏览器本地保存、多标签页同步、JSON 导入导出；兼容旧版数组备份和版本 1 备份，并保留当前图鉴不认识的 ID。
- 图片懒加载、失败重试和恢复联网后重试；响应式手机布局。

小动物仅用于浏览，不计入收集进度；可收集总数为 350 项。

## 本地运行

需要通过 HTTP 打开 ES Modules。可直接使用 Wrangler：

```bash
npm install
npm run dev
```

也可使用任意静态 HTTP 服务，例如在此目录运行：

```bash
python3 -m http.server 8080 --directory public
```

## 检查与测试

```bash
npm run check
npx wrangler deploy --dry-run
```

单元测试覆盖目录数量、全生物在两个半球和全部月份/小时的可用性、分类筛选、排序、时间标签、备份格式，以及大头菜走势识别、未知买入价、近似匹配和价格校验。

## 部署到 Cloudflare Workers

准备 Cloudflare 账号和 Wrangler 登录凭据后运行：

```bash
npm install
npm run check
npm run deploy
```

`wrangler.jsonc` 只将 `public/` 作为静态资源上传，不需要 Worker 脚本、数据库或构建步骤。记录保存在访问者浏览器，不上传到 Cloudflare。

## 文件结构

| 路径 | 用途 |
| --- | --- |
| `public/index.html` | 语义化页面、图标与对话框 |
| `public/styles.css` | 独立视觉系统与响应式布局 |
| `public/app.js` | 页面渲染和交互 |
| `public/catalog.js` | 筛选、半球、时段、排序和进度逻辑 |
| `public/store.js` | 本地收集记录与备份 |
| `public/turnip.js`、`public/turnip-view.js`、`public/turnip.css` | 大头菜预测逻辑、界面与样式 |
| `public/vendor/turnip-calculator/` | 固定版本的本地 WebAssembly 算法与 MIT 许可 |
| `public/data/` | 未改动的原始游戏资料及稳定 ID |
| `tests/` | Node.js 单元测试 |

## 资料与图片

游戏资料沿用项目的已核对数据集，图片来源与权利归原权利人所有。主要资料来源为 BWIKI、Nookipedia、Animal Crossing Wiki、Future Press 官方攻略补充册及原项目 README 列出的社区原始数据表。图片需要联网加载，文字筛选和收集记录不依赖图片服务。


## 大头菜算法

复用 [elxris/Turnip-Calculator](https://github.com/elxris/Turnip-Calculator) 的 WebAssembly 预测核心和走势评分、权重，固定版本为 `bbed92b0d64d8d6925df34a72c45c819acb25f2e`。算法文件随静态资源部署，不请求外部预测服务，不需要新增运行时依赖或构建步骤。来源、适配说明和 MIT 许可保存在 `public/vendor/turnip-calculator/`。

界面中的概率是原项目的启发式参考权重。已录入价格与所有走势均不完全匹配时，会明确提示近似估计；未知买入价按 90–110 铃钱估算。价格记录独立于收集记录，不包含在收集备份中；可用「清空价格」开始新一周，不自动清除旧价格。
