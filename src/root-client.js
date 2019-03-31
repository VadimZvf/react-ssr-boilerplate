// ---- polyfills
import 'core-js/es6/promise';
import 'core-js/modules/es6.array.find';
import 'regenerator-runtime/runtime';
// ----

import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app';
import config from './config';
import history from './history';

const mount = config.useSSR ? hydrate : render;

mount(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);
