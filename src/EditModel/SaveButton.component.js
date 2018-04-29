import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import addD2Context from 'd2-ui/lib/component-helpers/addD2Context';

function SaveButton(props, { d2 }) {
    const {
        isValidating,
        isSaving,
        onClick,
        ...rest
    } = props;

    const buttonText = () => {
        if (isSaving) {
            return d2.i18n.getTranslation('saving');
        } else if (isValidating) {
            return d2.i18n.getTranslation('validating');
        }
        return d2.i18n.getTranslation('save');
    };

    return (
        <RaisedButton
            {...rest}
            primary
            onClick={onClick}
            label={buttonText()}
            disabled={isSaving || isValidating}
        />
    );
}

SaveButton.propTypes = {
    isSaving: PropTypes.bool,
    isValidating: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};
SaveButton.defaultProps = {
    isSaving: false,
    isValidating: false,
};

export default addD2Context(SaveButton);
