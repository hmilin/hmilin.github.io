module.exports = {
  plugins: {
    "postcss-nested": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    doiuse: {
      browsers: [
        "Chrome >=88",
        "Firefox >=78",
        "Safari >=14.1",
        "Edge >=88",
        "iOS >=16"
      ],  // 目标浏览器列表
      onFeatureUsage: function (usageInfo) {
        console.log(usageInfo.message);  // 输出不兼容的特性
      }
    }
  },
};
