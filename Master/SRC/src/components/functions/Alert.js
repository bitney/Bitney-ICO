import React, { Component } from 'react';

export default class Alert extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div id="preloader">
	        	<div id="alert" className={this.props.sStyle ? "verifyDiv" : ""}>
	        		{this.props.content}
	        	</div>
	        </div>
		);
	}
}

Alert.defaultProps = {
	sStyle: false
}