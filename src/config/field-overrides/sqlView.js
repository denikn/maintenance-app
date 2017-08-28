import TextField from '../../forms/form-fields/text-field';

const textArea = () => {
    const lbl = 'sql query';
    const inputstl = { border: '1px solid blue', 'border-radius': '3px' };
    return (
        <TextField
            inputStyle={inputstl}
            multiLine={true}
            rows={4}
        />
    );
};

export default new Map([
    ['sqlQuery', {
        component: textArea,
    }],
]);
