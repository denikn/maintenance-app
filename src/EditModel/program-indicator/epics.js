import { get, getOr, compose, first, filter, identity } from 'lodash/fp';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { getInstance } from 'd2/lib/d2';

import programIndicatorStore from './programIndicatorStore';
import { requestParams } from '../SingleModelStore';
import { createModelToEditEpic } from '../epicHelpers';
import { programIndicatorFromStoreSelector } from './selectors';
import { goToAndScrollUp } from '../../router-utils';

import { notifyUser } from '../actions';
import {
    PROGRAM_INDICATOR_LOAD,
    PROGRAM_INDICATOR_VALIDATE,
    PROGRAM_INDICATOR_SAVE,
    PROGRAM_INDICATOR_SAVE_SUCCESS,
    PROGRAM_INDICATOR_SAVE_ERROR,
    PROGRAM_INDICATOR_TO_EDIT_FIELD_CHANGED,
    validateProgramIndicator,
    loadProgramIndicatorSuccess,
    saveProgramIndicatorSuccess,
    saveProgramIndicatorError,
} from './actions';

const extractFirstMessageFromErrorReports = compose(get('message'), first, getOr([], 'errorReports'), get('response'));
const extractFirstMessageFromMessages = compose(get('message'), first, get('messages'));
const firstNotUndefinedIn = compose(first, filter(identity));

function extractFirstErrorMessage(response) {
    const messages = [
        extractFirstMessageFromErrorReports(response),
        extractFirstMessageFromMessages(response),
    ];

    return firstNotUndefinedIn(messages);
}

function loadProgramIndicator(programIndicatorId) {
    return Observable.fromPromise(
        getInstance()
            .then((d2) => {
                if (programIndicatorId === 'add') {
                    return d2.models.programIndicator.create();
                }
                return d2.models.programIndicator.get(programIndicatorId, requestParams.get('programIndicator'));
            })
            .then(programIndicator => ({ programIndicator })),
    );
}

export const programIndicatorLoad = programIndicatorStore => action$ => action$
    .ofType(PROGRAM_INDICATOR_LOAD)
    .map(get('payload.id'))
    .flatMap(loadProgramIndicator)
    .do(storeState => programIndicatorStore.setState(storeState))
    .mapTo(loadProgramIndicatorSuccess());

export const programIndicatorEdit = programIndicatorStore =>
    createModelToEditEpic(
        PROGRAM_INDICATOR_TO_EDIT_FIELD_CHANGED,
        programIndicatorStore,
        'programIndicator',
    );

export const programIndicatorValidate = store => action$ => action$
    .ofType(PROGRAM_INDICATOR_VALIDATE)
    .mapTo(validateProgramIndicator(store))
    .mapTo(notifyUser({ message: 'fuck off', action: 'OK', translate: false }));

export const programIndicatorSave = programIndicatorStore => action$ => action$
    .ofType(PROGRAM_INDICATOR_SAVE)
    .mapTo(programIndicatorStore)
    .map(programIndicatorFromStoreSelector)
    .mergeMap(programIndicator => Observable.fromPromise(programIndicator.save())
        .mapTo(saveProgramIndicatorSuccess())
        .do(() => goToAndScrollUp('/list/indicatorSection/programIndicator'))
        .catch(error => Observable.of(saveProgramIndicatorError(error))));

export const programIndicatorModelSaveResponses = action$ => Observable
    .merge(
        action$
            .ofType(PROGRAM_INDICATOR_SAVE_SUCCESS)
            .mapTo(notifyUser('success')),
        action$
            .ofType(PROGRAM_INDICATOR_SAVE_ERROR)
            .map((action) => {
                const firstErrorMessage = extractFirstErrorMessage(action.payload);

                return notifyUser({ message: firstErrorMessage, translate: false });
            }),
    );

export default (function createEpicsForStore(store) {
    return combineEpics(
        programIndicatorLoad(store),
        programIndicatorEdit(store),
        programIndicatorSave(store),
        programIndicatorValidate(store),
        programIndicatorModelSaveResponses,
    );
}(programIndicatorStore));
