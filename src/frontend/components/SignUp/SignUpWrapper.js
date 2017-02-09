import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { bindActionCreators } from 'redux';
import { saveFormData, clearFormData } from '../../actions/RegisterFormActions';
import { userRegisterRequest, isUserExists } from '../../actions/UserActions';
import Signup from './SignUp';

class SignUpWrapper extends React.Component {
	render() {
		return (
			<Paper zDepth={2}>
				<Signup
					formData={this.props.registerFormData}
					userRegisterRequest={this.props.userRegisterRequest}
					saveFormData={this.props.saveFormData}
					clearFormData={this.props.clearFormData}
					isUserExists={this.props.isUserExists}
		    	successEvent={this.props.closeDialog}
				/>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return { registerFormData: state.registerForm };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ saveFormData,
			userRegisterRequest,
			clearFormData,
			isUserExists },
		dispatch);
}

SignUpWrapper.propTypes = {
	registerFormData: React.PropTypes.object.isRequired,
	userRegisterRequest: React.PropTypes.func.isRequired,
	saveFormData: React.PropTypes.func.isRequired,
	clearFormData: React.PropTypes.func.isRequired,
	isUserExists: React.PropTypes.func.isRequired,
	closeDialog: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWrapper);
