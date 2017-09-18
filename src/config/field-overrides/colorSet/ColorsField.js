import React from 'react';
import ErrorMessage from 'd2-ui/lib/messages/ErrorMessage.component';
import Translate from 'd2-ui/lib/i18n/Translate.component';
import Colors from './Colors';

export default function ColorsField({ value, errorText, onChange }) {
    return (
        <div>
            <Translate>colors</Translate>
            <Colors colors={value} onChange={onChange} />
            <ErrorMessage message={errorText} />
        </div>
    );
}
