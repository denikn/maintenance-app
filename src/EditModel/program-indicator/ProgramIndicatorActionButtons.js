import { bindActionCreators } from 'redux';
import { validateProgramIndicator } from './actions';
import { createConnectedFormActionButtonsForSchema } from '../FormActionButtons';

const mapDispatchToProps = dispatch => bindActionCreators({ onSaveAction: validateProgramIndicator }, dispatch);

const ProgramIndicatorActionButtons = createConnectedFormActionButtonsForSchema(mapDispatchToProps);

export default ProgramIndicatorActionButtons;
