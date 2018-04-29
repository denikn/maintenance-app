import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog/Dialog';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';

import IndicatorExpressionManagerContainer from './IndicatorExpressionManagerContainer.component';
import DataIndicatorGroupsAssignment from './DataIndicatorGroupsAssignment.component';
import modelToEditStore from '../modelToEditStore';

const styles = {
    saveButton: {
        marginRight: '1rem',
    },
    customContentStyle: {
        width: '95%',
        maxWidth: 'none',
    },
    numeratorButton: {
        marginRight: '2rem',
    },
    dataIndicator: {
        marginTop: '2rem',
        padding: '1rem',
    },
    wrapper: {
        marginTop: '2rem',
    },
    errorText: {
        paddingTop: '0.5rem',
        color: 'red',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    expressionButtons: {
        display: 'flex',
        flexDirection: 'row',
    },
};

class IndicatorExpression extends Component {
    state = {
        dialogValid: false,
        dialogOpen: false,
    };

    setNumerator = () => {
        this.setState({ type: 'numerator', dialogOpen: true });
    }

    setDenominator = () => {
        this.setState({ type: 'denominator', dialogOpen: true });
    }

    closeDialog = () => {
        this.setState({ dialogOpen: false });
    }

    saveToModelAndCloseDialog = () => {
        if (this.state.expressionStatus.isValid) {
            this.props.modelToEdit[this.state.type] = this.state.expressionFormula;
            this.props.modelToEdit[`${this.state.type}Description`] = this.state.expressionDescription;

            modelToEditStore.setState(this.props.modelToEdit);
        }

        this.setState({
            dialogOpen: false,
        });
    }

    indicatorExpressionChanged = (data) => {
        const expressionValues = {};
        if (data.expressionStatus.isValid) {
            expressionValues.expressionStatus = data.expressionStatus;
            expressionValues.expressionDescription = data.description;
            expressionValues.expressionFormula = data.formula;
        }

        this.setState({
            dialogValid: data.expressionStatus.isValid && Boolean(data.description.trim()),
            ...expressionValues,
        });
    }

    render() {
        const d2 = this.context.d2;
        const dialogActions = [
            // TODO: This button should "commit" the change to the model where a cancel button will discard any changes made
            <FlatButton
                label={d2.i18n.getTranslation('cancel')}
                onTouchTap={this.closeDialog}
            />,
            <FlatButton
                label={d2.i18n.getTranslation('done')}
                onTouchTap={this.saveToModelAndCloseDialog}
                disabled={!this.state.dialogValid}
            />,
        ];

        const translatedError = d2.i18n.getTranslation(this.props.errorText);

        const ExpressionButtons = () => (
            <div style={styles.expressionButtons}>
                <div style={styles.buttonWrapper}>
                    <RaisedButton
                        label={`${d2.i18n.getTranslation('edit_numerator')} (*)`}
                        onClick={this.setNumerator}
                        style={styles.numeratorButton}
                    />
                    {!!this.props.errorText && <div style={styles.errorText}>{translatedError}</div>}
                </div>
                <div style={styles.buttonWrapper}>
                    <RaisedButton
                        label={`${d2.i18n.getTranslation('edit_denominator')} (*)`}
                        onClick={this.setDenominator}
                    />
                    {!!this.props.errorText && <div style={styles.errorText}>{translatedError}</div>}
                </div>
            </div>
        );

        return (
            <div>
                <div style={styles.wrapper}>
                    <ExpressionButtons />
                    <Dialog
                        title={d2.i18n.getTranslation(`edit_${this.state.type}`)}
                        open={this.state.dialogOpen}
                        modal
                        actions={dialogActions}
                        contentStyle={styles.customContentStyle}
                        autoScrollBodyContent
                        repositionOnUpdate={false}
                    >
                        <IndicatorExpressionManagerContainer
                            indicatorExpressionChanged={this.indicatorExpressionChanged}
                            formula={this.props.modelToEdit[this.state.type] || ''}
                            description={this.props.modelToEdit[`${this.state.type}Description`] || ''}
                            ref="expressionManagerContainer"
                        />
                    </Dialog>
                </div>
                <div style={styles.dataIndicator}>
                    <DataIndicatorGroupsAssignment source={this.props.modelToEdit} />
                </div>
            </div>
        );
    }
}

IndicatorExpression.propTypes = {
    modelToEdit: PropTypes.object.isRequired,
    errorText: PropTypes.string,
    errorStyle: PropTypes.object,
};

IndicatorExpression.defaultProps = {
    errorText: '',
    errorStyle: {},
};

export default IndicatorExpression;
