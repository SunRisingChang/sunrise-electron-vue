const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // webpack的相关配置
  configureWebpack: {
    entry: "./src/renderer/main.js",
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts"],
      alias: {
        "@": resolve("src/renderer")
      }
    },
    module: {
      rules: [
        {
          test: /\.(html)(\?.*)?$/,
          use: "vue-html-loader"
        },
        {
          test: /.md$/,
          loader: "text-loader"
        }
      ]
    },
    devtool: 'source-map',
    //公共资源合并
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true
          },
          runtimeChunk: {
            name: "manifest"
          }
        }
      }
    },
    //性能警告修改
    performance: {
      hints: "warning",
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      }
    }
  },
  //打包输出路径
  outputDir: "dist/web",
  productionSourceMap: false,
  // 构建时开启多进程处理 babel 编译
  parallel: require("os").cpus().length > 1,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  //开发服务器http代理
  devServer: {
    open: !process.argv.includes("electron:serve"),
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:9999/",
        changeOrigin: true, //是否跨域
        ws: true, // 代理长连接
        pathRewrite: {
          "^/api": "/"
        } //重写接口
      },
      "/socket": {
        target: "ws://localhost:9999/",
        ws: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    //vue-cli-plugin-electron-builder配置
    electronBuilder: {
      builderOptions: {
        win: {
          // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
          icon: "public/electron-icon/icon.ico",
          artifactName: "${productName}_Setup_${version}.${ext}",
          target: [
            {
              // 打包成一个独立的 exe 安装程序
              target: "nsis",
              // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
              // 'arch': [
              //   'x64',
              //   'ia32'
              // ]
              arch: ["ia32"]
            }
          ]
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 130,
              y: 150,
              type: "file"
            }
          ]
        },
        mas: {
          icon: "public/electron-icon/icon.icns",
          entitlements: "public/entitlements.mas.plist",
          provisioningProfile: "embedded.provisionprofile"
        },
        mac: {
          icon: "public/electron-icon/icon.icns",
          category: "public.app-category.finance",
          entitlements: "public/entitlements.mac.plist",
          extendInfo: {
            ElectronTeamID: "electron-vue-sunrise",
            "com.apple.developer.team-identifier": "electron-vue-sunrise",
            "com.apple.application-identifier": "electron-vue-sunrise"
          },
          target: [
            {
              target: "dmg"
            },
            {
              target: "zip"
            }
            // {
            //   'target': 'pkg'
            // },
            // {
            //   'target': 'mas'
            // }
          ]
        },
        files: ["**/*"],
        asar: true,
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: true,
          // 安装图标
          installerIcon: "public/electron-icon/icon.ico",
          // 卸载图标
          uninstallerIcon: "public/electron-icon/icon.ico",
          // 安装时头部图标
          installerHeaderIcon: "public/electron-icon/icon.ico",
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
        }
      },
      chainWebpackMainProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
      chainWebpackRendererProcess: config => {
        config.plugin("define").tap(args => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
        config.resolve.alias.set('@', resolve("src/renderer"))
      },
      outputDir: "dist/electron",
      mainProcessFile: "src/main/main.js",
      mainProcessWatch: ["src/main"]
    }
  }
};
