import React, { Component } from 'react';
import { default as Web3 } from 'web3';
import { default as Eth } from 'ethjs';
import { default as sigUtil } from 'eth-sig-util';
import { default as ethUtil } from 'ethereumjs-util';
import EthRate from './buytoken/EthRate';
import Alert from '../functions/Alert';
import swal from 'sweetalert';
import { API_SERVER, etherConvert, gasPriceDecimal, contractAddress, gasLimit, WebHttpProvider } 
    from '../constants';
import axios from 'axios';
import { translate, Trans } from 'react-i18next';

const Tx = require('ethereumjs-tx');
var provider = new Web3.providers.HttpProvider(WebHttpProvider);
var _web3 = new Web3(provider);

class BuyToken extends Component {
	constructor(props) {
		super(props);

		this.state = {
			placeholder1: "Sign to network first.",
            placeholder2: "Sign to network first.",
			address: "",
            addressColor: null,
            privColor: null,
            tempPrivateKey: "",
            privateKey: "",
            isPKeySaved: false,
            tokenToEth: 10000,
            amount: null,
            value: null,
            gasPrice: 10,
            alert: 0
		};

        this.handlePrivateKey = this.handlePrivateKey.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleTokenPrice = this.handleTokenPrice.bind(this);
        this.handleWaiting = this.handleWaiting.bind(this);
        this.handlePrivateAvailableClick = this.handlePrivateAvailableClick.bind(this);
	}

    componentDidMount() {
        axios.get(API_SERVER + "/api/v1/user/stats")
        .then(response => {
            var status = response.data;
            if (status.id == "disallowed" && status.document == "disallowed")
                window.location.href = "/";
        })
        .catch(err => console.log(err));
    }

    componentWillMount() {
        const text = '<Wallet Address Authentication> \n\ Press the sign button to authenticate the address...';
        this.setState({
            msg: ethUtil.bufferToHex(new Buffer(text, 'utf8'))
        });
    }

    getCurrentLang() {
        var lang = window.localStorage.getItem('i18nextLng');
        if (lang == 'ch') return 0;
        else if (lang == 'en') return 1;
        else return 1; 
    }

    handleWaiting(type) {
        this.setState({
            alert: 1,
            content: (
                <div style={{textAlign: "center"}}>
                    <p>
                        <Trans>tnx_confirm_msg</Trans><br />
                        <Trans>takes_time</Trans>
                    </p>
                    <button onClick={() => {
                        this.setState({alert: 0});
                        if (type == "metamask") this.metamaskBuy();
                        else if(type == "private") this.privateBuy();
                    }}>Confirm</button>&nbsp;&nbsp;
                    <button onClick={() => {this.setState({alert: 0})}}>Cancel</button>
                </div>
            )
        });
    }

    handleTokenPrice(tokens) {
        this.setState({tokenToEth: tokens});
    }

    getAddress = async () => {
        if (typeof _web3.eth.accounts.givenProvider.publicConfigStore._state.selectedAddress === 'undefined') {
            swal({
                title: "Please check metamask",
                text: "Please unlock metamask or create account or import account",
                icon: "warning",
                buttons: true,
            });
        } else {
            const address = await _web3.eth.accounts.givenProvider.publicConfigStore._state.selectedAddress
            this.setState({
                address: address,
                addressColor: {background: "#2cb7b4"},
                placeholder1: ""
            });
        }
    }

    hanldeSign = async () => {
        console.log('CLICKED, SENDING PERSONAL SIGN REQ');
        const msg = this.state.msg;
        let from = this.state.address;
        let params = [msg, from];
        const method = 'personal_sign';

        Web3.givenProvider.sendAsync({method, params, from, }, 
            (err, result) => {
                if (err) return console.error(err);
                if (result.error) return console.error(result.error);
                console.log('PERSONAL SIGNED:' + JSON.stringify(result.result));

                const msgParams = {
                    data: msg
                };
                msgParams.sig = result.result;
                const recovered = sigUtil.recoverPersonalSignature(msgParams);

                if (recovered === from.toLowerCase()) {
                    const resultMessage = 'SigUtil Successfully verified signer as';
                    const signer = from;
                    console.log(resultMessage + signer)
                    this.setState({
                        account: from
                    })
                    return signer
                } else {
                    console.dir(recovered)
                    console.log('SigUtil Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
                    console.log('Failed, comparing %s to %s', recovered, from)
                }
            }
        )
    }

    handleMetamaskClick = async () => {
        if (typeof web3 !== 'undefined') {
            await this.getAddress();
            console.log(this.state.address)
            console.log("provider is available");
            (this.state.address !== '' ? this.hanldeSign() : console.log("Not found account"))


        } else {
            console.log("provider is not available");

            swal({
                title: "You need to install metamask",
                text: "Move to install",
                icon: "warning",
                buttons: true,
            })
            .then((willmove) => {
                if (willmove) {
                    window.open(
                        'https://metamask.io/',
                        '_blank'
                    )
                } else {;
                }
            })
        }
    }

    handlePrivateClick() {
        if (this.state.tempPrivateKey == "") {
            if (this.getCurrentLang()) alert("Please input your private key!");
            else alert("请输入您的私钥！");
        } else {
            this.setState({
                privateKey: this.state.tempPrivateKey,
                privColor: {background: "#2cb7b4"},
                placeholder2: ""
            });
        }
    }

    make2RandStr() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text.toUpperCase();
    }

    getVerifyCode() {
        var randMath = Math.floor(Math.random() * 100);
        if (randMath < 10) randMath += 10;
        var code = this.make2RandStr() + randMath + this.make2RandStr()
        return code;
    }

    metamaskBuy() {
        let address = this.state.address;
        let amount = (this.state.amount / this.state.tokenToEth).toFixed(5);
        console.log("===", amount);
        let gasPrice = this.state.gesPrice;

        var web3js = null;
        if (typeof web3 !== 'undefined') web3js = new Web3(window.web3.currentProvider);
        var myContract = new web3js.eth.Contract(this.props.abiArray, contractAddress);

        var verifyCode = this.getVerifyCode();
        var verifyHexCode = web3js.utils.toHex(verifyCode);

        var componentHandler = this;

        myContract.methods.tokensale(address, verifyHexCode)
        .send({
            gas: gasLimit,
            from: address,
            gasPrice: gasPrice * gasPriceDecimal,
            value: amount * etherConvert
        })
        .then(function(success) {
            if (componentHandler.getCurrentLang()) alert("Transaction done successfully!\nYou will receive an email for Verification Code.");
            else alert("交易成功完成！\n您将收到验证码的电子邮件。");
            var playload = {
                verifyCode: verifyCode,
                tnx: success.transactionHash, 
                savedDate: new Date().toLocaleString(),
                amount: amount,
                tnxType: 0
            };
            handleTnx(playload);

        })
        .catch(function(e) {
            console.log('Error in Transaction!', e);
        });
    }

    privateBuy = async () => {
        var componentHandler = this;
        var my_privkey = this.state.privateKey;
        if (!my_privkey.includes('0x')) my_privkey = '0x' + my_privkey;
        var myAddress = _web3.eth.accounts.privateKeyToAccount(my_privkey).address;
        var count = await _web3.eth.getTransactionCount(myAddress);
        var amount = (this.state.amount / this.state.tokenToEth).toFixed(5);
        console.log("===", amount);
        var gasPrice = this.state.gasPrice;
        var abiArray = this.props.abiArray;
        var contract = new _web3.eth.Contract(abiArray, contractAddress, { from: myAddress });
        var verifyCode = this.getVerifyCode();
        var verifyHexCode = _web3.utils.toHex(verifyCode);
        var rawTransaction = {
            "from": myAddress,
            "nonce": count,
            "gasPrice": gasPrice * gasPriceDecimal,                  
            "gasLimit": gasLimit,
            "to": contractAddress,
            "value": amount * etherConvert,
            "data": contract.methods.tokensale(myAddress, verifyHexCode).encodeABI(),
            "chainId": 3
        };
        var privKey = new Buffer(this.state.privateKey, 'hex');
        var tx = new Tx(rawTransaction);
        tx.sign(privKey);
        var tx_hash = tx.hash();
        var tx_hash_str = "0x"+tx_hash.toString('hex');
        var serializedTx = tx.serialize();
        _web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .then(function(success) {
            if (success) {
                console.log(success);
                if (componentHandler.getCurrentLang()) alert("Transaction done successfully!");
                else alert("交易成功完成！\n您将收到验证码的电子邮件。");
                var playload = {
                    verifyCode: verifyCode,
                    tnx: success.transactionHash, 
                    savedDate: new Date().toLocaleString(),
                    amount: amount,
                    tnxType: 0
                };
                handleTnx(playload);
            } else {
                console.log(success);
                if (componentHandler.getCurrentLang()) alert("Something wrong in Transaction!");
                else alert("交易出错了！");
            }
        })
        .catch(function(err) {
            console.log(err);
            alert(err);
        });
        // on('receipt', (receipt)=>{
        //     console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
        //     if ("transactionHash" in receipt) alert("Transaction done successfully!");
        //     else alert("Something wrong in Transaction!");
        // });
        return tx_hash_str;
    }

    handleBuyToken = async (type) => {
        if (type == "metamask" && this.state.amount && this.state.value && this.state.address) {
            if (this.state.address != '') {
                this.handleWaiting("metamask");
            } else {
                if (this.getCurrentLang()) alert("Please sign to Ethereum network first!");
                else alert("请先登录以太坊网络！");
            }
        } else if (type == "private" && this.state.privateKey && this.state.amount && this.state.value) {
            this.handleWaiting("private");
        } else {
            if (this.getCurrentLang()) alert("Not valid values!");
            else alert("无效的价值！");
        }
    }

    handlePrivateKey(privateKey) {
        this.setState({
            tempPrivateKey: privateKey
        });
    }

    handleValueChange(value, type) {
        if (type == 1) {
            this.setState({
                amount: value,
                value: (value / this.state.tokenToEth).toFixed(5)
            });
        } else if (type == 2) {
            this.setState({
                value: value,
                amount: parseInt(value * this.state.tokenToEth)
            });
        } else if (type == 3) {
            this.setState({gasPrice: value});
        }
    }

    handlePrivateAvailableClick() {
        this.setState({
            privColor: {background: "#2cb7b4"}
        });
    }

	render() {
		return (
            <div>
                <div className="tab_container flex">
                    <EthRate handleTokenPrice={this.handleTokenPrice} abiArray={this.props.abiArray} />
                </div>
    			<div className="tab_container flex">
                    <div className="tab_row_cover">
        				<div className="tab_row">
        					<div className="tab_header">
        						<span className="sign_info"><Trans>sign_to_ethereum_meta</Trans></span>
        						<button className="btn_yellow btn_small" onClick={() => this.handleMetamaskClick()} style={this.state.addressColor}>Metamask</button><br />
                                <p style={{"color": "gray", "marginTop": "18px"}}>
                                    <Trans>you_can_connect</Trans> <a href="https://metamask.io/" target="_blank">Metamask</a>
                                </p>
        					</div>
        					<div className="tab_body">
        						<p><Trans>token_amount</Trans></p>
        						<input type="number" 
                                    className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder1}
                                    value={this.state.amount}
                                    onChange={(e) => this.handleValueChange(e.target.value, 1)} />
        						<p><Trans>ethereum_price</Trans></p>
        						<input type="number"
                                    className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder1}
                                    value={this.state.value}
                                    onChange={(e) => this.handleValueChange(e.target.value, 2)} />
        						<p><Trans>gas_fee</Trans></p>
        						<input type="number"
                                    className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder1}
                                    value={this.state.gasPrice}
                                    onChange={(e) => this.handleValueChange(e.target.value, 3)} /><br />
        						<button onClick={() => this.handleBuyToken("metamask")}
                                    style={{"marginTop": "40px"}}><Trans>buy_tokens</Trans></button>
        					</div>
        				</div>
                    </div>
                    <div className="tab_row_cover">
        				<div className="tab_row">
        					<div className="tab_header">
        						<span className="sign_info"><Trans>sign_to_ethereum_priv</Trans></span>
                                {
                                    this.state.privColor ? 
                                    (<button className="btn_yellow btn_small" onClick={() => this.handlePrivateClick()} style={this.state.privColor}>Set Key</button>) :
                                    (<button className="btn_yellow btn_small" onClick={() => this.handlePrivateAvailableClick()}>Private Key</button>)
                                } {
                                    this.state.privColor ? 
                                    (<div style={{display: "flex", height: "36px", marginTop: "10px", marginBottom: "5px"}}>
                                        <input type="text" class="amount_in" 
                                            placeholder="Input your private key here..." 
                                            style={{height: "36px"}}
                                            onChange={(e) => this.handlePrivateKey(e.target.value)}
                                        />&nbsp;&nbsp;
                                        <button class="btn_yellow btn_small" 
                                            style={{height: "36px", marginTop: "0px", background: "rgb(44, 183, 180)"}}
                                            onClick={() => {this.setState({
                                                                privateKey: "",
                                                                privColor: null, 
                                                                tokenBalance: 0, 
                                                                ethereumBalance: 0, 
                                                                placeholder2: "Sign to network first."})}}
                                        >
                                            Unlock
                                        </button>
                                    </div>) :
                                    (<div style={{width: "10px", height: "36px", marginTop: "10px", marginBottom: "5px"}}></div>)
                                }    
        					</div>
        					<div className="tab_body">
        						<p><Trans>token_amount</Trans></p>
        						<input type="number"
                                    className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder2}
                                    value={this.state.amount}
                                    onChange={(e) => this.handleValueChange(e.target.value, 1)} />
        						<p><Trans>ethereum_price</Trans></p>
        						<input type="number"
                                    className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder2}
                                    value={this.state.value}
                                    onChange={(e) => this.handleValueChange(e.target.value, 2)} />
        						<p><Trans>gas_fee</Trans></p>
        						<input type="number"
                                    className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
        							placeholder={this.state.placeholder2}
                                    value={this.state.gasPrice}
                                    onChange={(e) => this.handleValueChange(e.target.value, 3)} /><br />
        						<button onClick={() => this.handleBuyToken("private")}
                                    style={{"marginTop": "40px"}}><Trans>buy_tokens</Trans></button>
        					</div>
        				</div>
                    </div>
    			</div>
                {this.state.alert ? <Alert content={this.state.content} /> : ""}
            </div>
		);
	}
}

function handleTnx(playload) {
    axios.post(API_SERVER + "/api/v1/save/verifyCode", playload)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });

    axios.post(API_SERVER + "/api/v1/save/tnx", playload)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}

export default translate('translations')(BuyToken);