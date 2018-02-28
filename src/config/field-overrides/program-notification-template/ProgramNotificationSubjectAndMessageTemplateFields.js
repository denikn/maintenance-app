import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { map } from 'lodash/fp';

import boundOnUpdate from './boundOnUpdate';
import SubjectAndMessageTemplateFields
    from '../../../forms/form-fields/subject-and-message-template-fields/subject-and-message-template-fields';

const PROGRAM_STAGE_VARIABLES = [
    'program_name',
    'program_stage_name',
    'org_unit_name',
    'due_date',
    'days_since_due_date',
    'days_until_due_date',
    'current_date',
];

const PROGRAM_VARIABLES = [
    'program_name',
    'org_unit_name',
    'due_date',
    'days_since_due_date',
    'days_until_due_date',
    'current_date',
];

const toVariableType = name => ['V', name];
const toAttributeType = name => ['A', name]; // Used for program attributes
const toDataElementType = name => ['#', name];

const dataElementsTypeMap = dataElements => map(toDataElementType, dataElements);
const attributesToTypeMap = attributes => map(toAttributeType, attributes);

const ProgramNotificationSubjectAndMessageTemplateFields = compose(
    connect(undefined, boundOnUpdate),
    withProps(({ dataElements, attributes, isProgram }) => {
        let constantVariables = PROGRAM_STAGE_VARIABLES;
        let variables = dataElementsTypeMap(dataElements);

        if (isProgram) {
            constantVariables = PROGRAM_VARIABLES;
            variables = attributesToTypeMap(attributes);
        }

        return {
            variableTypes: map(toVariableType, constantVariables).concat(
                variables,
            ),
        };
    }),
)(SubjectAndMessageTemplateFields);

export default ProgramNotificationSubjectAndMessageTemplateFields;
