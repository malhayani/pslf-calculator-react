import React from 'react';
import BooleanInput from '../../components/BooleanInput';
import InputLabel from '../../components/InputLabel';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('BooleanInput', () => {
    it('renders correctly', () => {
        const wrapper = Enzyme.shallow(<BooleanInput />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Expect no inputs to be selected', () => {
        const wrapper = Enzyme.shallow(<BooleanInput value=""/>);
        expect(wrapper.find('i.fa-dot-circle-o')).toHaveLength(0);
    });

    it('Expect an input to be selected', () => {
        const wrapper = Enzyme.shallow(<BooleanInput value="true"/>);
        expect(wrapper.find('i.fa-dot-circle-o')).toHaveLength(1);
    });

    it('Expect the FALSE input to be selected', () => {
        const wrapper = Enzyme.shallow(<BooleanInput value="false"/>);
        expect(wrapper.find('i.fa-dot-circle-o').at(0).props().value).toEqual(false);
    });

    it('Expect the TRUE input to be selected', () => {
        const wrapper = Enzyme.shallow(<BooleanInput value="true"/>);
        expect(wrapper.find('i.fa-dot-circle-o').at(0).props().value).toEqual(true);
    });

    it('Expect the input to have name prop', () => {
        const wrapper = Enzyme.shallow(<BooleanInput value="true" name="Test"/>);
        expect(wrapper.find('i.fa-circle-o').at(0).props().name).toEqual('Test');
    });

    it('Expect the input to have a label', () => {
        const wrapper = Enzyme.shallow(<BooleanInput label="Test" form="Test" value="true" valid="true" name="Test"/>);
        expect(wrapper.find(InputLabel)).toHaveLength(1);
    });

    it('Expect the input to NOT have a label', () => {
        const wrapper = Enzyme.shallow(<BooleanInput label="" value="true" name="Test"/>);
        expect(wrapper.find(InputLabel)).toHaveLength(0);
    });

    it('Expect button to have been clicked', () => {
        const onClickMock = jest.fn();
        const wrapper = Enzyme.shallow(<BooleanInput value="true" name="Test" update={onClickMock}/>);
        wrapper.find('i.fa-circle-o').simulate('click');

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});