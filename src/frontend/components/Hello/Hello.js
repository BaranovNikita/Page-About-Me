import React from 'react';
import * as styles from './styles.pcss';
import Technologies from './Technologies';

class Hello extends React.Component {

	render() {
		return (<div className={styles.container}>
			<div className={styles.centerText}>
				Hello! My name is Baranov Nikita. I am fullstack web developer.
			</div>
			I am very familiar with the following list of technologies:
			<Technologies styles={styles} />
		</div>);
	}
}

export default Hello;
