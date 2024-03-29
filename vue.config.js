module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/compagnieServer/',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
        secure: false
      }
    }
  }
}
