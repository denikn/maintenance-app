import snackActions from './snack.actions';

export function showMessage(message) {
    snackActions.show({ message, translate: false });
}

export function showTranslatedMessage(message) {
    snackActions.show({ message, translate: true });
}

export function showTranslatedOkMessage(message) {
    snackActions.show({
        message,
        translate: true,
        action: 'ok',
    });
}

export function showOkMessage(message) {
    snackActions.show({
        message,
        translate: false,
        action: 'ok',
    });
}
