const path = require('path');
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/countries_practice/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        src: path.resolve('src'),
        utils: path.resolve('src/utils'),
        styles: path.resolve('src/styles'),
        assets: path.resolve('src/assets'),
        components: path.resolve('src/components'),
        services: path.resolve('src/services'),
        'vuex-store': path.resolve('src/store'),
      },
    },
  },
  css: {
    sourceMap: true,
    loaderOptions: {
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
