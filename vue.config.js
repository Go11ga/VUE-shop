module.exports = {
    publicPath: '',
    filenameHashing: false,
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('html').tap(options => {
            options[0].minify = false;
            return options;
        });
    },
    /*
    configureWebpack: (config) => {
        return {
            devServer: {
                proxy: {
                    '/reactcourseapi': {
                        target: 'http://faceprog.ru',
                        secure: false,
                        changeOrigin: true
                    }
                }
            }
        }
    }
    */
}
