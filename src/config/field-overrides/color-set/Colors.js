import React, { PropTypes } from 'react';
import { findIndex, reject } from 'lodash/fp';
import Color from './Color';

const Colors = ({ colors, onChange }) => {
    const onColorDelete = (colorToRemove) => {
        const remainingColors = reject({ id: colorToRemove.id }, colors);
        onChange({ target: { value: remainingColors } });
    };

    const onColorChange = (updatedColor) => {
        const currentColorIndex = findIndex({ id: updatedColor.id }, colors);
        colors.splice(currentColorIndex, 1, updatedColor);
        onChange({ target: { value: colors } });
    };

    const colorRows = colors.map((color) => {
        const onChangeColor = colorObj => onColorChange({ ...color, ...colorObj });
        const onDeleteColor = () => onColorDelete(color);

        return (
            <Color
                key={color.id}
                id={color.id}
                name={color.name}
                color={color.color}
                onChange={onChangeColor}
                onDeleteColor={onDeleteColor}
            />);
    });

    return (
        <div>
            {colorRows}
        </div>
    );
};

Colors.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
    })),
    onChange: PropTypes.func.isRequired,
};
Colors.defaultProps = { colors: [] };

export default Colors;
