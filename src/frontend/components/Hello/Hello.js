import React from "react";
import RaisedButton from "material-ui/RaisedButton";

class Hello extends React.Component {
  constructor() {
    super();
    this.onTouchHandle = this.onTouchHandle.bind(this);
  }

  onTouchHandle(e) {
    console.log(e.target);
  }

  render() {
    return <div>Hello!<RaisedButton label="Default" onTouchTap={this.onTouchHandle}/></div>;
  }
}

export default Hello;