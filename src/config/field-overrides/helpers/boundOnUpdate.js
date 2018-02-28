import { bindActionCreators } from 'redux';
import { setStageNotificationValue } from '../../../EditModel/event-program/notifications/actions';

const boundOnUpdate = dispatch =>
    bindActionCreators(
        {
            onUpdate: ({ fieldName, value }) =>
                setStageNotificationValue(fieldName, value),
        },
        dispatch,
    );

export default boundOnUpdate;
