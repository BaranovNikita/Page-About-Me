import React from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getBlogItems, addBlogRecord } from '../../actions/BlogActions';
import BlogList from './BlogList';
import loader from './laoder.pcss';

class BlogPage extends React.Component {
	static propTypes = {
		getBlogItems: React.PropTypes.func.isRequired,
		blogItems: React.PropTypes.array.isRequired,
		user: React.PropTypes.object,
		isLoading: React.PropTypes.bool,
		pageCount: React.PropTypes.number
	};

	constructor() {
		super();
		this.changePage = this.changePage.bind(this);
	}
	componentWillMount() {
		this.props.getBlogItems(0, 5);
	}

	changePage(page) {
		this.props.getBlogItems(page.selected * 5, 5);
	}

	render() {
		const isAdmin = this.props.user && this.props.user.email === process.env.ADMIN_EMAIL;

		return (<div>
			{isAdmin && <FloatingActionButton>
				<ContentAdd onTouchTap={() => browserHistory.push('/blog/add')} />
			</FloatingActionButton> }
			<div className={loader.spinner} style={{ display: (!this.props.isLoading ? 'none' : 'block') }}>
				<div className={loader.bounce1} />
				<div className={loader.bounce2} />
				<div className={loader.bounce3} />
			</div>
			<BlogList
				items={this.props.blogItems}
				changePage={this.changePage}
				pageCount={this.props.pageCount}
				isLoading={this.props.isLoading}
			/>
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
		isLoading: state.blog.isLoading,
		user: state.auth.user,
		pageCount: state.blog.pageCount
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
