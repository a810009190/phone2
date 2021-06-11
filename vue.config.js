module.exports = {
    devServer: {
      proxy: {  
        '/api': {
          target: '0.0.0.0', //路径指向本地主机地址及端口号
          post: 8080,
          ws: true, 
          changeOrigin: true,
          pathRewrite: {
              '^/api': '/data' //路径转发代理
                }
            }
        }
    }
}