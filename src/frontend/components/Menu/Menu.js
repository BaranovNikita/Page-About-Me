import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Drawer, AppBar, MenuItem, Dialog, Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { isEmpty } from 'lodash';
import SignUpWrapper from '../SignUp/SignUpWrapper';
import SignInWrapper from '../SignIn/SignInWrapper';
import { logout } from '../../actions/UserActions';
import styles from './Menu.pcss';

injectTapEventPlugin();

class Menu extends React.Component {
	constructor() {
		super();
		this.state = {
			drawerOpen: false,
			signupDialog: false,
			signinDialog: false
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
		this.signupDialogClose = this.signupDialogClose.bind(this);
		this.signupDialogOpen = this.signupDialogOpen.bind(this);
		this.signinDialogClose = this.signinDialogClose.bind(this);
		this.signinDialogOpen = this.signinDialogOpen.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authState.user) {
			this.signinDialogClose();
		}
	}

	handleToggle() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}

	closeDrawer() {
		this.setState({ drawerOpen: false });
	}

	signupDialogClose() {
		this.setState({ signupDialog: false });
	}

	signupDialogOpen() {
		this.setState({ signupDialog: true });
	}

	signinDialogClose() {
		this.setState({ signinDialog: false });
	}

	signinDialogOpen() {
		this.setState({ signinDialog: true });
	}

	logout() {
		this.props.logout();
	}

	render() {
		const ToolBarGroupGuest = (
			<ToolbarGroup>
				<RaisedButton label='Login' onTouchTap={this.signinDialogOpen} />
				<RaisedButton label='Sign up' secondary onTouchTap={this.signupDialogOpen} />
			</ToolbarGroup>
		);
		const ToolBarGroupUser = (
			<ToolbarGroup>
				<RaisedButton label='Profile' />
				<RaisedButton label='Logout' secondary onTouchTap={this.logout} />
			</ToolbarGroup>
		);

		return (
			<div>
				<AppBar
					title='Baranov Nikita'
					onLeftIconButtonTouchTap={this.handleToggle}
					style={{ position: 'fixed' }}
				>
					<Toolbar style={{ backgroundColor: 'transparent', height: 64 }}>
						{ !isEmpty(this.props.authState.user) ? ToolBarGroupUser : ToolBarGroupGuest }
					</Toolbar>
				</AppBar>
				<Drawer
					docked={false}
					open={this.state.drawerOpen}
					onRequestChange={this.closeDrawer}
				>
					<div className={styles.drawerHeader}>
						<div className={styles.text}>Baranov Nikita</div>
					</div>
					<MenuItem className={styles.menuItemWrapper}>
						<IndexLink to='/' activeClassName={styles.active} className={styles.menuItem}>Home</IndexLink>
					</MenuItem>
					<MenuItem className={styles.menuItemWrapper}>
						<Link to='/blog' activeClassName={styles.active} className={styles.menuItem}>Blog</Link>
					</MenuItem>
					<MenuItem>Menu Item 2</MenuItem>
				</Drawer>
				<Dialog
					title='Sign Up'
					modal={false}
					open={this.state.signupDialog}
					autoDetectWindowHeight={false}
					onRequestClose={this.signupDialogClose}
				>
					<SignUpWrapper
						closeDialog={this.signupDialogClose}
					/>
				</Dialog>
				<Dialog
					title='Sign In'
					modal={false}
					open={this.state.signinDialog}
					className='heh'
					autoDetectWindowHeight={false}
					onRequestClose={this.signinDialogClose}
				>
					<SignInWrapper />
				</Dialog>
			</div>);
	}
}
Menu.propTypes = {
	authState: React.PropTypes.object.isRequired,
	logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return { authState: state.auth };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
