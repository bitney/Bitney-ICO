import React, { Component } from 'react';
import Preload from '../functions/Preload';
import { API_SERVER, EtherscanEndPoint } from '../constants';
import axios from 'axios';
import { translate, Trans } from 'react-i18next';

class Transaction extends Component {
	constructor(props) {
		super(props);

		this.state = {
            isLoaded: 0,
            transactions: []
		};
	}

	componentDidMount() {
        axios.get(API_SERVER + "/api/v1/user/tnx")
        .then(response => {
        	var data = response.data.tnxs;
        	this.setState({transactions: data, isLoaded: 1});
        	console.log(data);
        })
        .catch(err => console.log(err));
	}

	render() {
        const mapToTransactions = (type) => {
        	if (this.state.transactions.length > 0) {
        		var checkNone = 0;
	            return this.state.transactions.map((transaction, i) => {
	            	if (transaction.tnxType == type) {
		                return (
		                    <div>
		                        <a 	target="_blank"
		                            href={EtherscanEndPoint + transaction.tnx}
		                            className="imageName">{transaction.tnx + " (" + transaction.savedDate + ")"}
		                        </a>
		                    </div>
		                );
	            	} else {
	            		checkNone++;
	            	}
	            	if (checkNone == this.state.transactions.length) {
	            		return (
		            		<h6 style={{fontSize: "20px", margin: "0px", "color": "#a09e9e"}}>
		            			<Trans>you_have_no</Trans>
		            		</h6>
		            	);
	            	}
	            });
        	} else {
        		return (
        			<h6 style={{fontSize: "20px", margin: "0px", "color": "#a09e9e"}}>
        				<Trans>you_have_no</Trans>
        			</h6>
        		);
        	}
        }
        
		return (
            <div className="tab_container">
                <div className="tab_container full_width">
                    <div className="tab_row">
                        <div className="tab_header">
                            <span className="sign_info"><Trans>transaction_history</Trans></span>
                        </div>
                        <div className="tab_body">
                        	<h6 style={{fontSize: "22px", margin: "0px"}}><Trans>btny_buy_history</Trans></h6>
                            {mapToTransactions(0)}<br />
                        	<h6 style={{fontSize: "22px", margin: "0px"}}><Trans>btny_transfer_history</Trans></h6>
                            {mapToTransactions(1)}<br />
                        	<h6 style={{fontSize: "22px", margin: "0px"}}><Trans>ethereum_history</Trans></h6>
                            {mapToTransactions(2)}                        
                        </div>
                    </div>
                </div>
                {!this.state.isLoaded ? (<Preload />) : ""}
            </div>
		);
	}
}

export default translate('translations')(Transaction);