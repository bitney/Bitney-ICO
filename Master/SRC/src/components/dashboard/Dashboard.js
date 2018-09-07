import React, { Component } from 'react';
import Wallet from './Wallet';
import Profile from './Profile';
import BuyToken from './BuyToken';
import Admin from './Admin';
import Transaction from './Transaction';
import Preload from '../functions/Preload';
import { Link, Route } from 'react-router-dom';
import { API_SERVER, contractAddress } from '../constants';
import axios from 'axios';
import { translate, Trans } from 'react-i18next';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected_menu: 1,
			isCollapsed: false,
			isMinimenup: false,
			abiArray: null,
			isLoaded: 0,
			clickedFlag: 0,
			selectedFlag: 0,
			isFlagMenu: false
		};

		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.handleCollapseChange = this.handleCollapseChange.bind(this);
		this.handleFlagClick = this.handleFlagClick.bind(this);
	}

	componentDidMount() {
		var lang = window.localStorage.getItem('i18nextLng');
		if (lang == 'ch') this.setState({selectedFlag: 1});
		else this.setState({selectedFlag: 0});

		if (this.props.email == "") {
			alert("Unauthorized");
			window.location.href = "/";
		}

        axios.get(API_SERVER + "/api/v1/get/abi")
        .then(response => {
            var abiArray = response.data;
            this.setState({
            	abiArray: abiArray,
            	isLoaded: 1
            });
        })
        .catch(err => console.log(err));
	}

	handleMenuClick(index) {
		if (index == 0) {
			this.setState({
				isMinimenup: !this.state.isMinimenup,
				isCollapsed: false
			});
		} else if (index == -1) {
			this.setState({isMinimenup: false});
		} else {
			this.setState({isMinimenup: false});
		}
		if (index > 0)
			this.setState({selected_menu: index});
	}

	handleCollapseChange() {
		this.setState({
			isCollapsed: !this.state.isCollapsed,
			isMinimenup: false
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
	    }

		return (
	        <div className="">
				<div className="sidenav">
					<Link className={this.state.selected_menu == 1 ? "sidenav_active enter" : "enter"}
						style={{borderTop: "1px solid #ffa73a"}}
						to="/dashboard/buy" 
						onClick={() => this.handleMenuClick(1)}>
						<i className="material-icons">shopping_cart</i><br />
                        <span> <Trans>buy</Trans> </span>
                    </Link>
					<Link className={this.state.selected_menu == 2 ? "sidenav_active" : ""}
						to="/dashboard/wallet" 
						onClick={() => this.handleMenuClick(2)}>
						<i className="material-icons">card_travel</i><br />
                        <span> <Trans>wallet</Trans> </span>
                    </Link>
					<Link className={this.state.selected_menu == 5 ? "sidenav_active" : ""}
						to="/dashboard/tnx" 
						onClick={() => this.handleMenuClick(5)}>
						<i className="material-icons">history</i><br />
                        <span> <Trans>tnxs</Trans> </span>
                    </Link>
					<Link className={this.state.selected_menu == 3 ? "sidenav_active" : ""}
						to="/dashboard/profile" 
						onClick={() => this.handleMenuClick(3)}>
						<i className="material-icons">account_box</i><br />
                        <span> <Trans>profile</Trans> </span>
                    </Link>
                    {this.props.IsAdmin ?
                    (
						<Link className={this.state.selected_menu == 4 ? "sidenav_active" : ""}
							to="/dashboard/admin" 
							onClick={() => this.handleMenuClick(4)}>
							<i className="material-icons">folder_shared</i><br />
	                        <span> <Trans>admin</Trans> </span>
	                    </Link> 	
                    ) : ""}
				</div>

				<div className="main">
					<div className="main_header">
						<div className="main_header_logo">
							<a href="/"><img className="logo logo-light" alt="logo" src="/images/logo-white.png" srcSet="/images/logo-white2x.png 2x" /></a>
						</div>
						<div className="main_header_side">
	                        <div className=" pull-right header_balance">
	                            <ul className="nav navbar-right top-nav">
	                                <li className="">
	                                    <a href="#" className="myAccount" 
	                                        onClick={() => this.handleCollapseChange()}>
	                                        <Trans>myaccount</Trans> <b className={this.state.isCollapsed ? "fa fa-angle-down" : "fa fa-angle-up"}></b>
	                                    </a>
	                                    <ul className={this.state.isCollapsed ? "myAccountMenu collapse_active" : "dropdown-menu"}>
	                                        <li>{this.props.email}</li>
	                                        <li><a href='/logout'><Trans>logout</Trans></a></li>
	                                    </ul>
	                                </li>
	                                <li className="dropdown" style={{"marginTop": "6px"}}>
		                            	<a className="dashboard_flag nav-link menu-link" href="#" onClick={() => changeLanguage(0)}>
		                            		<span className={this.state.selectedFlag ? "flag flag_ch" : "flag flag_en"}></span>
		                            		<span className={this.state.clickedFlag % 2 == 0 ? "flag_cart down" : "flag_cart up"}></span>
		                            	</a>
		                            	<ul className={this.state.isFlagMenu ? "second_flag active" : "second_flag"}>
			                            	<a className="nav-link menu-link" href="#" onClick={() => changeLanguage(1)}>
			                            		<span className={!this.state.selectedFlag ? "flag flag_ch" : "flag flag_en"}></span>
			                            	</a>
		                            	</ul>
	                                </li>
	                                <li className="dropdown minmenu">
	                                    <div className="menu_cover">
	                                    	<i className="material-icons" onClick={() => this.handleMenuClick(0)}>menu</i>
	                                    </div>
	                                    <div className={this.state.isMinimenup ? "minmenubar active" : "minmenubar"}>
											<Link className="enter" to="/dashboard/buy" onClick={() => this.handleMenuClick(1)}>
												<i className="material-icons">shopping_cart</i>
						                        <span> <Trans>buy</Trans> </span>
						                    </Link>
											<Link to="/dashboard/wallet" onClick={() => this.handleMenuClick(2)}>
												<i className="material-icons">card_travel</i>
						                        <span> <Trans>wallet</Trans> </span>
						                    </Link>
											<Link to="/dashboard/tnx" onClick={() => this.handleMenuClick(5)}>
												<i className="material-icons">history</i>
						                        <span> <Trans>tnxs</Trans> </span>
						                    </Link>
											<Link to="/dashboard/profile" onClick={() => this.handleMenuClick(3)}>
												<i className="material-icons">account_box</i>
						                        <span> <Trans>profile</Trans> </span>
						                    </Link>
						                    {this.props.IsAdmin ? 
					                    	(
												<Link to="/dashboard/admin" onClick={() => this.handleMenuClick(4)}>
													<i className="material-icons">folder_shared</i>
							                        <span> <Trans>admin</Trans> </span>
							                    </Link>
					                    	) : ""}
	                                        <a href="javascript:(0);" onClick={() => this.handleMenuClick(-1)}>Close</a>
	                                    </div>
	                                </li>
	                            </ul>
	                        </div>
						</div>
					</div>
					<Route path="/dashboard/wallet" render={() => (<Wallet abiArray={this.state.abiArray} />)} />
					<Route path="/dashboard/buy" render={() => (<BuyToken abiArray={this.state.abiArray} />)} />
					<Route path="/dashboard/profile" render={() => (<Profile />)} />
					<Route path="/dashboard/admin" render={() => (<Admin abiArray={this.state.abiArray} />)} />
					<Route path="/dashboard/tnx" render={() => (<Transaction />)} />
				</div>
				{!this.state.isLoaded ? <Preload /> : ""}
	        </div>
		);
	}
}

Dashboard.defaultProps = {
	email: ""
}

export default translate('translations')(Dashboard);