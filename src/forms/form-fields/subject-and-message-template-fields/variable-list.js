import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Heading from 'd2-ui/lib/headings/Heading.component';
import { map, compose } from 'lodash/fp';

function prepareProps(d2, onItemSelected) {
    return ([type, name]) => {
        const label = name.displayName ? name.displayName : d2.i18n.getTranslation(name);
        const varName = name.id ? name.id : name;
        return {
            primaryText: label,
            onClick() {
                onItemSelected(`${type}{${varName}}`);
            },
        };
    };
}

function renderListItem(props) {
    return (
        <ListItem
            key={props.primaryText}
            {...props}
        />
    );
}

function VariableList({ onItemSelected, variableTypes }, { d2 }) {
    const listItems = map(compose(renderListItem, prepareProps(d2, onItemSelected)), variableTypes);

    return (
        <div style={{ flex: '0 0 33%' }}>
            <Heading level={4} style={{ fontSize: '1rem', paddingBottom: '1rem' }}>Template variables</Heading>
            <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                <List>
                    {listItems}
                </List>
            </div>
        </div>
    );
}

VariableList.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    variableTypes: PropTypes.array.isRequired,
};

VariableList.contextTypes = {
    d2: PropTypes.object,
};

export default VariableList;
