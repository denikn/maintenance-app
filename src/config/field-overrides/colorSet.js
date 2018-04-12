
import ColorsField from './color-set/ColorsField';
import { isAllColorsHaveNames } from './color-set/colorValidators'; // TODO add to d2-ui validators

export default new Map([
    ['colors', {
        component: ColorsField,
        validators: [isAllColorsHaveNames],
    }],
]);
