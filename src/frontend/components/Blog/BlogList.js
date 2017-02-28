import React from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import ReactPaginate from 'react-paginate';
import BlogListItem from './BlogListItem';

jss.setup(preset());

const styles = {
	containerWrap: {
		width: 800,
		margin: 'auto'
	},
	container: {
		padding: 20,
		cursor: 'pointer'
	},
	title: {
		fontSize: 20,
		fontWeight: 'normal',
		paddingLeft: 50
	},
	info: {
		textAlign: 'right',
		'&.author': {
			marginRight: 20,
			display: 'inline-block'
		},
		'&.date': {
			display: 'inline-block'
		}
	},
	pagination: {
		'list-style-type': 'none',
		display: 'inline-block',
		paddingLeft: 0,
		textAlign: 'left',
		'& > li': {
			display: 'inline-block',
			border: '1px solid blue',
			margin: '0 5px',
			cursor: 'pointer',
			color: 'blue',
			'& > a': {
				outline: 'none',
				display: 'block',
				padding: '0 10px'
			},
			'&.disabled': {
				cursor: 'default',
				backgroundColor: 'gray'
			},
			'&.active': {
				color: 'white',
				backgroundColor: 'blue'
			}
		},
		'& .previous': {
			marginRight: 10
		},
		'& .next': {
			marginLeft: 10
		}
	}
};

const { classes } = jss.createStyleSheet(styles).attach();

class BlogList extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired,
		pageCount: React.PropTypes.number,
		changePage: React.PropTypes.func,
		isLoading: React.PropTypes.bool
	};

	render() {
		return (<div className={classes.containerWrap}>
			<div>
				{this.props.items.map(item =>
					<BlogListItem
						{...item}
						classes={classes}
						key={item._id}
					>
						{item.body}
					</BlogListItem>
				)}
			</div>
			<div style={{ textAlign: 'center', display: (this.props.isLoading ? 'none' : 'block') }}>
				{<ReactPaginate
					pageCount={this.props.pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={this.props.changePage}
					containerClassName={classes.pagination}
					previousClassName='previous'
					nextClassName='next'
					activeClassName='active'
				/>}
			</div>
		</div>);
	}
}

export default BlogList;
