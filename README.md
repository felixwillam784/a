1. npm install
2. npm run dev
3. 浏览器访问 http://localhost:9527

### 项目部署

- 本地打包

  ```
  npm run build:prod
  ```

  生成的静态文件位于项目根目录 dist 文件夹下

- nginx.cofig 配置

  ```
  server {
      listen     80;
      server_name  localhost;

      location / {
          root /usr/share/nginx/html/web;
          index index.html index.htm;
      }

      # 代理转发请求至网关，prod-api标识解决跨域问题
      location /prod-api/ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass https://api.youlai.tech/;
      }
  }