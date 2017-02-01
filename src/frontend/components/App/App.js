import React from 'react';
import styles from './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className={styles.app}>
					<div className={styles.big}>
						this is big text
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;