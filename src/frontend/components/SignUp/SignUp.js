import React from "react";
import {Paper, TextField, RaisedButton, CircularProgress} from "material-ui";
import {isEmpty, clone} from "lodash";
import validateSignup from "../../../share/validate/validateSignup";

class SignUp extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			isLoading: false,
			errors: {},
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleClick() {
		this.setState({ isLoading: true });
		const errors = validateSignup(this.state);
		if (isEmpty(errors)) {
			setTimeout(() => this.setState({isLoading: false}), 2000);
		} else {
			this.setState({errors, isLoading: false});
		}
	}

	validate(e) {
		if (!e.target.value) {
			this.setState({errors: Object.assign(this.state.errors, {[e.target.name]: 'Required!'})});
		} else {
			const newErrorsState = clone(this.state.errors);
			if (newErrorsState[e.target.name]) {
				delete newErrorsState[e.target.name];
				this.setState({errors: newErrorsState});
			}
		}
	}

	render() {
		return (
			<Paper zDepth={2}>
				<TextField
					hintText="First name"
					onChange={this.handleChange}
					name="first_name"
					fullWidth
					errorText={this.state.errors.first_name}
					onBlur={this.validate}
				/>
				<TextField
					hintText="Last name"
					onChange={this.handleChange}
					name="last_name"
					errorText={this.state.errors.last_name}
					fullWidth
					onBlur={this.validate}
				/>
				<TextField
					hintText="Email address"
					onChange={this.handleChange}
					name="email"
					fullWidth
					errorText={this.state.errors.email}
					onBlur={this.validate}
				/>
				<TextField
					hintText="Password"
					onChange={this.handleChange}
					name="password"
					type="password"
					fullWidth
					errorText={this.state.errors.password}
					onBlur={this.validate}
				/>
				<TextField
					hintText="Confirm Password"
					onChange={this.handleChange}
					name="passwordConfirm"
					type="password"
					fullWidth
					errorText={this.state.errors.passwordConfirm}
					onBlur={this.validate}
				/>
				<RaisedButton
					label="Sign Up"
					style={{display: (this.state.isLoading ? 'none' : 'block')}}
					onTouchTap={this.handleClick}
					primary
					disabled={!isEmpty(this.state.errors)}
				/>
				<CircularProgress style={{ display: (!this.state.isLoading ? 'none' : 'block'), margin: 'auto' }} />
			</Paper>
		);
	}
}

export default SignUp;
