import withProps from 'recompose/withProps';
import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';
import { map } from 'lodash/fp';
import SubjectAndMessageTemplateFields
    from '../../../forms/form-fields/subject-and-message-template-fields/subject-and-message-template-fields';
import actions from '../../../EditModel/objectActions';

const VALIDATION_RULE_VARIABLES = [
    'rule_name',
    'rule_description',
    'operator',
    'importance',
    'left_side_description',
    'right_side_description',
    'left_side_value',
    'right_side_value',
    'org_unit_name',
    'period',
    'current_date',
];

const toVariableType = name => ['V', name];

const ValidationNotificationSubjectAndMessageTemplateFields = compose(
    withProps({
        variableTypes: map(toVariableType, VALIDATION_RULE_VARIABLES),
    }),
    mapProps(props => ({
        ...props,
        onUpdate: actions.update,
    })),
)(SubjectAndMessageTemplateFields);

export default ValidationNotificationSubjectAndMessageTemplateFields;
