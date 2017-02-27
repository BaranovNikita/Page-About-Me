import React from 'react';
import { FloatingActionButton, SvgIcon } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBlogItems, addBlogRecord } from '../../actions/BlogActions';
import BlogList from './BlogList';

class BlogPage extends React.Component {
	static propTypes = {
		getBlogItems: React.PropTypes.func.isRequired,
		blogItems: React.PropTypes.array.isRequired,
		page: React.PropTypes.number.isRequired,
		user: React.PropTypes.object
	};

	componentWillMount() {
		this.props.getBlogItems(0, 5);
		console.log(SvgIcon);
	}

	changePage(page) {
		this.props.getBlogItems(page * 5, 5);
	}

	render() {
		const isAdmin = this.props.user && this.props.user.email === process.env.ADMIN_EMAIL;
		return (<div>
			{isAdmin && <FloatingActionButton><ContentAdd /> </FloatingActionButton> }
			<BlogList items={this.props.blogItems} page={this.props.page} changePage={this.changePage} />
		</div>);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getBlogItems,
		addBlogRecord
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		blogItems: state.blog.items,
		page: state.blog.page,
		isLoading: state.blog.isLoading,
		user: state.auth.user
	};
}
export default connect(mapDispatchToProps, mapStateToProps)(BlogPage);
