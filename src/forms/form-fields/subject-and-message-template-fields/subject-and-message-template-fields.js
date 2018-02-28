import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField/TextField';
import Row from 'd2-ui/lib/layout/Row.component';
import Column from 'd2-ui/lib/layout/Column.component';
import Divider from 'material-ui/Divider';
import Heading from 'd2-ui/lib/headings/Heading.component';
import { map, compose } from 'lodash/fp';
import VariableList from './variable-list';

export default class SubjectAndMessageTemplateFields extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lastActiveField: 'subjectTemplate',
            lastIndex: 0,
        };

        this.insertVariable = this.insertVariable.bind(this);
    }

    setActiveField(field) {
        return (event) => {
            this.setState({
                lastActiveField: field,
                lastIndex: event.target.selectionEnd,
            });
        };
    }

    insertVariable(variable) {
        const lastIndex = this.state.lastIndex;
        const currentValue = (this.props.model[this.state.lastActiveField] || '');

        this.props.onUpdate({
            fieldName: this.state.lastActiveField,
            value: `${currentValue.slice(0, lastIndex)}${variable}${currentValue.slice(lastIndex)}`,
        });
    }

    subjectOnChange = (event, value) => this.props.onUpdate({ fieldName: 'subjectTemplate', value })

    messageOnChange = (event, value) => this.props.onUpdate({ fieldName: 'messageTemplate', value })

    render() {
        const d2 = this.context.d2;

        const styles = {
            dividerWrap: {
                padding: '0 2rem 1rem',
            },
            divider: {
                marginTop: '2rem',
                marginBottom: '2rem',
                marginLeft: '-5rem',
                marginRight: '-5rem',
            },
            heading: {
                fontSize: '1.25rem',
            },
            subject: {
                flex: '0 0 72px',
            },
            fieldWrap: {
                position: 'relative',
            },
        };

        return (
            <div style={{ ...styles.fieldWrap, ...this.props.style }}>
                <div style={styles.dividerWrap}><Divider style={styles.divider} /></div>
                <Heading level={3} style={styles.heading}>Message template</Heading>
                <Row>
                    <Column>
                        <div style={styles.subject}>
                            <TextField
                                name="subjectTemplate"
                                fullWidth
                                floatingLabelText={d2.i18n.getTranslation('subject_template')}
                                onBlur={this.setActiveField('subjectTemplate')}
                                value={this.props.model.subjectTemplate || ''}
                                onChange={this.subjectOnChange}
                                onKeyUp={this.setActiveField('subjectTemplate')}
                            />
                        </div>
                        <div>
                            <TextField
                                name="messageTemplate"
                                multiLine
                                fullWidth
                                floatingLabelText={d2.i18n.getTranslation('message_template')}
                                onBlur={this.setActiveField('messageTemplate')}
                                value={this.props.model.messageTemplate || ''}
                                onChange={this.messageOnChange}
                            />
                        </div>
                    </Column>
                    <VariableList onItemSelected={this.insertVariable} variableTypes={this.props.variableTypes} />
                </Row>
                <div style={styles.dividerWrap}><Divider style={styles.divider} /></div>
            </div>
        );
    }
}

SubjectAndMessageTemplateFields.propTypes = {
    style: PropTypes.object,
    variableTypes: PropTypes.array,
    onUpdate: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
};

SubjectAndMessageTemplateFields.defaultProps = {
    style: {},
    variableTypes: [],
};


SubjectAndMessageTemplateFields.contextTypes = {
    d2: PropTypes.object,
};
