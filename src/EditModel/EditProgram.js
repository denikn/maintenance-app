import React from 'react';
import EditEventProgam from './event-program/EditEventProgram.component';
import CircularProgress from 'material-ui/CircularProgress';
import { Observable } from 'rxjs';
import componentFromStream from 'recompose/componentFromStream';
import { compose, memoize, curry } from 'lodash/fp';
import { getInstance } from 'd2/lib/d2';

const programToTypeMap = new Map();

const getProgramTypeFromApi = curry((programId, d2) => d2.Api.getApi().get(`programs/${programId}`, { fields: 'programType' }));

const getProgramTypeForProgram = programId => {
    if (programToTypeMap.has(programId)) {
        return Observable.of(programToTypeMap.get(programId));
    }

    return Observable.fromPromise(getInstance())
        .mergeMap(getProgramTypeFromApi(programId))
        .do(programTypeResponse => programToTypeMap.set(programId, programTypeResponse));
};

export default componentFromStream(props$ => {
    return props$
        .flatMap(props => {
            return getProgramTypeForProgram(props.params.modelId)
                .map(({ programType }) => {
                    if (programType === 'WITHOUT_REGISTRATION') {
                        return <EditEventProgam {...props} />;
                    }

                    if (programType === 'WITH_REGISTRATION') {
                        return (
                            <div>
                                Tracker program!
                                <a href="#/list/programSection/program">Take me back!</a>
                            </div>
                        )
                    }

                    return (
                        <div>Could not find program form for a program with type {programType}</div>
                    )
                })
        })
        .startWith(<CircularProgress/>);
});
