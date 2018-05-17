import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import OptionManagement from './option-set/OptionManagement.component';
import { optionList$ } from '../../EditModel/option-set/OptionManagement.component';

export default new Map([
    [
        'options',
        {
            component: withStateFrom(optionList$, OptionManagement),
            fieldOptions: {},
        },
    ],
]);
