const path = require('path');
console.log(path.resolve(__dirname, '../public/admin'))
module.exports = {
    outputDir: path.resolve(__dirname, '../public/admin'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9527'
            }
        }
    }
}