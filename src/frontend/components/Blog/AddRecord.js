import React from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import { TextField, Checkbox, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichEditor from './RichEditor';
import * as actions from '../../actions/BlogActions';

class AddRecord extends React.Component {
	static propTypes = {
		addBlogRecord: React.PropTypes.func.isRequired,
		isLoading: React.PropTypes.bool
	};

	constructor() {
		super();
		this.state = {
			title: '',
			body: '',
			hidden: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.addBlogRecord(this.state);
	}

	onChange(e) {
		if (e instanceof Object) {
			const target = e.target;
			const value = target.type === 'checkbox' ? target.checked : target.value;
			this.setState({ [e.target.name]: value });
		} else {
			this.setState({ body: e });
		}
	}

	render() {
		jss.setup(preset());

		const styles = {
			container: {
				padding: 20
			},
			title: {
				fontSize: 20,
				fontWeight: 'normal'
			}
		};

		const { classes } = jss.createStyleSheet(styles).attach();

		return (
			<div className={classes.container}>
				<form onSubmit={this.onSubmit}>
					<h2 className={classes.title}>Add blog record</h2>
					<TextField
						hintText='Title'
						fullWidth
						name='title'
						value={this.state.title}
						onChange={this.onChange}
					/><br />
					<RichEditor
						onChange={this.onChange}
					/><br />
					<Checkbox
						label='Hidden'
						onCheck={this.onChange}
						name='hidden'
						checked={this.state.hidden}
					/>
					<RaisedButton
						fullWidth
						label='Add'
						type='submit'
						primary
						disabled={this.props.isLoading}
					/>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addBlogRecord: actions.addBlogRecord
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		isLoading: state.blog.isLoading
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);
