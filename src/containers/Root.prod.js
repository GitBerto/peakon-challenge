import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import AppPage from '../AppPage';

const Root = ({ store }) => (
    <Provider store={store}>
        <>
            <Route path='/' component={AppPage} />
            {/* Extend with other routes */}
        </>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root;