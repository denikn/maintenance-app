import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import DropDownAsyncGetter from '../../../forms/form-fields/drop-down-async-getter';
import boundOnUpdate from './boundOnUpdate';

// Using dropdownasync-getter due to support for references
const ProgramAttributeDropDown = compose(connect(undefined, boundOnUpdate))((props) => {
    const attributesOpts = props.attributes
        .filter(attr => attr.valueType === 'PHONE_NUMBER')
        .map(attr => ({
            text: attr.displayName,
            value: attr.trackedEntityAttribute.id,
        }));

    const getAttrs = () => Promise.resolve(attributesOpts);
    return (
        <DropDownAsyncGetter
            labelText={props.labelText}
            options={attributesOpts}
            onChange={event =>
                props.onUpdate({
                    fieldName: 'recipientProgramAttribute',
                    value: event.target.value,
                })}
            value={props.model.recipientProgramAttribute}
            fullWidth
            isRequired
            model={props.model}
            getter={getAttrs}
        />
    );
});

export default ProgramAttributeDropDown;
