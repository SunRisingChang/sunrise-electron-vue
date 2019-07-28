//JS的校验规则，做代码统一风格规范

module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 设置解析器选项（必须设置这个属性）
  parserOptions: {
    parser: "babel-eslint"
  },
  // 指定你想启用的环境
  env: {
    browser: true
  },
  // 开启推荐配置信息
  extends: ["plugin:vue/essential"],
  //让eslint支持 vue
  plugins: ["vue"],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // 禁用 debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
