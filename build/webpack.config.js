// nodejs 环境
let config = {};

console.log('\033[45;37m 代码运行环境: \033[40;33m' + ' ' +process.env.NODE_ENV + '\033[0m' + '\n')

switch (process.env.NODE_ENV) {
    case 'development':
        config = require('./webpack.config.dev');
        break;
    case 'test':
        config = require('./webpack.config.test');
        break;
    case 'production':
        config = require('./webpack.config.prod');
        break;
    default:
        break;
}

module.exports = config;