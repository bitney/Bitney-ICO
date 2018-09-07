import React, { Component } from 'react';

export default class Preload extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div id="preloader">
	            <div id="loader"></div>
	            <div className="loader-section loader-top"></div>
	            <div className="loader-section loader-bottom"></div>
	        </div>
		);
	}
}