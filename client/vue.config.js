module.exports = {
  "devServer": {
    "proxy": {
      "/": {
        "target": "http://13.125.82.14:3000/",
        "changeOrigin": true
      }
    }
  },
  "publicPath": "./",
  "outputDir": "../server/public",
  "transpileDependencies": [
    "vuetify"
  ]
}