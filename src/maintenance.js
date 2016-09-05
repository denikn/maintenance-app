const dhisDevConfig = DHIS_CONFIG; // eslint-disable-line
if (process.env.NODE_ENV !== 'production') {
    jQuery.ajaxSetup({ headers: { Authorization: dhisDevConfig.authorization } }); // eslint-disable-line
}

Error.stackTraceLimit = Infinity;

import React from 'react';
import { render } from 'react-dom';
import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';
import log from 'loglevel';
import LoadingMask from './loading-mask/LoadingMask.component';
import dhis2 from 'd2-ui/lib/header-bar/dhis2';
import routes from './router';
import '../scss/maintenance.scss';
import getI18n from './i18n';
import { I18nextProvider } from 'react-i18next';

if (process.env.NODE_ENV !== 'production') {
    log.setLevel(log.levels.DEBUG);
} else {
    log.setLevel(log.levels.INFO);
}

function configI18n(userSettings) {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale && uiLocale !== 'en') {
        // Add the language sources for the preferred locale
        config.i18n.sources.add(`./i18n/i18n_module_${uiLocale}.properties`);
    }

    // Add english as locale for all cases (either as primary or fallback)
    config.i18n.sources.add('./i18n/i18n_module_en.properties');

    return getI18n();
}

function startApp(i18next) {
    window.i18next = i18next;

    render(
        <I18nextProvider i18n={i18next}>
            {routes}
        </I18nextProvider>,
        document.getElementById('app')
    );
}

render(<LoadingMask />, document.getElementById('app'));

getManifest('./manifest.webapp')
    .then(manifest => {
        const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : dhisDevConfig.baseUrl;
        config.baseUrl = `${baseUrl}/api/24`;
        log.info(`Loading: ${manifest.name} v${manifest.version}`);
        log.info(`Built ${manifest.manifest_generated_at}`);

        // Set the baseUrl to localhost if we are in dev mode
        if (process.env.NODE_ENV !== 'production') {
            dhis2.settings.baseUrl = baseUrl;
        }
    })
    .then(getUserSettings)
    .then(configI18n)
    .then((i18next) => init().then(() => i18next))
    .then(startApp)
    .catch(log.error.bind(log));
