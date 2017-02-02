import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './reducers';
import Root from './Root';
import App from './components/App';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	),
);


const render = () => {
	ReactDOM.render(
		<AppContainer>
			<MuiThemeProvider>
				<Root store={store} />
			</MuiThemeProvider>
		</AppContainer>,
		document.getElementById('root'),
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./Root', () => {
		render();
	});
}
