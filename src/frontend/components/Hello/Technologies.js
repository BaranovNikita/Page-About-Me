import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as icons from './icons';

class Technologies extends React.Component {
	static propTypes = {
		styles: React.PropTypes.object
	};

	render() {
		const { styles } = this.props;

		const data = [{
			name: 'HTML5',
			language: 'HTML',
			icon: icons.html5
		}, {
			name: 'CSS3',
			language: 'CSS',
			icon: icons.css3
		}, {
			name: 'SQL',
			language: 'SQL',
			icon: icons.sql
		}, {
			name: 'MongoDB',
			language: 'JavaScript',
			icon: icons.mongo
		}, {
			name: 'React',
			language: 'JavaScript',
			icon: icons.react
		}, {
			name: 'Redux',
			language: 'JavaScript',
			icon: icons.redux
		}, {
			name: 'Node.js',
			language: 'JavaScript',
			icon: icons.node
		}, {
			name: 'jQuery',
			language: 'JavaScript',
			icon: icons.jQuery
		}, {
			name: 'ASP.NET',
			language: 'C#',
			icon: icons.aspNet
		}, {
			name: 'ADF',
			language: 'Java',
			icon: icons.adf
		}, {
			name: 'Android',
			language: 'Java',
			icon: icons.android
		}];

		const columns = [{
			header: 'Name',
			accessor: 'name',
			className: styles.columnCenterText
		}, {
			header: 'Language',
			accessor: 'language',
			className: styles.columnCenterText
		}, {
			header: 'Icon',
			accessor: 'icon',
			render: props => <img className={styles.icon} src={props.value} alt='React' />,
			width: 70,
			className: styles.columnCenterText
		}];
		return (
			<ReactTable
				data={data}
				columns={columns}
				className={styles.tableContainer}
				defaultPageSize={5}
				showPageSizeOptions={false}
			/>
		);
	}
}

export default Technologies;
