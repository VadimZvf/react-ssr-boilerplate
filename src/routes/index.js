import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../features/main';
import Login from '../features/auth';

// for server side rendering
export const features = [
    {
        component: Login, // should have async method 'fetchData' for preload data on server
        path: '/login',
        exact: true
    },
    {
        component: Main, // should have async method 'fetchData' for preload data on server
        path: '/',
        exact: false
    }
];

const Routes = () => (
    <Switch>
        {features.map((feature, index) => (
            <Route key={index} path={feature.path} exact={feature.exact} component={feature.component} />
        ))}
    </Switch>
);

export default Routes;
