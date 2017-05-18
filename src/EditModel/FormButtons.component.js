import React, { PropTypes } from 'react';
import isArray from 'd2-utilizr/lib/isArray';

export default function FormButtons({ children, style }) {
    const defaultStyle = {
        marginTop: '1rem',
    };

    const buttonStyle = {
        marginRight: '1rem',
        width: '10rem',
    };

    const buttonsToRender = isArray(children) ? children : [children];
    const buttons = buttonsToRender.map((child, index) => {
        return React.cloneElement(child, {
            style: buttonStyle,
            key: index,
        });
    });

    return (
        <div style={Object.assign(defaultStyle, style)}>
            {buttons}
        </div>
    );
}
FormButtons.propTypes = {
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    isFormValid: PropTypes.func,
};
