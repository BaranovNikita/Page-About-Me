import React from 'react';
import loader from './laoder.pcss';

class Loading extends React.Component {
	static propTypes = {

	};

	render() {
		return (<div className={loader.spinner} >
			<div className={loader.bounce1} />
			<div className={loader.bounce2} />
			<div className={loader.bounce3} />
		</div>);
	}
}

export default Loading;
