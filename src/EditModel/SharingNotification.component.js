import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import Paper from 'material-ui/Paper/Paper';

function SharingNotification({ modelType, style }, { d2 }) {
    const createPublic = d2.currentUser.canCreatePublic(d2.models[modelType]);
    const createPrivate = d2.currentUser.canCreatePrivate(d2.models[modelType]);
    const notificationStyle = Object.assign({}, style, {
        background: 'none',
        margin: '14px 0 0 -4px',
    });
    const notificationTextStyle = {
        verticalAlign: 'super',
        lineHeight: '24px',
        paddingLeft: '.5rem',
    };
    let toRender = null;

    if (createPublic) {
        toRender = (
            <Paper style={notificationStyle} zDepth={0}>
                <FontIcon className="material-icons">lock_open</FontIcon><span
                style={notificationTextStyle}>{d2.i18n.getTranslation('object_will_created_public')}</span>
            </Paper>
        );
    } else {
        if (createPrivate) {
            toRender = (
                <Paper style={notificationStyle} zDepth={0}>
                    <FontIcon className="material-icons">lock</FontIcon><span
                    style={notificationTextStyle}>{d2.i18n.getTranslation('object_will_created_private')}</span>
                </Paper>
            );
        }
    }

    return toRender;
}

SharingNotification.contextTypes = {
    d2: PropTypes.object,
};

SharingNotification.propTypes = {
    modelType: PropTypes.string,
    style: PropTypes.object,
};

export default SharingNotification;
