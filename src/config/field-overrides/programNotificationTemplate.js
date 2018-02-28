import DataElementDropDown from './program-notification-template/DataElementDropDown';
import ProgramAttributeDropDown from './program-notification-template/ProgramAttributeDropDown';
import RecipentUserGroup from '../../forms/form-fields/recipent-user-group';
import DeliveryChannels from '../../forms/form-fields/delivery-channels';
import RelativeScheduledDays from '../../forms/form-fields/relative-scheduled-days';
import ProgramNotificationSubjectAndMessageTemplateFields
    from './program-notification-template/ProgramNotificationSubjectAndMessageTemplateFields';

/**
 * programNotificationTemplate are shared for both program notification and
 * programStage notifications. We use a customFieldOrder name to differentiate
 * between these two, as they have different behavior and overrides.
 */
const sharedOverrides = [
    ['deliveryChannels', {
        component: DeliveryChannels,
    }],
    ['relativeScheduledDays', {
        component: RelativeScheduledDays,
    }],
    ['recipientUserGroup', {
        component: RecipentUserGroup,
    }],
    ['recipientProgramAttribute', {
        component: ProgramAttributeDropDown,
    }],
    ['messageTemplate', {
        component: ProgramNotificationSubjectAndMessageTemplateFields,
    }],
];

export const programNotificationTemplate = new Map([
    ...sharedOverrides,
    ['notificationTrigger',
        {
            required: true,
            fieldOptions: {
                options: [
                    'COMPLETION',
                    'ENROLLMENT',
                    'SCHEDULED_DAYS_INCIDENT_DATE',
                    'SCHEDULED_DAYS_ENROLLMENT_DATE',
                    'PROGRAM_RULE',
                ],
            },
        },
    ],
    ['notificationRecipient',
        {
            required: true,
            fieldOptions: {
                options: [
                    'TRACKED_ENTITY_INSTANCE',
                    'ORGANISATION_UNIT_CONTACT',
                    'USERS_AT_ORGANISATION_UNIT',
                    'USER_GROUP',
                    'PROGRAM_ATTRIBUTE',
                ],
            },
        },
    ],
]);

export const programStageNotificationTemplate = new Map([
    ...sharedOverrides,
    ['notificationTrigger',
        {
            required: true,
            fieldOptions: {
                // For program stages only the following values are allowed
                options: [
                    'COMPLETION',
                    'SCHEDULED_DAYS_DUE_DATE',
                    'PROGRAM_RULE',
                ],
            },
        },
    ],
    ['notificationRecipient',
        {
            required: true,
            fieldOptions: {
                options: [
                    'TRACKED_ENTITY_INSTANCE',
                    'ORGANISATION_UNIT_CONTACT',
                    'USERS_AT_ORGANISATION_UNIT',
                    'USER_GROUP',
                    'PROGRAM_ATTRIBUTE', // This is only for Tracker programs
                    'DATA_ELEMENT',
                ],
            },
        },
    ],
    ['recipientDataElement', {
        component: DataElementDropDown,
    }],
]);

export default programNotificationTemplate;
