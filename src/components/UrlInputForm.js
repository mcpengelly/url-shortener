import React, { Component, PropTypes } from 'react';
// import ExtendedPropTypes from "extended-proptypes";
// ExtendedPropTypes(PropTypes);

class UrlInputForm extends Component {
	constructor(props){
		super(props);
		this.state = { text: '' };
	}

	handleChange(event) {
		this.setState({ text: event.target.value });
	}

	render(){
		return (
			<div>
				<input type="text" onChange={this.handleChange.bind(this)}></input>
				<button onClick={() => {
					this.props.shortenUrl(this.state.text);
					this.setState({ text: '' })
				}}>shorten</button>
			</div>
		);
	}
}

// UrlInputForm.propTypes = {
// 	text: PropTypes.stringMatching(/^sadman$/).isRequired
// };

export default UrlInputForm;
