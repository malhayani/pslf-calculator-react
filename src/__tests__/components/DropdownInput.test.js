import React from 'react';
import DropdownInput from '../../components/DropdownInput';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('DropdownInput', () => {
    it('renders correctly', () => {
        let optionsList = ['Test Option'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('Expect is not open by default', () => {
        let optionsList = ['Test Option'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList} size="sm" value="" defaultText="Test" valid="true"/>);
        expect(wrapper.find(Dropdown).at(0).props().isOpen).toEqual(false);
    });

    it('Expect there to be two dropdown options', () => {
        let optionsList = ['Test Option', 'Test Option 2'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList} size="sm" value="" defaultText="Test" valid="true"/>);
        expect(wrapper.find(DropdownItem)).toHaveLength(2);
    });

    it('Expect to have invalid-field class', () => {
        let optionsList = ['Test Option'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList} size="sm" value="" defaultText="Test" valid="false"/>);
        expect(wrapper.find('.invalid-field')).toHaveLength(1);
    });

    it('Expect to show default text', () => {
        let optionsList = ['Test Option'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList} size="sm" value="" defaultText="Test" valid="true"/>);
        expect(wrapper.find(DropdownToggle).at(0).html().includes("Test")).toEqual(true);
    });

    it('Expect to show selected text', () => {
        let optionsList = ['Test Option'];
        const wrapper = Enzyme.shallow(<DropdownInput options={optionsList} size="sm" value="Selection" defaultText="Test" valid="true"/>);
        expect(wrapper.find(DropdownToggle).at(0).html().includes("Selection")).toEqual(true);
    });

});