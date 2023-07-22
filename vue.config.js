const { defineConfig } = require('@vue/cli-service')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#459def',
            'link-color': '#2f54c9',
            'input-border-color': '#cdcdcd',
            'error-color': '#ff646c',
            'text-color-secondary-dark': '#FFFFFF',
            'font-size-base': '14px',
            'form-item-margin-bottom': '12px',
            'border-radius-base': '5px',
            'table-header-bg': '#f1f5f9',
            'tabs-card-head-background': '#f1f5f9',
            'descriptions-bg': '#f1f5f9',
            'text-color': '#343434',
          },
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: './src/pages/**/*.demo.vue', to: './public' }],
      }),
    ],
  },
})
