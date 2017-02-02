import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Drawer, AppBar, MenuItem, IconMenu, IconButton, Dialog} from "material-ui";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import styles from "./Menu.css";
injectTapEventPlugin();

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      loginDialog: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.loginDialogClose = this.loginDialogClose.bind(this);
    this.loginDialogOpen = this.loginDialogOpen.bind(this);
  }

  handleToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  closeDrawer() {
    this.setState({drawerOpen: false});
  }

  loginDialogClose() {
    this.setState({loginDialog: false});
  }

  loginDialogOpen() {
    this.setState({loginDialog: true});
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
        <MenuItem primaryText="Login" onTouchTap={this.loginDialogOpen}/>
        <MenuItem primaryText="Sign in"/>
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
        title="Dialog With Actions"
        modal={false}
        open={this.state.loginDialog}
        onRequestClose={this.loginDialogClose}
      >
        The actions in this window were passed in as an array of React objects.
      </Dialog>
    </div>);
  }
}

export default Menu;
