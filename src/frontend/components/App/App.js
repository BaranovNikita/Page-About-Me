import React from 'react';
import styles from './App.scss';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className={styles.app}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;