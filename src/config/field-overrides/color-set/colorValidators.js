import { every, isEmpty, negate, get, compose } from 'lodash/fp';

// FFS! Move to d2-ui

const isPropertyDefined = property => compose(negate(isEmpty), get(property));
const isNameDefined = isPropertyDefined('name');

export const isAllColorsHaveNames = {
    validator: every(isNameDefined),
    message: 'all_colors_must_have_a_name',
};
