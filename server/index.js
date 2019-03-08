const appConfig = require('../src/config').default;
const express = require('express');
const app = express();
const port = 8080;

function renderFullPage(html, state) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="root">${html ? html : ''}</div>
        ${
            // TODO: refactor
            state
                ? `
        <script>
            window.${appConfig.preloadedState} = ${JSON.stringify(state || '').replace(/</g, '\\u003c')}
        </script>
        `
                : ''
        }
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

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

app.get('/*', async (req, res) => {
    if (appConfig.useSSR) {
        const { html, state } = await serverRender(req);
        res.send(renderFullPage(html, state));
    } else {
        res.send(renderFullPage('', null));
    }
});

/* eslint-disable no-console */
app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
/* eslint-enable no-console */
