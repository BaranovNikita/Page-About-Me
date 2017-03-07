import React from 'react';
import RichTextEditor from 'react-rte';

class RichEditor extends React.Component {
	static propTypes = {
		onChange: React.PropTypes.func
	};

	state = {
		value: RichTextEditor.createEmptyValue()
	};

	onChange = (value) => {
		this.setState({ value });
		if (this.props.onChange) {
			this.props.onChange(
				value.toString('html')
			);
		}
	};

	render() {
		return (
			<RichTextEditor
				value={this.state.value}
				onChange={this.onChange}
				placeholder='Body'
			/>
		);
	}
}

export default RichEditor;
