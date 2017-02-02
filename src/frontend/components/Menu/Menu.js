import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Drawer, AppBar, MenuItem, IconMenu, IconButton, Dialog} from "material-ui";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import SignUp from "../SignUp/SignUp";
import styles from "./Menu.css";
injectTapEventPlugin();

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      signupDialog: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.signupDialogClose = this.signupDialogClose.bind(this);
    this.signupDialogOpen = this.signupDialogOpen.bind(this);
  }

  handleToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  closeDrawer() {
    this.setState({drawerOpen: false});
  }

  signupDialogClose() {
    this.setState({signupDialog: false});
  }

  signupDialogOpen() {
    this.setState({signupDialog: true});
  }

  render() {
    const iconMenu = (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Login"/>
        <MenuItem primaryText="Sign up" onTouchTap={this.signupDialogOpen}/>
      </IconMenu>);
    return (<div>
      <AppBar title='Baranov Nikita'
              onLeftIconButtonTouchTap={this.handleToggle}
              iconElementRight={iconMenu}
      />
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
        title="SignUp"
        modal={false}
        open={this.state.signupDialog}
        onRequestClose={this.signupDialogClose}
      >
        <SignUp/>
      </Dialog>
    </div>);
  }
}

export default Menu;
