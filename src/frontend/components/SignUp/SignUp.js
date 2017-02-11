import React from 'react';
import { TextField, RaisedButton, CircularProgress } from 'material-ui';
import { isEmpty } from 'lodash';
import signupValidate from '../../../share/validate/signup';

class SignUp extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			isLoading: false,
			errors: {
				first_name: '',
			},
		};
	}

	componentWillMount() {
		this.setState(this.props.formData);
	}

	componentWillUnmount() {
		this.props.saveFormData(this.state);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ isLoading: true });
		this.props.userRegisterRequest(this.state)
			.then(() => {
				this.setState({ isLoading: false, errors: {} });
				this.props.clearFormData();
				if (this.props.successEvent) {
					this.props.successEvent();
				}
			})
			.catch((err) => {
				this.setState({ isLoading: false, errors: { ...this.state.errors, ...err.response.data } });
				this.props.clearFormData();
			});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleBlur(e) {
		this.setState({ isLoading: true });
		const errors = signupValidate(this.state);
		if (Object.prototype.hasOwnProperty.call(errors, e.target.name)) {
			this.setState({ errors: Object.assign({}, this.state.errors, errors), isLoading: false });
		} else {
			let newStateError = {};
			if (e.target.name === 'email') {
				this.props.isUserExists(e.target.value)
					.then((response) => {
						if (response.data.user) {
							this.setState({ errors: { ...this.state.errors, email: 'Already exist!' } });
						} else {
							newStateError = { ...this.state.errors };
							delete newStateError.email;
						}
					});
			} else {
				newStateError = { ...this.state.errors };
				delete newStateError[e.target.name];
			}
			this.setState({ errors: newStateError, isLoading: false });
		}
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<TextField
					hintText='First name'
					onChange={this.handleChange}
					name='first_name' fullWidth
					onBlur={this.handleBlur}
					value={this.state.first_name}
					errorText={this.state.errors.first_name}
				/>
				<TextField
					hintText='Last name'
					onChange={this.handleChange}
					name='last_name'
					fullWidth
					value={this.state.last_name}
					onBlur={this.handleBlur}
					errorText={this.state.errors.last_name}
				/>
				<TextField
					hintText='Email address'
					onChange={this.handleChange}
					name='email'
					fullWidth
					value={this.state.email}
					onBlur={this.handleBlur}
					errorText={this.state.errors.email}
				/>
				<TextField
					hintText='Password'
					onChange={this.handleChange}
					name='password'
					type='password'
					fullWidth
					value={this.state.password}
					onBlur={this.handleBlur}
					errorText={this.state.errors.password}
				/>
				<TextField
					hintText='Confirm Password'
					onChange={this.handleChange}
					name='passwordConfirmation'
					type='password'
          fullWidth
					value={this.state.passwordConfirmation}
					onBlur={this.handleBlur}
					errorText={this.state.errors.passwordConfirmation}
				/>
				<RaisedButton
					label='Sign Up'
					style={{ display: (this.state.isLoading ? 'none' : 'block') }}
					type='submit'
					primary
					disabled={!isEmpty(this.state.errors)}
				/>
				<CircularProgress
					style={{ display: (!this.state.isLoading ? 'none' : 'block'), margin: 'auto' }}
				/>
				{this.state.errors.message && <div className='error-box'>{this.state.errors.message}</div> }
			</form>
		);
	}
}

SignUp.propTypes = {
	userRegisterRequest: React.PropTypes.func.isRequired,
	saveFormData: React.PropTypes.func.isRequired,
	formData: React.PropTypes.object.isRequired,
	clearFormData: React.PropTypes.func.isRequired,
	isUserExists: React.PropTypes.func.isRequired,
	successEvent: React.PropTypes.func
};

export default SignUp;
