import React from 'react';
import CardContainer from '../../components/CardContainer';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('CardContainer', () => {
    it('renders correctly', () => {
        const wrapper = Enzyme.shallow(<CardContainer />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Expect card to have title', () => {
        const wrapper = Enzyme.shallow(<CardContainer title="Test Title"/>);
        expect(wrapper.find('.card-container-title').at(0).html().includes("Test Title")).toEqual(true);
    });

    it('Expect card to have subtitle', () => {
        const wrapper = Enzyme.shallow(<CardContainer title="Test Title" subtitle="Test Subtitle"/>);
        expect(wrapper.find('.card-container-subtitle').at(0).html().includes("Test Subtitle")).toEqual(true);
    });

    it('Expect card to have childen', () => {
        const child = <div id="fakeChild">test</div>
        const wrapper = Enzyme.shallow(<CardContainer CardContainer title="Test Title" subtitle="Test Subtitle">{child}</CardContainer>);
        expect(wrapper.find('#fakeChild')).toHaveLength(1);
    });

    it('Expect card to have back button', () => {
        const child = <div id="fakeChild">test</div>
        const wrapper = Enzyme.shallow(<CardContainer CardContainer title="Test Title" subtitle="Test Subtitle" back="true">{child}</CardContainer>);
        expect(wrapper.find('.back-btn')).toHaveLength(1);
    });

    it('Expect card to have next button', () => {
        const child = <div id="fakeChild">test</div>
        const wrapper = Enzyme.shallow(<CardContainer CardContainer title="Test Title" subtitle="Test Subtitle" next="true">{child}</CardContainer>);
        expect(wrapper.find('.continue-btn')).toHaveLength(1);
    });
});