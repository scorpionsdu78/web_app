module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
        secure: false
      }
    }
  }
}
