import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import DropDownAsyncGetter from '../../../forms/form-fields/drop-down-async-getter';
import boundOnUpdate from './boundOnUpdate';

const DataElementDropDown = compose(
    connect(undefined, boundOnUpdate),
)((props) => {
    const dataElementOpts = props.dataElements
        .filter(de => de.valueType === 'PHONE_NUMBER')
        .map(de => ({
            text: de.displayName,
            value: de.id,
        }));
    const getElems = () => Promise.resolve(dataElementOpts);
    return (
        <DropDownAsyncGetter
            labelText={props.labelText}
            options={dataElementOpts}
            onChange={event =>
                props.onUpdate({
                    fieldName: 'recipientDataElement',
                    value: event.target.value,
                })}
            value={props.model.recipientDataElement}
            fullWidth
            isRequired
            model={props.model}
            getter={getElems}
        />
    );
});

export default DataElementDropDown;
