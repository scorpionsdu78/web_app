module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://37.187.119.144:8080/compagnieServer/',
        pathRewrite: { '^/api': '/api' },
        changeOrigin: true,
        secure: false
      }
    }
  }
}
