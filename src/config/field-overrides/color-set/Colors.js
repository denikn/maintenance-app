import React, { PropTypes } from 'react';
import { compose, get, equals, filter, findIndex, slice, negate } from 'lodash/fp';

import Color from './Color';

const Colors = ({ colors, onChange }) => {
    const propertyEqualTo = (property, id) =>
        compose(
            equals(id),
            get(property),
        );

    const idEqualTo = id => propertyEqualTo('id', id);

    const onColorDelete = (colorToRemove) => {
        const isNotColorToRemove = negate(idEqualTo(colorToRemove.id));
        const remainingColors = filter(isNotColorToRemove, colors);

        onChange(remainingColors);
    };

    const onColorChange = (updatedColor) => {
        const getColorIndex = color => findIndex(idEqualTo(color.id), colors);
        const currentColorIndex = getColorIndex(updatedColor, colors);
        const colorsBeforeCurrentColor = slice(0, currentColorIndex, colors);
        const colorsAfterCurrentColor = slice(currentColorIndex + 1, colors.length, colors);

        onChange([].concat(
            colorsBeforeCurrentColor,
            updatedColor,
            colorsAfterCurrentColor),
        );
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
                onDelete={onDeleteColor}
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
