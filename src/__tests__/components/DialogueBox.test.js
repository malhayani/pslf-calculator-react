import React from 'react';
import DialogueBox from '../../components/DialogueBox';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('DialogueBox', () => {
    it('renders correctly', () => {
        const wrapper = Enzyme.shallow(<DialogueBox />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Expect dialogue box displays text', () => {
        const wrapper = Enzyme.shallow(<DialogueBox msg="Test"/>);
        expect(wrapper.find('.dialogue').html().includes('Test')).toEqual(true);
    });
});