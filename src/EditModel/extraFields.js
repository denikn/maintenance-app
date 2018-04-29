import React from 'react';
import addD2Context from 'd2-ui/lib/component-helpers/addD2Context';

import DataElementGroupsAssignment from './data-element/DataElementGroupsAssignment.component';
import IndicatorExpression from './indicator/IndicatorExpression';
import { isRequired } from 'd2-ui/lib/forms/Validators';

export default {
    dataElement: [
        {
            name: 'dataElementGroupAssignment',
            component: props => (
                <div style={{ marginTop: '2rem' }}>
                    <DataElementGroupsAssignment source={props.modelToEdit} />
                </div>
            ),
        },
    ],
    indicator: [
        {
            name: 'indicatorGroupAssignmentAndGroupAssignments',
            component: addD2Context(IndicatorExpression),
        },
    ],
};
