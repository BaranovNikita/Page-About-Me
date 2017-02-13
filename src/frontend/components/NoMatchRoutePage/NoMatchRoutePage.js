import React from 'react';
import { browserHistory } from 'react-router';
import { RaisedButton } from 'material-ui';
import * as styles from './style.pcss';

class NoMatchRoutePage extends React.Component {
	static propTypes = {

	};

	render() {
		return (
			<div className={`${styles.fof} ${styles.clear}`}>
				<h1>404</h1>
				<h2>Error ! <span>Page Not Found</span></h2>
				<p>For Some Reason The Page You Requested Could Not Be Found On Our Server</p>
				<div className={styles.buttons}>
					<RaisedButton
						onTouchTap={browserHistory.goBack}
						className={styles.navButton}
						primary
					>« Go Back</RaisedButton>
					<RaisedButton
						onTouchTap={() => browserHistory.push('/')}
						className={styles.navButton}
						primary
					>Go Home »</RaisedButton>
				</div>
			</div>);
	}
}

export default NoMatchRoutePage;
