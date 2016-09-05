import { memoize } from 'lodash';
import i18next from 'i18next';

function initI18next(translations) {
    return new Promise((resolve, reject) => {
        i18next.init({
            lng: 'fr',
            fallbackLng: false,
            keySeparator: false,
            nsSeparator: false,
            resources: {
                fr: { translation: translations },
            }
        }, (error) => error ? reject(error) : resolve(i18next));
    });
}

export default memoize(function getI18n() {
    return fetch('i18n/fr.json')
        .then(response => response.json())
        .then(initI18next);
});
