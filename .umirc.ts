import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'react timeline editor',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: '/assets/icon.png',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  styles: [`.__dumi-default-menu-header h1 {font-size: 24px}`]
  // more config: https://d.umijs.org/config
});
