const postcssNormalize = require('postcss-normalize');
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                ident: 'postcss',
                plugins: [
                    require('postcss-preset-env')({
                        autoprefixer: true,
                        stage: 3,
                    }),
                    require('postcss-px-to-viewport')({
                        viewportWidth: 375,  
                        unitPrecision: 5, 
                        viewportUnit: 'vw', 
                        selectorBlackList: [], 
                        exclude: [], 
                        minPixelVaule: 1, 
                        mediaQuery: false,
                        landscape: false,
                        landscapeUnit: "vw",
                    }),
                    postcssNormalize(),
                ],
            }
        }
    }
}