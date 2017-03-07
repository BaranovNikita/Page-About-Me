import React from 'react';
import dateFormat from 'dateformat';

class BlogListItem extends React.Component {
	static propTypes = {
		title: React.PropTypes.string,
		author: React.PropTypes.string,
		date: React.PropTypes.string,
		body: React.PropTypes.string,
		classes: React.PropTypes.object,
		handleClick: React.PropTypes.func,
		_id: React.PropTypes.string
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container} onClick={() => this.props.handleClick(this.props._id)}>
				<h2 className={classes.title}>{this.props.title}</h2>
				<hr />
				<div dangerouslySetInnerHTML={{ __html: this.props.body.substring(0, 200) }} />
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
