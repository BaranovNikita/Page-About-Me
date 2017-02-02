import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Hello from './components/Hello';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Hello} />
	</Route>
);
