import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Hello from './components/Hello';
import BlogPage from './components/Blog/BlogPage';
import NoMatchRoutePage from './components/NoMatchRoutePage/NoMatchRoutePage';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Hello} />
		<Route component={BlogPage} path='blog' />
		<Route path='*' component={NoMatchRoutePage} />
	</Route>
);
