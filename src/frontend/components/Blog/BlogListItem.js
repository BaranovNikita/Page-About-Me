import React from 'react';
import dateFormat from 'dateformat';

class BlogListItem extends React.Component {
	static propTypes = {
		title: React.PropTypes.string,
		author: React.PropTypes.string,
		date: React.PropTypes.string,
		body: React.PropTypes.string,
		classes: React.PropTypes.object
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<h2 className={classes.title}>{this.props.title}</h2>
				<hr />
				<div>{this.props.body.substring(0, 200)}</div>
				<hr />
				<div className={classes.info}>
					<span className={`${classes.info} author`}>{this.props.author}</span>
					<span className={`${classes.info} date`}>{dateFormat(new Date(this.props.date), 'dd.mm.yyyy, HH:MM')}</span>
				</div>
			</div>
		);
	}
}

export default BlogListItem;
