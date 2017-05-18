import React, { Component, PropTypes } from 'react';
import Action from 'd2-ui/lib/action/Action';
import IndicatorExpressionManager from 'd2-ui/lib/expression-manager/ExpressionManager';
import indicatorExpressionStatusStore from 'd2-ui/lib/expression-manager/ExpressionStatus.store';
import { getInstance as getD2 } from 'd2/lib/d2';
import { Observable } from 'rxjs';

const indicatorExpressionStatusActions = Action.createActionsFromNames(['requestExpressionStatus']);
indicatorExpressionStatusActions.requestExpressionStatus
    .debounceTime(500)
    .map(action => {
        const encodedFormula = encodeURIComponent(action.data);
        const url = `expressions/description?expression=${encodedFormula}`;
        const request = getD2()
            .then(d2 => {
                return d2.Api.getApi().get(url);
            });

        return Observable.fromPromise(request);
    })
    .concatAll()
    .subscribe(response => {
        indicatorExpressionStatusStore.setState(response);
    });

class IndicatorExpressionManagerContainer extends Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            organisationUnitGroups: [],
            constants: [],
            programTrackedEntityAttributes: [],
            programIndicators: [],
            programDataElements: [],
        };
    }

    componentDidMount() {
        getD2()
            .then(d2 => d2.models.organisationUnitGroup.list({ paging: false, fields: 'id,displayName' }))
            .then(collection => collection.toArray().map(model => ({ value: model.id, label: model.displayName })))
            .then(organisationUnitGroups => this.setState({ organisationUnitGroups }));

        getD2()
            .then(d2 => d2.models.constant.list({ paging: false, fields: 'id,displayName' }))
            .then(collection => collection.toArray().map(model => ({ value: model.id, label: model.displayName })))
            .then(constants => this.setState({ constants }));

        this.refs.expressionManager.requestExpressionStatus();
    }

    render() {
        const i18n = this.context.d2.i18n;

        return (
            <IndicatorExpressionManager
                descriptionLabel={i18n.getTranslation('description')}
                descriptionValue={this.props.description}
                formulaValue={this.props.formula}
                expressionStatusStore={indicatorExpressionStatusStore}
                expressionChanged={this.props.indicatorExpressionChanged}
                titleText={this.props.titleText}
                ref="expressionManager"
            />
        );
    }
}

IndicatorExpressionManagerContainer.contextTypes = {
    d2: PropTypes.object,
};

IndicatorExpressionManagerContainer.propTypes = {
    indicatorExpressionChanged: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
};

export default IndicatorExpressionManagerContainer;
