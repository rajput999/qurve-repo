const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  } else {
    console.log('Build completed!');
  }
});
