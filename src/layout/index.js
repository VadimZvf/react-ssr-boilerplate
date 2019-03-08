import * as React from 'react';
import propTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <div>
            <div>its header</div>
            {children}
            <div>its footer</div>
        </div>
    );
};

Layout.propTypes = {
    children: propTypes.node
};

export default Layout;
