import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import Preload from '../../functions/Preload';
import axios from 'axios';
import { etherConvert, gasPriceDecimal, WebHttpProvider, privateSaleStartTime, preSale1StartTime,
        preSale2StartTime, publicSaleStartTime, saleEndTime, API_SERVER, contractAddress } from '../../constants';
import { default as Web3 } from 'web3';
import { translate, Trans } from 'react-i18next';

var provider = new Web3.providers.HttpProvider(WebHttpProvider);
var _web3 = new Web3(provider);

class EthRate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            volume_24h: 0,
            price_usd: 0,
            token2Eth: 0,
            token2USD: "$0",
            isLoaded: 0
        };
    }

    componentDidMount() {
        var epochNow = (new Date).getTime();
        epochNow = parseInt(epochNow / 1000);
        if ((privateSaleStartTime < epochNow) && (epochNow < preSale1StartTime)) {
            this.setState({token2USD: "$0 / 1 BTNY"});
        } else if ((preSale1StartTime < epochNow) && (epochNow < preSale2StartTime)) {
            this.setState({token2USD: "$0.064 / 1 BTNY"});
        } else if ((preSale2StartTime < epochNow) && (epochNow < publicSaleStartTime)) {
            this.setState({token2USD: "$0.072 / 1 BTNY"});
        } else if (publicSaleStartTime < epochNow) {
            this.setState({token2USD: "$0.08 / 1 BTNY"});
        } else {
            this.setState({token2USD: "ICO ended"});
        }

        axios.get("https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD")
        .then(response => {
            var result = response.data[0];
            this.setState({
                volume_24h: result.percent_change_24h,
                price_usd: result.price_usd
            });
            var price_usd = result.price_usd;
            this.props.handleTokenPrice(parseInt(price_usd));
        })
        .catch(err => console.log(err));

        axios.get(API_SERVER + "/api/v1/get/abi")
        .then(response => {
            this.setState({isLoaded: 1});
            var abiArray = response.data;
            var contract = new _web3.eth.Contract(abiArray, contractAddress);
            var componentHandler = this;
            contract.methods.getPrice().call().then(function(e) {
                componentHandler.props.handleTokenPrice(e);
                componentHandler.setState({token2Eth: e});
            })
            .catch(err => console.log("===", err));
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="tab_container full_width">
                <div className="tab_row">
                    <div className="tab_header">
                        <span className="sign_info"><Trans>ethereum_price_and</Trans></span>
                    </div>
                    <div className="tab_body tab_body_flex" style={{overflow: "hidden"}}>
                        <div style={{flex: 1, display: "flex"}} id="tradingView">
                            <TradingViewWidget symbol="BITFINEX:ETHUSD"/>
                        </div>
                        <div style={{flex: 1, display: "flex"}}>
                            <div style={{marginLeft: "25px"}}>
                                <p><Trans>volume_24h</Trans> : <b>{this.state.volume_24h}%</b></p><br />
                                <p><Trans>ethusd_price</Trans> : <b>${this.state.price_usd}</b></p><br />
                                <p><Trans>token_price_in_usd</Trans> : <b>{this.state.token2USD}</b></p><br />
                                <p><Trans>token_price_in_eth</Trans> : <b>{this.state.token2Eth} / 1 ether</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                {!this.state.isLoaded ? <Preload /> : ""}
            </div>
        );
    }
}

export default translate('translations')(EthRate);