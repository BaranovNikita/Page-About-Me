import React from 'react';
import { TextField, RaisedButton, CircularProgress } from 'material-ui';
import * as styles from './style.pcss';

class SignInForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.authFunction(this.state);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<TextField
					hintText='Email address'
					onChange={this.handleChange}
					name='email'
					fullWidth
					value={this.state.email}
					errorText={this.props.authState.errors.email}
				/>
				<TextField
					hintText='Password'
					onChange={this.handleChange}
					name='password'
					type='password'
					fullWidth
					value={this.state.password}
					errorText={this.props.authState.password}
				/>
				<RaisedButton
					label='Sign In'
					style={{ display: (this.props.authState.request ? 'none' : 'block') }}
					primary
					type='submit'
				/>
				<CircularProgress
					style={{ display: (!this.props.authState.request ? 'none' : 'block'), margin: 'auto' }}
				/>
				{this.props.authState.errors.message && <div className={styles['error-box']}>{this.props.authState.errors.message}</div> }
			</form>
		);
	}
}

SignInForm.propTypes = {
	authFunction: React.PropTypes.func.isRequired,
	authState: React.PropTypes.object.isRequired
};

export default SignInForm;
