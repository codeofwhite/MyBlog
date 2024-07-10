const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    //部署应用包时的基本 URL
    //相对 publicPath 的限制
    //相对路径的 publicPath 有一些使用上的限制。在以下情况下，应当避免使用相对 publicPath:当使用基于 HTML5 history.pushState 的路由时；当使用 pages 选项构建多页面应用时
    //publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
    publicPath: "./",

    //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'disk',

    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',


    //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
    transpileDependencies: true,

    //devServer 是一个本地开发服务器,会自动监听变化,自动打包构建,自动更新刷新浏览器
    devServer: {
        hot: true, //热加载
        host: 'localhost',
        port: 80, //端口
        https: false, //false关闭https，true为开启
        open: true, //自动打开浏览器
        proxy: {
            '/milliaApi': {
                target: 'http://xxx.xxxx/xxx/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/milliaApi': '/'
                }
            },
            /*
            其他基地址，项目如对接不同基地址数据且需交互http与https，
            修改public文件夹里的index.html在head中添加
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
            */
            '/MilliaOtherApi': {
                target: 'https://xx.xxx.xxxx/xxx',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/MilliaOtherApi': '/'
                }
            },
        }
    },

    //chainWebpack配置对象
    chainWebpack: config => {
        //配置title
        config.plugin('html').tap(args => {
            args[0].title = "millia's title";
            return args;
        })
        config.plugin('define').tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_OPTIONS_API__: 'true',
                __VUE_PROD_DEVTOOLS__: 'false',
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
            })
            return definitions
        })
    },
})