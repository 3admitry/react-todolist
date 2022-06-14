module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    '@storybook/addon-storysource',
/*    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.jsx?$/],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80, singleQuote: false,
            options: { parser: 'typescript' },
          },
        },
      },
    },*/
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}