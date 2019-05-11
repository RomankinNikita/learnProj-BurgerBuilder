import reducer, {initialState} from './reducer';
import * as actions from './actions';

describe('reducer', () => {
	it('should set error in state', () => {
		expect(reducer(initialState, actions.signInError('error')))
			.toEqual({...initialState, error: 'error'});
	});
});