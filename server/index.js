const appConfig = require('../src/config').default;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth').default;
const apiRouter = require('./routers/api').default;

const app = express();
const port = 8080;

app.use(cookieParser());

function getStateString(state) {
    return `<script>
                window.${appConfig.preloadedState} = ${JSON.stringify(state).replace(/</g, '\\u003c')};
            </script>`;
}

function renderFullPage(html, state) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="root">${html ? html : ''}</div>
        ${state ? getStateString(state) : ''}
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

app.use('/api', apiRouter);

app.use(bodyParser.json());
app.use('/auth', authRouter);

app.use(express.static('build'));

const serverRender = require('../src/root-server').default;

app.get('/*', async (req, res) => {
    if (appConfig.useSSR) {
        const { html, state } = await serverRender(req);
        res.send(renderFullPage(html, state));
    } else {
        res.send(renderFullPage(''));
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
