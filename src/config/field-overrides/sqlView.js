import TextField from '../../forms/form-fields/text-field';

export default new Map([
    ['sqlQuery', {
        component: TextField,
        fieldOptions: {
            multiLine: true,
            rows: 5,
            rowsMax: 8,
            textareaStyle: {
                border: '1px solid green',
                borderRadius: '5px',
                padding: '10px',
            },
            underlineShow: false,
        },
    }],
]);
