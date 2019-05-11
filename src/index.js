import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from "redux";
import {Provider} from 'react-redux';
import reducer from './components/store/reducer';
import App from './components/app/app';

const isUsedReduxDevTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(): null;

const store = createStore(reducer,  isUsedReduxDevTools);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
