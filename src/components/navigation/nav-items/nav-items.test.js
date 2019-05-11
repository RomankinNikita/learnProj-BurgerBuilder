import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {NavItems} from './nav-items';
import NavItem from '../nav-item/nav-item';

configure({adapter: new Adapter()});

describe('<NavItems/>', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavItems/>);
	});

	it('should render two NavItem if not auth', () => {
		wrapper.setProps({token: null});
		expect(wrapper.find(NavItem)).toHaveLength(3);
	});

	it('should render three NavItem if auth', () => {
		wrapper.setProps({token: 'hhj665f'});
		expect(wrapper.find(NavItem)).toHaveLength(3);
	});

	it('should contain logout button', () => {
		wrapper.setProps({token: 'hhj665f'});
		expect(wrapper.contains(<NavItem link='/log-out'>Log-Out</NavItem>)).toEqual(true);
	});
});