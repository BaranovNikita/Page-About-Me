import React from 'react';
import { Paper, TextField, RaisedButton, CircularProgress } from 'material-ui';
import { isEmpty } from 'lodash';
import { userRegisterRequest } from '../../actions/UserActions';
import signupValidate from '../../../share/validate/signup';

class SignUp extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
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

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleClick() {
		this.setState({ isLoading: true });
		console.log(userRegisterRequest);
		userRegisterRequest(this.state)
			.then(user => {
				console.log(user);
				this.setState({ isLoading: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isLoading: false });
			});
	}

	handleBlur(e) {
		this.setState({ isLoading: true });
		const errors = signupValidate(this.state);
		if (Object.prototype.hasOwnProperty.call(errors, e.target.name)) {
			this.setState({ errors: Object.assign({}, this.state.errors, errors), isLoading: false });
		} else {
			const newStateError = { ...this.state.errors };
			delete newStateError[e.target.name];
			this.setState({ errors: newStateError, isLoading: false });
		}
	}

	render() {
		return (
			<Paper zDepth={2}>
				<TextField
					hintText='First name'
					onChange={this.handleChange}
					name='first_name' fullWidth
					onBlur={this.handleBlur}
					errorText={this.state.errors.first_name}
				/>
				<TextField
					hintText='Last name'
					onChange={this.handleChange}
					name='last_name'
					fullWidth
					onBlur={this.handleBlur}
					errorText={this.state.errors.last_name}
				/>
				<TextField
					hintText='Email address'
					onChange={this.handleChange}
					name='email'
					fullWidth
					onBlur={this.handleBlur}
					errorText={this.state.errors.email}
				/>
				<TextField
					hintText='Password'
					onChange={this.handleChange}
					name='password'
					type='password'
					fullWidth
					onBlur={this.handleBlur}
					errorText={this.state.errors.password}
				/>
				<TextField
					hintText='Confirm Password'
					onChange={this.handleChange}
					name='passwordConfirmation'
					type='password'
          fullWidth
					onBlur={this.handleBlur}
					errorText={this.state.errors.passwordConfirmation}
				/>
				<RaisedButton
					label='Sign Up'
					style={{ display: (this.state.isLoading ? 'none' : 'block') }}
					onTouchTap={this.handleClick}
					primary
					disabled={!isEmpty(this.state.errors)}
				/>
				<CircularProgress
					style={{ display: (!this.state.isLoading ? 'none' : 'block'), margin: 'auto' }}
				/>
			</Paper>
		);
	}
}

export default SignUp;
