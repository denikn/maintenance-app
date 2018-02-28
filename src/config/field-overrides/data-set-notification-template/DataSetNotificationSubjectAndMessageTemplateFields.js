import { map } from 'lodash/fp';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import mapProps from 'recompose/mapProps';
import actions from '../../../EditModel/objectActions';
import SubjectAndMessageTemplateFields
    from '../../../forms/form-fields/subject-and-message-template-fields/subject-and-message-template-fields';

const DATA_SET_VARIABLES = [
    'data_set_name',
    'current_date',
];

const toVariableType = name => ['V', name];

const DataSetNotificationSubjectAndMessageTemplateFields = compose(
    withProps({
        variableTypes: map(toVariableType, DATA_SET_VARIABLES),
    }),
    mapProps(props => ({
        ...props,
        onUpdate: actions.update,
    })),
)(SubjectAndMessageTemplateFields);

export default DataSetNotificationSubjectAndMessageTemplateFields;
