import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { bindActionCreators } from 'redux';
import { saveFormData, clearFormData } from '../../actions/RegisterFormActions';
import { userRegisterRequest } from '../../actions/UserActions';
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
				/>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return { registerFormData: state.registerForm };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ saveFormData, userRegisterRequest, clearFormData }, dispatch);
}

SignUpWrapper.propTypes = {
	registerFormData: React.PropTypes.object.isRequired,
	userRegisterRequest: React.PropTypes.func.isRequired,
	saveFormData: React.PropTypes.func.isRequired,
	clearFormData: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWrapper);
