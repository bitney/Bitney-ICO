import React, { Component } from 'react';
import Header from '../header/Header';
// import Main from '../main/Main';
import Intro from '../main/Intro';
import Explain from '../main/Explain';
import Partners from '../main/Partners';
import Game from '../main/Game';
import TokenSale from '../main/TokenSale';
import RoadMap from '../main/RoadMap';
import Team from '../main/Team';
import Contact from '../main/Contact';
import Connect from '../main/Connect';
import Footer from '../footer/Footer';
import Preload from '../functions/Preload';
import Dashboard from '../dashboard/Dashboard';
import { Route, Redirect } from 'react-router-dom';

export default class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			IsAdmin: 0,
			lang: "",
			selectedFlag: 0
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleLangChange = this.handleLangChange.bind(this);
	}

	handleEmailChange(email, IsAdmin) {
		this.setState({
			email: email,
			IsAdmin: IsAdmin
		});
	}

	handleLangChange(lang) {
		console.log("===", lang);
		this.setState({"lang": lang});
	}

	render() {
		return (
			<div>
				<Route exact path="/" render={() => (
					<Header 
						handleEmailChange={this.handleEmailChange}
						handleLangChange={this.handleLangChange}
					/>
				)} />
				<Route exact path="/" render={() => (
					<Intro lang={this.state.lang} />
				)} />
				<Route exact path="/" render={() => (
					<Explain lang={this.state.lang} />
				)} />
				<Route exact path="/" component={Partners} />
				<Route exact path="/" render={() => (
					<Game lang={this.state.lang} />
				)} />
				<Route exact path="/" render={() => (
					<TokenSale lang={this.state.lang} />
				)} />
				<Route exact path="/" component={RoadMap} />
				<Route exact path="/" component={Team} />
				<Route exact path="/" component={Contact} />
				<Route exact path="/" render={() => (
					<Connect lang={this.state.lang} />
				)} />
				<Route exact path="/" component={Footer} />
				{/*<Route exact path="/" component={Preload} />*/}
				<Route path="/dashboard" render={() => (
					<Dashboard
						email={this.state.email}
						IsAdmin={this.state.IsAdmin}
						handleLangChange={this.handleLangChange}
					/>
				)} />
			</div>
		);
	}
}