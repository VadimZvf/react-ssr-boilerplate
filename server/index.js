const express = require('express');
const app = express();
const port = 8080;

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const config = require('../webpack/config.dev');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

// redirect api requests to api-server in dev mode.
// Only for devexperience
// In production this will do nginx
// Be careful because it can make infinity recursive requests
const apiServerPath = 'http://localhost:8081';
const proxy = require('http-proxy-middleware');

app.use('/api', proxy({ target: apiServerPath, changeOrigin: true }));

app.use(express.static('build'));

const serverRender = require('../src/root-server');

app.get('/*', serverRender);

/* eslint-disable no-console */
app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
/* eslint-enable no-console */
