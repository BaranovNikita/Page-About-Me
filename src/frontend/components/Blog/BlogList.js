import React from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
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
	}
};

const { classes } = jss.createStyleSheet(styles).attach();

class BlogList extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired,
		nextPage: React.PropTypes.func.isRequired,
		prevPage: React.PropTypes.func.isRequired,
		canNext: React.PropTypes.bool,
		canPrev: React.PropTypes.bool
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
			<div>
				<button onClick={this.props.prevPage} disabled={!this.props.canPrev}>prev</button>
				<button onClick={this.props.nextPage} disabled={!this.props.canNext}>next</button>
			</div>
		</div>);
	}
}

export default BlogList;
