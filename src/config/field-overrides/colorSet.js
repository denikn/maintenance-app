import ColorsField from './colorSet/ColorsField';
import { isAllColorsHaveNames } from './colorSet/colorValidators';

export default new Map([
    ['colors', {
        component: ColorsField,
        validators: [isAllColorsHaveNames],
    }],
]);
