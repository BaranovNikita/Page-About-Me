import React from 'react';
import styles from './App.pcss';
import Menu from '../Menu';

class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.node.isRequired,
	};

	render() {
		return (
			<div>
				<Menu />
				<div className={styles.app}>
					<div className={styles.title}>
						Portfolio page by Baranov Nikita!
					</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default App;
