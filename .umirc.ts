import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'React Timeline Editor',
  favicon: '/assets/icon.png',
  logo: '/assets/icon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: {
    'en-US': [
      {
        title: 'Guide',
        path: '/en-US/editor',
      },
      {
        title: 'API',
        path: '/en-US/api',
      },
      {
        title: 'Engine',
        path: '/en-US/engine',
      },
      {
        title: 'TODO',
        path: '/en-US/todo',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/xzdarcy/react-timeline-editor',
      },
    ],
    'zh-CN': [
      {
        title: '指南',
        path: '/editor',
      },
      {
        title: 'API',
        path: '/api',
      },
      {
        title: '引擎',
        path: '/engine',
      },
      {
        title: 'TODO',
        path: '/todo',
      },
      {
        title: 'GitHub',
        path: 'https://github.com/xzdarcy/react-timeline-editor',
      },
    ],
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  styles: [`.__dumi-default-menu-header h1 {font-size: 24px}`],
  // more config: https://d.umijs.org/config
});
