# Supreme Kitchen NZ — 官网与内部培训系统源码

本项目采用 **React 19 + TypeScript + Vite + Tailwind CSS** 构建，所有官网图片与静态资源均已打包在 `public/site-assets/` 与 `src/assets/` 目录中，无外部图片防盗链依赖，可直接部署到任意云平台。

## 1. 本地运行与打包测试

确保本地已安装 **Node.js 20+**，在解压后的项目根目录执行：

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发预览 (http://localhost:3000)
npm run dev

# 3. 生成生产环境静态文件 (输出至 dist/ 目录)
npm run build
```

---

## 2. 云端一键免费/低成本部署方案

### 方案 A：Cloudflare Pages（强烈推荐，因官网本身已接入 Cloudflare）
1. 将代码上传至您的 GitHub / GitLab 私有仓库（或直接在本地运行 `npm run build` 后上传 `dist` 文件夹）。
2. 登录 **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages**。
3. 若绑定 Git 仓库，构建参数填写：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 部署完成后，在 **Custom domains** 中绑定您的域名（如 `www.supremekitchen.co.nz` 或测试子域名），自动启用全球 CDN 与免费 SSL 证书。（项目已内置 `public/_redirects` 支持 `/about-us`、`/contact-us` 等子路径直接刷新）。

### 方案 B：Vercel 一键部署
1. 将代码推送到 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com) → **Add New Project** → 导入该仓库。
3. 框架预设会自动识别为 **Vite**，直接点击 **Deploy** 即可上线（项目已内置 `vercel.json` 路由重写规则）。

### 方案 C：传统云服务器 / Nginx / 虚拟主机（cPanel）
1. 在本地执行 `npm run build`，生成 `dist/` 文件夹。
2. 将 `dist/` 目录内的所有文件上传至服务器网站根目录（如 `/var/www/supremekitchen` 或 `public_html`）。
3. 若使用 Nginx，在站点配置中加入以下路由回退规则以支持子页面刷新：
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```
