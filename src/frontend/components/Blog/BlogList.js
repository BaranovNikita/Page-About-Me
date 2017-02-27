import React from 'react';

class BlogList extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired,
		page: React.PropTypes.number.isRequired,
		changePage: React.PropTypes.func.isRequired
	};

	render() {
		return (<div>Blog items was here!</div>);
	}
}

export default BlogList;
