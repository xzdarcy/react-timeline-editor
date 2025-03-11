import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@chromatic-com/storybook', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@/*': path.resolve(__dirname, '../src/*'),
    };

    config.module!.rules!.push({
      test: /\.less$/i,
      use: [
        // compiles Less to CSS
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    });

    return config;
  },
};
export default config;
