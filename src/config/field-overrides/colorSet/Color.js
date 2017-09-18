import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField/TextField';
import ColorPicker from 'd2-ui/lib/legend/ColorPicker.component';
import Row from 'd2-ui/lib/layout/Row.component';
import IconButton from 'material-ui/IconButton/IconButton';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

export default function Color({ id, name, color, onChange, onDelete }) {
    return (
        <Row style={{ flexDirection: 'row-reverse' }}>
            <IconButton onClick={onDelete}>
                <CancelIcon />
            </IconButton>
            <div style={{ flex: '1 1 100%', paddingLeft: '3rem' }}>
                <TextField
                    id={id}
                    value={name}
                    onChange={(event, name) => onChange({ name, color })}
                    fullWidth
                />
            </div>
            <div style={{ flex: 0 }}>
                <ColorPicker
                    color={color}
                    onChange={(color) => onChange({ name, color })}
                />
            </div>
        </Row>
    );
}

Color.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

Color.defaultProps = {
    name: '',
    color: '',
};
