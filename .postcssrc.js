// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿 1rem 的大小
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),

      // 适配的属性
      propList: ['*']
    }
  }
}
