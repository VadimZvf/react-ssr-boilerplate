// ---- polyfills
import 'core-js/es6/promise';
import 'core-js/modules/es6.array.find';
import 'regenerator-runtime/runtime';
// ----

import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import config from './config';

const mount = config.useSSR ? hydrate : render;

mount(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);