module.exports = {
    // publicPath: '/',
    devServer: {
      port: 3333,
      host:"172.16.10.186",
      host:"0.0.0.0",
      proxy: {  
        '/api': {
          target: '172.16.10.186:3333', //路径指向本地主机地址及端口号
          // target: '0.0.0.0', //路径指向本地主机地址及端口号
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