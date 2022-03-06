const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  //针对antd实现按需打包:根据import来打包
  //自动打包相关样式,使用babel-plugin-import
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  // fixBabelImports("import", {
  //   libraryName: "@ant-design",
  //   libraryDirectory: "icons/es",
  //   style: "js",
  // }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
    },
  })
);
