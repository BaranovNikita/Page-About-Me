import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';


const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} key={Math.random()} />
	</Provider>
);
Root.propTypes = {
	store: React.PropTypes.object.isRequired,
};
export default Root;
