
import RelativeScheduledDays from '../../forms/form-fields/relative-scheduled-days';
import RecipentUserGroup from '../../forms/form-fields/recipent-user-group';
import DeliveryChannels from '../../forms/form-fields/delivery-channels';
import DataSetNotificationSubjectAndMessageTemplateFields
    from './data-set-notification-template/DataSetNotificationSubjectAndMessageTemplateFields';

export default new Map([
    ['deliveryChannels', {
        component: DeliveryChannels,
    }],
    ['relativeScheduledDays', {
        component: RelativeScheduledDays,
    }],
    ['dataSetNotificationTrigger', {
        required: true,
        fieldOptions: {
            options: [
                'DATA_SET_COMPLETION',
                'SCHEDULED_DAYS',
            ],
        },
    }],
    ['messageTemplate', {
        component: DataSetNotificationSubjectAndMessageTemplateFields,
    }],
    ['notificationRecipient', {
        required: true,
    }],
    ['recipientUserGroup', {
        component: RecipentUserGroup,
    }],
]);
