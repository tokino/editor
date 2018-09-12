const common = require('./webpack.common')[0];
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	target: 'web',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true
	}
});