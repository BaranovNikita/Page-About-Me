import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import Signup from './SignUp';
import { userRegisterRequest } from '../../actions/UserActions';

class SignUpWrapper extends React.Component {
	render() {
		const { userRegisterRequest } = this.props;
		return (
			<Paper zDepth={2}>
				<Signup
					userRegisterRequest={userRegisterRequest}
				/>
			</Paper>
		);
	}
}

SignUpWrapper.propTypes = {
	userRegisterRequest: React.PropTypes.func.isRequired
};


export default connect(null, { userRegisterRequest })(SignUpWrapper);
