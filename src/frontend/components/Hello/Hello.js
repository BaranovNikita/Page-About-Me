import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Hello extends React.Component {
	constructor() {
		super();
		this.state = {
			clicked: false,
		};
		this.onTouchHandle = this.onTouchHandle.bind(this);
	}

	onTouchHandle() {
		this.setState({ clicked: !this.state.clicked });
	}

	render() {
		return <div>Hello!<RaisedButton label="Default" onTouchTap={this.onTouchHandle} /></div>;
	}
}

export default Hello;
