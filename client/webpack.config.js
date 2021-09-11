module.exports = {
  resolve: {
    alias: {
      // Alias for using source of BootstrapVue
      'bootstrap-vue$': 'bootstrap-vue/src/index.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // Exclude transpiling `node_modules`, except `bootstrap-vue/src`
        exclude: /node_modules\/(?!bootstrap-vue\/src\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
}
