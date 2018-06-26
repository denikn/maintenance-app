import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Observable } from 'rxjs';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import Dialog from 'material-ui/Dialog/Dialog';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import Heading from 'd2-ui/lib/headings/Heading.component';

import SortableList from './SortableList.component';

import modelToEditStore from '../../modelToEditStore';
import { sortDialogStore, optionsForOptionSetStore } from '../stores';
import { showTranslatedOkMessage, showTranslatedMessage } from '../../../Snackbar/snackBarShortCuts';

export function setSortDialogOpenTo(status) {
    sortDialogStore.setState({
        ...sortDialogStore.getState(),
        open: status,
    });
}

const sortDialogState$ = Observable
    .combineLatest(
        sortDialogStore,
        optionsForOptionSetStore,
    )
    .map(([state, optionState]) => ({
        ...state,
        ...optionState,
    }));

const styles = {
    actionButtonWrap: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    actionButton: {
        marginLeft: '1rem',
    },
    dialog: {
        height: '90%',
    },
    multiplePages: {
        padding: '1rem 0',
    },
};

class SortDialog extends Component {
    state = {
        options: [],
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            options: newProps.options || this.state.options,
        });
    }

    onSaveOptionOrderSuccess = () => {
        this.setDialogStoreSaveStatus(false);
        showTranslatedMessage('options_sorted_and_saved');
        this.closeDialog();
    }

    onSaveOptionOrderFail = () => {
        this.setDialogStoreSaveStatus(false);
        showTranslatedOkMessage('failed_to_save_order');
    }

    onSaveOptionOrderClick = () => {
        const modelToEdit = modelToEditStore.getState();
        this.addOrderedOptionsToModel(modelToEdit);
        this.addOrderedOptionsToOptionsSetStore(modelToEdit);
        this.setDialogStoreSaveStatus(true);

        modelToEdit
            .save()
            .then(this.onSaveOptionOrderSuccess)
            .catch(this.onSaveOptionOrderFail);
    }

    getTranslation = message => this.context.d2.i18n.getTranslation(message);

    setDialogStoreSaveStatus = (saveStatus) => {
        sortDialogStore.setState({
            ...sortDialogStore.getState(),
            isSaving: saveStatus,
        });
    }

    addOrderedOptionsToModel = (modelToEdit) => {
        modelToEdit.options.clear();

        this.state.options.forEach((option) => {
            modelToEdit.options.add(option);
        });

        modelToEditStore.setState(modelToEdit);
    }

    addOrderedOptionsToOptionsSetStore = (modelToEdit) => {
        optionsForOptionSetStore.setState({
            ...optionsForOptionSetStore.getState(),
            options: modelToEdit.options.toArray(),
        });
    }

    moveOption = (dragId, targetId) => {
        const dragIndex = this.state.options.findIndex(option => option.id === dragId);
        const targetIndex = this.state.options.findIndex(option => option.id === targetId);
        const dragOption = this.state.options[dragIndex];

        const newList = [...this.state.options];

        newList.splice(dragIndex, 1);
        newList.splice(targetIndex, 0, dragOption);

        this.setState({ options: newList });
    }

    isShowSaveButton = () => !this.props.isLoading && this.props.isOnePage;

    closeDialog = () => setSortDialogOpenTo(false);

    renderDialogContent() {
        if (this.props.isLoading) {
            return (
                <div>
                    {this.props.isLoading && <LinearProgress />}
                </div>
            );
        }

        if (!this.props.isOnePage) {
            return (
                <div style={styles.multiplePages}>
                    {this.getTranslation('manual_sorting_is_not_available_for_option_sets_with_more_than_50_options')}
                </div>
            );
        }

        return (
            <SortableList
                options={this.state.options}
                moveOption={this.moveOption}
            />
        );
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.closeDialog}
                autoScrollBodyContent
                style={styles.dialog}
                modal
            >
                <Heading>{this.getTranslation('sorting')}</Heading>
                {this.renderDialogContent()}
                <div style={styles.actionButtonWrap}>
                    {this.isShowSaveButton() && <RaisedButton
                        style={styles.actionButton}
                        disabled={this.props.isSaving}
                        onClick={this.onSaveOptionOrderClick}
                        primary
                        label={this.getTranslation(this.props.isSaving ? 'saving' : 'save')}
                    />}
                    <RaisedButton
                        style={styles.actionButton}
                        disabled={this.props.isSaving}
                        label={this.getTranslation('close')}
                        onClick={this.closeDialog}
                    />
                </div>
            </Dialog>
        );
    }
}

SortDialog.propTypes = {
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOnePage: PropTypes.bool,
    open: PropTypes.bool,
    options: PropTypes.array,
};

SortDialog.defaultProps = {
    isSaving: false,
    isLoading: true,
    isOnePage: true,
    open: false,
    options: [],
};

SortDialog.contextTypes = { d2: PropTypes.object };

export default withStateFrom(sortDialogState$, SortDialog);
