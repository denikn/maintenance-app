import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import { goToRoute } from '../router-utils';

function ListActionBar({ modelType, groupName }, { d2 }) {
    const addClick = () => {
        goToRoute(`/edit/${groupName}/${modelType}/add`);
    };

    const cssStyles = {
        textAlign: 'right',
        marginTop: '1rem',
        bottom: '1.5rem',
        right: '1.5rem',
        position: 'fixed',
        zIndex: 10,
    };

    const modelDefinition = d2.models[modelType];

    if (!d2.currentUser.canCreate(modelDefinition)) {
        return null;
    }

    return (
        <div style={cssStyles}>
            <FloatingActionButton onClick={addClick}>
                <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
        </div>
    );
}

ListActionBar.propTypes = {
    modelType: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
};

ListActionBar.contextTypes = {
    d2: PropTypes.object,
};

export default ListActionBar;
