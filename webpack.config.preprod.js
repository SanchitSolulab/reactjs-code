let webpack = require('./webpack.config');
webpack.output.publicPath = 'https://dummy.hostname.com/';
module.exports = webpack;
