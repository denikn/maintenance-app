import PropTypes from 'prop-types';
import React from 'react';

import AppTheme from '../App/app.theme';

export default {
    childContextTypes: {
        muiTheme: PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: AppTheme,
        };
    },
};
