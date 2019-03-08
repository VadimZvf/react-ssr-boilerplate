import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import store from './store';
import { features } from './routes';
import App from './app';
import config from './config';

function renderFullPage(html, preloadedState) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="root">${html ? html : ''}</div>
        <script>
            window.${config.preloadedState} = ${JSON.stringify(preloadedState || '').replace(/</g, '\\u003c')}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

function renderStoreRouter(store, req, res) {
    const context = {};
    const componentStr = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    res.send(renderFullPage(componentStr, store.getState()));
}

function serverRender(req, res) {
    const dataRequirements = features
        .filter(route => matchPath(req.url, route)) // filter matching paths
        .map(route => route.component) // map to components
        .filter(comp => comp.fetchData) // check if components have data requirement
        .map(comp => store.dispatch(comp.fetchData())); // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
        renderStoreRouter(store, req, res);
    });
}

module.exports = serverRender;
