import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField/TextField';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import ColorPicker from 'd2-ui/lib/legend/ColorPicker.component';
import Row from 'd2-ui/lib/layout/Row.component';

const styles = {
    textField: {
        flex: '1 1 100%',
        paddingLeft: '3rem',
    },
    colorPicker: {
        flex: 0,
    },
    button: {
        color: 'red',
    },
    row: {
        flexDirection: 'row',
    },
};

const Color = ({ id, name, color, onChange, onDeleteColor }) => {
    const onNameChange = (event, newName) => onChange({ name: newName, color });
    const onColorChange = newColor => onChange({ name, color: newColor });

    return (
        <Row style={styles.row}>
            <ColorPicker
                color={color}
                onChange={onColorChange}
                style={styles.colorPicker}
            />
            <div style={styles.textField}>
                <TextField
                    id={id}
                    value={name}
                    onChange={onNameChange}
                    fullWidth
                />
            </div>
            <FlatButton
                label="Remove"
                onClick={onDeleteColor}
                secondary
                style={styles.button}
            />
        </Row>
    );
};

Color.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onDeleteColor: PropTypes.func.isRequired,
};

Color.defaultProps = {
    name: '',
    color: '#000000',
};

export default Color;
