import React from 'react';
import { shallow } from 'enzyme';
import Row from 'd2-ui/lib/layout/Row.component';
import ColorPicker from 'd2-ui/lib/legend/ColorPicker.component';
import IconButton from 'material-ui/IconButton/IconButton';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import TextField from 'material-ui/TextField/TextField';
import Color from '../Color';

describe('Color', () => {
    it('should render a Row component', () => {
        expect(shallow(<Color />)).to.have.type(Row);
    });

    describe('delete icon', () => {
        it('should render a IconButton to delete the color', () => {
            expect(shallow(<Color />).children().first()).to.have.type(IconButton);
        });

        it('should have put the CancelIcon in the IconButton', () => {
            const cancelIcon = shallow(<Color />).children().first().children().first();

            expect(cancelIcon).to.have.type(CancelIcon);
        });

        it('should call the onDelete callback when clicked', () => {
            const deleteSpy = sinon.spy();
            const iconButton = shallow(<Color  onDelete={deleteSpy} />).children().first();

            iconButton.simulate('click');

            expect(deleteSpy).to.be.called;
        });
    });

    describe('name field', () => {
        let nameField;

        beforeEach(() => {
            nameField = shallow(<Color id="B4fnfpFUAlp" name="Red" color="#FF0000" />).children().at(1);
        });

        it('should be wrapped in a div with the correct style', () => {
            expect(nameField).to.have.type('div');
            expect(nameField.prop('style')).to.deep.equal({ flex: '1 1 100%', paddingLeft: '3rem' });
        });

        it('should be rendered as a TextField', () => {
            const textField = nameField.children().first();

            expect(textField).to.have.type(TextField);
        });

        it('should pass the name prop through as the value', () => {
            const textField = nameField.children().first();

            expect(textField.prop('value')).to.equal('Red');
        });

        it('should pass through the id prop', () => {
            const textField = nameField.children().first();

            expect(textField.prop('id')).to.equal('B4fnfpFUAlp');
        });

        it('should call onChange when the name is changed', () => {
            const onChangeSpy = sinon.spy();
            nameField = shallow(
                <Color
                    id="B4fnfpFUAlp"
                    name="Red"
                    color="#FF0000"
                    onChange={onChangeSpy}
                />
            ).children().at(1);
            const textField = nameField.children().first();

            textField.simulate('change', { target: {value: 'RedBlue' }}, 'RedBlue');

            expect(onChangeSpy).to.be.calledWith({ name: 'RedBlue', color: '#FF0000' });
        });
    });

    describe('color field', () => {
        let colorField;
        let colorPicker;

        beforeEach(() => {
            colorField = shallow(<Color id="B4fnfpFUAlp" name="Red" color="#FF0000" />).children().at(2);
            colorPicker = colorField.children().first();
        });

        it('should be wrapped in a div with the correct style', () => {
            expect(colorField).to.have.type('div');
            expect(colorField.prop('style')).to.deep.equal({ flex: 0 });
        });

        it('should be rendered as a ColorPicker', () => {
            expect(colorPicker).to.have.type(ColorPicker);
        });

        it('should pass through the color prop', () => {
            expect(colorPicker.prop('color')).to.equal('#FF0000');
        });

        it('should call onChange when the color is changed', () => {
            const onChangeSpy = sinon.spy();
            colorField = shallow(
                <Color
                    id="B4fnfpFUAlp"
                    name="Red"
                    color="#FF0000"
                    onChange={onChangeSpy}
                />
            ).children().at(2);
            colorPicker = colorField.children().first();

            colorPicker.simulate('change', '#FFFF00');

            expect(onChangeSpy).to.be.calledWith({ name: 'Red', color: '#FFFF00' });
        });
    });
});
