import React, { PropTypes } from 'react';
import { compose, get, equals, filter, findIndex, slice, negate } from 'lodash/fp';
import { generateUid } from 'd2/lib/uid';
import withHandlers from 'recompose/withHandlers';
import Color from './Color';

const propertyEqualTo = (property, id) => compose(equals(id), get(property));
const idEqualTo = id => propertyEqualTo('id', id);
const getColorIndex = (color, colors) => findIndex(idEqualTo(color.id), colors);
const createFakeEvent = (value) => ({ target: { value }});

export function Colors({ colors, onColorChange, onColorAdd, onColorDelete }) {
    const colorRows = colors
        .map((color) => (
            <Color
                key={color.id}
                id={color.id}
                name={color.name}
                color={color.color}
                onChange={(colorObj) => onColorChange(Object.assign({}, color, colorObj)) }
                onDelete={() => onColorDelete(color)}
            />
        ));

    return (
        <div>
            <button onClick={onColorAdd}>Add</button>
            {colorRows}
        </div>
    );
}

Colors.defaultProps = {
    colors: [],
};

Colors.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
    })),
    onColorChange: PropTypes.func.isRequired,
    onColorAdd: PropTypes.func.isRequired,
    onColorDelete: PropTypes.func.isRequired,
};

//    onColorDelete :: PropsObject -> ColorObject -> void
const onColorDelete = ({ onChange, colors }) => (colorToRemove) => {
    const isNotColorToRemove = negate(idEqualTo(colorToRemove.id));
    const remainingColors = filter(isNotColorToRemove, colors);

    console.log(colorToRemove);

    onChange(createFakeEvent(remainingColors));
};

//    onColorAdd :: PropsObject -> void -> void
const onColorAdd = ({ onChange, colors }) => () => {
    const newColor = {
        id: generateUid(),
        color: '',
        name: '',
    };

    onChange(
        createFakeEvent(
            colors.concat(newColor)
        )
    );
};

//    onColorChange :: PropsObject -> ColorObject -> void
const onColorChange = ({ onChange, colors }) => (updatedColor) => {
    const currentColorIndex = getColorIndex(updatedColor, colors);
    const colorsBeforeCurrentColor = slice(0, currentColorIndex, colors);
    const colorsAfterCurrentColor = slice(currentColorIndex + 1, colors.length, colors);

    onChange(createFakeEvent([].concat(colorsBeforeCurrentColor, updatedColor, colorsAfterCurrentColor)));
};

export default withHandlers({
    onColorChange,
    onColorDelete,
    onColorAdd,
})(Colors)
