import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Drawer, AppBar, MenuItem, Dialog, Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';
import SignUpWrapper from '../SignUp/SignUpWrapper';
import styles from './Menu.pcss';

injectTapEventPlugin();

class Menu extends React.Component {
	constructor() {
		super();
		this.state = {
			drawerOpen: false,
			signupDialog: false,
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
		this.signupDialogClose = this.signupDialogClose.bind(this);
		this.signupDialogOpen = this.signupDialogOpen.bind(this);
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

	render() {
		return (
			<div>
				<AppBar
					title='Baranov Nikita'
					onLeftIconButtonTouchTap={this.handleToggle}
				>
					<Toolbar style={{ backgroundColor: 'transparent', height: 64 }}>
						<ToolbarGroup>
							<RaisedButton label='Login' />
							<RaisedButton label='Sign up' secondary onTouchTap={this.signupDialogOpen} />
						</ToolbarGroup>
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
					<MenuItem>Menu Item 1</MenuItem>
					<MenuItem>Menu Item 2</MenuItem>
				</Drawer>
				<Dialog
					title='SignUp'
					modal={false}
					open={this.state.signupDialog}
					onRequestClose={this.signupDialogClose}
				>
					<SignUpWrapper />
				</Dialog>
			</div>);
	}
}

export default Menu;
