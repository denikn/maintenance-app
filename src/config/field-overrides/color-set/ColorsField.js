import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from 'd2-ui/lib/messages/ErrorMessage.component';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { generateUid } from 'd2/lib/uid';
import Colors from './Colors';

const styles = {
    labelStyle: {
        position: 'relative',
        display: 'block',
        width: '100%',
        lineHeight: '24px',
        color: 'rgba(0,0,0,0.3)',
        marginTop: '1.25rem',
        fontSize: 16,
    },
    addButton: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
};

const ColorsField = ({ value, errorText, onChange }) => {
    const addColor = () => {
        const newColor = { id: generateUid() };
        const newColors = value.concat(newColor);
        onChange({ target: { value: newColors } });
    };

    return (
        <div>
            <span style={styles.labelStyle}>Colors</span>
            <Colors colors={value} onChange={onChange} />
            <ErrorMessage message={errorText} />
            <RaisedButton style={styles.addButton} label="Add color" onClick={addColor} secondary />
            <Divider />
        </div>);
};

ColorsField.propTypes = {
    errorText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
    })),
};
ColorsField.defaultProps = {
    errorText: '',
    value: [],
};

export default ColorsField;
