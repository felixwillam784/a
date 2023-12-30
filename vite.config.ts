import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import * as fs from 'fs';

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = env

  return {
    base: VITE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue-i18n',
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "element-plus/es/components",
        "@vueuse/core",
        "sortablejs",
        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
      ],
      esbuildOptions: {
        plugins: [
          {
            name: 'replace-feature-flags',
            setup(build) {
              build.onLoad({ filter: /vue-i18n/ }, async (args) => {
                // Replace feature flag globals with boolean literals
                const code = await fs.promises.readFile(args.path, 'utf-8');
                const transformedCode = code.replace(/featureFlag/g, 'true'); // Replace featureFlag with the actual flag value
                return { contents: transformedCode };
              });
            },
          },
        ],
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: 'localhost',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 线上API地址
          target: 'https://api.youlai.tech',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
    // 构建配置
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
        },
        format: {
          comments: false, // 删除注释
        },
      },
    },
  };
};
