module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://172.26.7.207:3000/',
                changeOrigin: true
            }
        }
    },
    publicPath: "./",
    outputDir: "../server/public"
}
