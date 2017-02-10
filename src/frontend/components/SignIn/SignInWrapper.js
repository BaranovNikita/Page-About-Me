import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import { auth } from '../../actions/UserActions';

class SignInWrapper extends React.Component {
	render() {
		return (
			<Paper zDepth={2}>
				<SignInForm
					authFunction={this.props.auth}
					authState={this.props.authState}
				/>
			</Paper>
		);
	}
}

function mapStateToProps(state) {
	return { authState: state.auth };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ auth }, dispatch);
}

SignInWrapper.propTypes = {
	auth: React.PropTypes.func,
	authState: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInWrapper);
