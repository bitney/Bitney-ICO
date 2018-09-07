import React, { Component } from 'react';
import { API_SERVER } from '../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Preload from '../functions/Preload';
import Alert from '../functions/Alert';
import { translate, Trans } from 'react-i18next';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isLoaded: 0,
			alert: 0,
			api_headers: {
				headers: null
			},
			clickedFlag: 0,
			selectedFlag: 0,
			isFlagMenu: false,
			lang: 'en'
		};

		this.handleFlagClick = this.handleFlagClick.bind(this);
	}

	componentDidMount() {
		var lang = window.localStorage.getItem('i18nextLng');
		if (lang == "ch") {
			this.setState({
				selectedFlag: 1,
				lang: "ch"
			});
			this.props.handleLangChange("ch");
		}
		else {
			this.setState({
				selectedFlag: 0,
				lang: "en"
			});
			this.props.handleLangChange("en");
		}

	    axios.get(API_SERVER + '/api/v1/user/self')
	    .then((data) => {
			var results = data.data;
			if(results.email) {
				axios.get(API_SERVER + '/api/v1/get/auth0/apitoken')
				.then((response) => {
					const headers = {authorization: `Bearer ${response.data.access_token}`};
					this.setState({api_headers: {headers: headers}});

	                axios.get("https://bitney.auth0.com/api/v2/users/" + results.auth0_id, this.state.api_headers)
	                .then(res => {
	                	if (res.data.email_verified) {
							this.setState({isAuthenticated: true, isLoaded: 1});
							this.props.handleEmailChange(results.email, results.IsAdmin);
	                	} else {
	                		axios.get(API_SERVER + '/api/v1/user/clear')
	                		.then(r => console.log(r))
	                		.catch(e => console.log(e));

	                		this.setState({
	                			alert: 1,
	                			isLoaded: 1,
	                			content: (
					                <div style={{textAlign: "center"}}>
					                    <p>
					                        We sent verification email to your email.<br />
					                        Please verify your email first.
					                    </p><br />
					                    <button onClick={() => {this.setState({"alert": 0})}}>OK</button>
										<p style={{margin: "10px", fontSize: "15px"}}>I didn't receive verification email.&nbsp;
											<a style={{color: "#ffa93d", textDecoration: "underline", fontWeight: "bold", cursor: "pointer"}} onClick={() => {
							                        var payload = {"user_id": results.auth0_id};
							                        axios.post("https://bitney.auth0.com/api/v2/jobs/verification-email", payload, this.state.api_headers)
							                        .then((rr) => {	if (rr.data.status == "completed" || rr.data.status == "pending") alert("Resent successfully.")
							                    					else {
							                    						alert("Didn't resend verification email. Please contact to administrator.");
							                    						console.log(rr);
							                    					}
							                    	})
							                       	.catch((e) => { console.log(e);alert("Something wrong in resending.");});
							                    }}
											>
												Resend
											</a>
										</p>
					                </div>
					            )
	                		});
	                	}
	                })
	                .catch(err => {
	                	console.log(err);
	                	this.setState({isLoaded: 1});
	                })
				})
				.catch(err => {
					console.log(err);
					this.setState({isLoaded: 1});
				});
			} else {
				this.setState({isLoaded: 1});
			}
		})
		.catch(error => {
		    console.log(error);
		    this.setState({isLoaded: 1});
	    });
	}

	handleFlagClick(action) {
		var selectedFlag = this.state.selectedFlag;
		if (action == 1) {
			this.setState({
				selectedFlag: (this.state.selectedFlag + 1) % 2,
				clickedFlag: this.state.clickedFlag + 1,
				isFlagMenu: false
			});
		} else if (action == 0) {
			var clickedFlag = this.state.clickedFlag + 1;
			this.setState({
				clickedFlag: clickedFlag,
				isFlagMenu: true
			});
			if (clickedFlag % 2 == 0) this.setState({isFlagMenu: false});
		}
		return selectedFlag;
	}

	render() {
	    const { t, i18n } = this.props;

	    const changeLanguage = (action) => {
	    	var res = this.handleFlagClick(action);
	    	if (res == 0 && action == 1) {
	    		i18n.changeLanguage("ch");
	    		this.props.handleLangChange("ch");
	    	}
	    	else if (res == 1 && action == 1) {
	    		i18n.changeLanguage("en");
	    		this.props.handleLangChange("en");
	    	}
	    	this.setState({lang: window.localStorage.getItem('i18nextLng')});
	    }

		const whitepaper = (<a 	href="https://www.docdroid.net/ScoUHjA/beeznixbrightpaperengv10.pdf" 
								className="nav-link btn btn-sm btn-outline menu-link" 
								target="none">WHITEPAPER
							</a>);

		const register = (!this.state.isAuthenticated ?
							(<div style={{display: "-webkit-box"}}>
								<a href={"/login/" + this.state.lang}
									className="minw nav-link btn btn-sm btn-outline menu-link"><Trans>login</Trans>
								</a>&nbsp;&nbsp;
								<a href={"/signup/" + this.state.lang}
									className="minw nav-link btn btn-sm btn-outline menu-link"><Trans>signup</Trans>
								</a>
							</div>) :
							(<Link to="/dashboard/buy"
								className="nav-link btn btn-sm btn-outline menu-link"><Trans>myaccount</Trans></Link>)
						);

		return (
	        <header className="site-header is-sticky">
	            <div id="particles-js" className="particles-container particles-js"></div>
	            <div className="navbar navbar-expand-lg is-transparent" id="mainnav">
	                <nav className="container">
	                    <a className="navbar-brand animated" data-animate="fadeInDown" data-delay=".65" href="#header">
		                    <img className="logo logo-dark" alt="logo" src="/images/logo.png" srcSet="images/logo2x.png 2x" />
		                    <img className="logo logo-light" alt="logo" src="/images/logo-white.png" srcSet="images/logo-white2x.png 2x" />
	                    </a>
	                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle">
	                    <span className="navbar-toggler-icon">
	                    <span className="ti ti-align-justify"></span>
	                    </span>
	                    </button>
	                    <div className="collapse navbar-collapse justify-content-end" id="navbarToggle">
	                        <ul className="navbar-nav animated" data-animate="fadeInDown" data-delay=".9">
	                            <li className="nav-item"><a className="nav-link menu-link" href="#intro"><Trans>the_value</Trans><span className="sr-only">(current)</span></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#partners"><Trans>partners</Trans></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#thegame"><Trans>the_game</Trans></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#tokenSale"><Trans>token_sale</Trans></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#roadmap"><Trans>roadmap</Trans></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#team"><Trans>team</Trans></a></li>
	                            <li className="nav-item"><a className="nav-link menu-link" href="#contact"><Trans>contact</Trans></a></li>
	                            <li className="nav-item">
	                            	<a className="nav-link menu-link" href="#" onClick={() => changeLanguage(0)}>
	                            		<span className={this.state.selectedFlag ? "flag flag_ch" : "flag flag_en"}></span>
	                            		<span className={this.state.clickedFlag % 2 == 0 ? "flag_cart down" : "flag_cart up"}></span>
	                            	</a>
	                            	<ul className={this.state.isFlagMenu ? "second_flag active" : "second_flag"}>
		                            	<a className="nav-link menu-link" href="#" onClick={() => changeLanguage(1)}>
		                            		<span className={!this.state.selectedFlag ? "flag flag_ch" : "flag flag_en"}></span>
		                            	</a>
	                            	</ul>
	                            </li>
	                        </ul>
	                        <ul className="navbar-nav navbar-btns animated" data-animate="fadeInDown" data-delay="1.15">
	                            <li className="nav-item">
	                            	{register}
	                            	{/*{whitepaper}*/}
	                            </li>
	                        </ul>
	                    </div>
	                </nav>
	            </div>
	            <div id="header" className="banner banner-curb banner-particle d-flex align-items-center">
	                <div className="container">
	                    <div className="banner-content">
	                        <div className="row align-items-center mobile-center">
	                            <div className="col-lg-6 col-md-12 order-lg-first">
	                                <div className="header-txt">
	                                    <h1 className="animated" data-animate="fadeInUp" data-delay="1.55"><Trans>crypto_game_rewards</Trans></h1>
	                                    <p className="lead color-secondary animated" data-animate="fadeInUp" data-delay="1.65"><Trans>play_and_earn</Trans></p>
	                                    <ul className="btns animated" data-animate="fadeInUp" data-delay="1.75">
	                                        <li>
	                                        	<a 
	                                        		href={this.state.lang == "en" ? "https://www.docdroid.net/ScoUHjA/beeznixbrightpaperengv10.pdf" : "https://www.docdroid.net/Nvs2XOj/beeznix-brightpaper-chinese.pdf"}
	                                        		target="none" 
	                                        		className="btn btn-alt">
	                                        		<Trans>read_whitepaper</Trans>
	                                        	</a>
	                                        </li>
	                                    </ul>
	                                    <ul className="social">
	                                        <li className="animated" data-animate="fadeInUp" data-delay="0"><a href="https://www.fb.com/bitneys" target="none"><em className="fa fa-facebook"></em></a></li>
	                                        <li className="animated" data-animate="fadeInUp" data-delay=".1"><a href="https://www.twitter.com/bitneytoken" target="none"><em className="fa fa-twitter"></em></a></li>
	                                        <li className="animated" data-animate="fadeInUp" data-delay=".2"><a href="#"><em className="fa fa-youtube-play" target="none"></em></a></li>
	                                        <li className="animated" data-animate="fadeInUp" data-delay=".3"><a href="https://www.github.com/bitney" target="none"><em className="fa fa-github"></em></a></li>
	                                    </ul>
	                                </div>
	                            </div>
	                            <div className="col-lg-6 col-md-12 order-first">
	                                <div className="header-image animated" data-animate="fadeInRight" data-delay="1.25">
	                                    <img src="images/header-image-dark.png" alt="header" />
	                                    <img className="header-image-icon left-icon" src="images/header-icon-a.png" alt="header-icon" />
	                                    <img className="header-image-icon right-icon" src="images/header-icon-b.png" alt="header-icon" />
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            {this.state.isLoaded ? "" : <Preload />}
	            {this.state.alert ? <Alert content={this.state.content} /> : ""}
	        </header>
		);
	}
}

export default translate('translations')(Header);