import React from 'react';
import { findDOMNode } from 'react-dom';

import HTML5Backend from 'react-dnd-html5-backend';

import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import OptionValue from './OptionValue.component';

const ItemTypes = {
    OPTION: 'option',
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragId = monitor.getItem().id;
        const hoverId = props.id;

        // Don't replace items with themselves
        if (dragId === hoverId) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragId < hoverId && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragId > hoverId && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveOption(dragId, hoverId);
        return true;
    },
};

const OptionValueWithDrag = DragSource(ItemTypes.OPTION, cardSource, collect)(OptionValue);

const OptionValueWithDragAndDrop = DropTarget(ItemTypes.OPTION, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(OptionValueWithDrag);

const SortableList = DragDropContext(HTML5Backend)(
    ({ options, moveOption }) =>
        (
            <div>
                {options.map((option, index) => (<OptionValueWithDragAndDrop
                    key={option.id}
                    index={index}
                    moveOption={moveOption}
                    displayName={option.displayName}
                    code={option.code}
                    id={option.id}
                />))}
            </div>
        ),
);

export default SortableList;
