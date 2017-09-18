import { every, isEmpty, negate, get, compose } from 'lodash/fp';

const isPropertyDefined = property => compose(negate(isEmpty), get(property));
const isNameDefined = isPropertyDefined('name');

export const isAllColorsHaveNames = {
    validator: every(isNameDefined),
    message: 'all_colors_should_have_names',
};
