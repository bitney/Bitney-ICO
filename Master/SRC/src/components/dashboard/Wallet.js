import React, { Component } from 'react';
import Preload from '../functions/Preload';
import Alert from '../functions/Alert';
import ReactTooltip from 'react-tooltip';
import copy from 'copy-to-clipboard';
import { default as Web3 } from 'web3';
import { default as Eth } from 'ethjs';
import { default as sigUtil } from 'eth-sig-util';
import { default as ethUtil } from 'ethereumjs-util';
import swal from 'sweetalert';
import { etherConvert, gasPriceDecimal, contractAddress, API_SERVER, gasLimit, EtherscanAPIToken, EtherscanAPIPoint,
    WebHttpProvider } from '../constants';
import path from 'path';
import axios from 'axios';
import { translate, Trans } from 'react-i18next';

var fs = require('fs');
const Tx = require('ethereumjs-tx');
var provider = new Web3.providers.HttpProvider(WebHttpProvider);
var _web3 = new Web3(provider);

class Wallet extends Component {
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
            amount: null,
            value: null,
            withdrawAddress: null,
            gasPrice: 41,
            abiArray: [],
            tokenBalance: 0,
            ethereumBalance: 0,
            ethAddr: "",
            ethAddrTip: "",
            content: null,
            isLoaded: 0,
            alert: 0,
            regMethod: ""
		};

        this.handlePrivateKey = this.handlePrivateKey.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleWaiting = this.handleWaiting.bind(this);
        this.handleEtherWaiting = this.handleEtherWaiting.bind(this);
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

        axios.get(API_SERVER + "/api/v1/get/abi")
        .then(response => {
            var result = response.data;
            this.setState({
                abiArray: result,
            });

            axios.get(API_SERVER + "/api/v1/get/ethaddr")
            .then(res => {
                var ethAddr = res.data;
                if (!ethAddr) {
                    var newAccount = _web3.eth.accounts.create();
                    console.log(newAccount);
                    var playload = {
                        address: newAccount.address
                    };
                    axios.post(API_SERVER + "/api/v1/save/ethaddr", playload)
                    .then(ress => {
                        this.setState({
                            ethAddr: newAccount.address,
                            ethAddrTip: "Your wallet Address : " + newAccount.address + " click here to COPY!",
                            alert: 1,
                            isLoaded: 1,
                            content: (
                                <div>
                                    <p>
                                        This is your Private Key. Please copy and save it to your storage.<br />
                                        This will never appear again.
                                    </p>
                                    <p><b>{newAccount.privateKey}</b></p>
                                    <button onClick={() => {this.setState({alert: 0})}}>I copied it</button>
                                </div>
                            )
                        });
                    })
                    .catch(err => console.log(err));
                } else {
                    axios.get("https://api.etherscan.io/api?module=account&action=balance&address=" + ethAddr + "&tag=latest")
                    .then(ress => {
                        this.setState({ethereumBalance: (ress.data.result / etherConvert).toFixed(5)});
                    })
                    .catch(err => console.log(err));

                    this.setState({
                        ethAddr: ethAddr,
                        ethAddrTip: "Your wallet Address : " + ethAddr + " click here to COPY!",
                        isLoaded: 1
                    });
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    getCurrentLang() {
        var lang = window.localStorage.getItem('i18nextLng');
        if (lang == 'ch') return 0;
        else if (lang == 'en') return 1;
        else return 1; 
    }

    handleBalance(address) {
        var abiArray = this.state.abiArray;
        var contract = new _web3.eth.Contract(abiArray, contractAddress, { from: address });
        var componentHandler = this;
        contract.methods.balanceOf(address).call().then(function(e) {
            componentHandler.setState({tokenBalance: parseInt(e / etherConvert)});
        });
        contract.methods.getVerifyCode().call({from: address}).then(function(e) {
            console.log("===", e);
        });

        axios.get(EtherscanAPIPoint + "module=account&action=balance&address=" + address + "&tag=latest&apikey=" + EtherscanAPIToken)
        .then(response => {
            var balance = response.data.result / etherConvert;
            this.setState({ethereumBalance: balance.toFixed(5)});
        })
        .catch(err => console.log(err));
    }

    getAddress = async () => {
        if (typeof _web3.eth.accounts.givenProvider.publicConfigStore._state.selectedAddress === 'undefined') {

            swal({
                title: "Please check metamask",
                text: "Please unlock metamask or create account or import account",
                icon: "warning",
                buttons: true,
            })
        } else {
            const address = await _web3.eth.accounts.givenProvider.publicConfigStore._state.selectedAddress
            this.setState({
                address: address,
                addressColor: {background: "#2cb7b4"},
                privColor: null,
                addressFromPriv: null,
                placeholder1: "",
                placeholder2: "",
                regMethod: "metamask"
            });
            this.handleBalance(address);
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

    handlePrivateAvailableClick() {
        this.setState({
            privColor: {background: "#2cb7b4"},
            addressColor: null
        });
    }

    handlePrivateClick() {
        if (this.state.tempPrivateKey == "") {
            if (this.getCurrentLang()) alert("Please input your private key!");
            else alert("请输入您的私钥！");
        } else {
            var my_privkey = this.state.tempPrivateKey;
            if (!my_privkey.includes('0x')) my_privkey = '0x' + my_privkey;
            var address = _web3.eth.accounts.privateKeyToAccount(my_privkey).address;
            this.setState({
            	privateKey: this.state.tempPrivateKey,
                regMethod: "private",
                placeholder1: "",
            	placeholder2: "",
                addressFromPriv: address,
                address: null
            });
            this.handleBalance(address);
        }
    }

    handleTransferEther = async () => {
        if (this.state.regMethod == "metamask" && this.state.address && this.state.value && this.state.gasPrice && this.state.withdrawAddress) {
            if (this.state.address != '') {
                this.handleEtherWaiting("metamask");
            } else {
                if (this.getCurrentLang()) alert("Please sign to Ethereum network first!");
                else alert("请先登录以太坊网络！");
            }
        } else if (this.state.regMethod == "private" && this.state.value && this.state.gasPrice && this.state.withdrawAddress) {
            if (this.state.privateKey != '') this.handleEtherWaiting("private");
            else {
                if (this.getCurrentLang()) alert("Please sign to Ethereum network first!");
                else alert("请先登录以太坊网络！");
            }
        }
    }

    handleEtherWaiting(type) {
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
                        if (type == "metamask") this.metamaskEtherTransfer();
                        else if(type == "private") this.privateEtherTransfer();
                    }}>Confirm</button>&nbsp;&nbsp;
                    <button onClick={() => {this.setState({alert: 0})}}>Cancel</button>
                </div>
            )
        });
    }

    metamaskEtherTransfer() {
        let address = this.state.address;
        let withdrawAddress = this.state.withdrawAddress;
        let gasPrice = this.state.gasPrice;
        let value = this.state.value;

        var web3js = null;
        if (typeof web3 !== 'undefined') web3js = new Web3(window.web3.currentProvider);
        var componentHandler = this;

        web3js.eth.sendTransaction({
            from: address,
            to: withdrawAddress,
            value: value * etherConvert,
            gas: 21000,
            gasPrice: gasPrice * gasPriceDecimal
        })
        .then(function(success) {
            if (success){
                componentHandler.handleBalance(address);
                if (componentHandler.getCurrentLang()) alert("Ethereum transferred successfully!");
                else alert("以太坊成功转移！");
                var playload = {
                    tnx: success.transactionHash, 
                    savedDate: new Date().toLocaleString(),
                    tnxType: 2
                };
                handleTnx(playload);
            }
            else {
                if (componentHandler.getCurrentLang()) alert("Something wrong in Ethereum transfer!");
                else alert("以太坊转移出了点问题！");
            }
        })
        .catch(function(e) {
            console.log('Error in Transaction!', e);
            alert(e);
        })
    }

    privateEtherTransfer = async () => {
        var componentHandler = this;
        var destAddress = this.state.withdrawAddress;
        var value = this.state.value;
        var my_privkey = this.state.privateKey;
        if (!my_privkey.includes('0x')) my_privkey = '0x' + my_privkey;
        var myAddress = _web3.eth.accounts.privateKeyToAccount(my_privkey).address;
        var count = await _web3.eth.getTransactionCount(myAddress);
        var rawTransaction = {
            "from": myAddress,
            "nonce": count,
            "gasPrice": this.state.gasPrice * gasPriceDecimal,                  
            "gasLimit": gasLimit,
            "to": destAddress,
            "value": value * etherConvert,
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
                if (componentHandler.getCurrentLang()) alert("Ethereum transferred successfully!");
                else alert("以太坊成功转移！");
                var playload = {
                    tnx: success.transactionHash, 
                    savedDate: new Date().toLocaleString(),
                    tnxType: 2
                };
                handleTnx(playload);
            } else {
                console.log(success);
                if (componentHandler.getCurrentLang()) alert("Something wrong in Ethereum transfer!");
                else alert("以太坊转移出了点问题！");
            }
        })
        .catch(function(err) {
            console.log(err);
            alert(err);
        });
        return tx_hash_str;
    }

    handleTransferToken = async (type) => {
        await this.transferToken(type);
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
                        if (type == "metamask") this.metamaskTransfer();
                        else if(type == "private") this.privateTransfer();
                    }}><Trans>confirm</Trans></button>&nbsp;&nbsp;
                    <button onClick={() => {this.setState({alert: 0})}}><Trans>cancel</Trans></button>
                </div>
            )
        });
    }

    metamaskTransfer() {
        let address = this.state.address;
        let withdrawAddress = this.state.withdrawAddress;
        let gasPrice = this.state.gasPrice;
        let tokenAmount = this.state.amount;

        var web3js = null;
        if (typeof web3 !== 'undefined') web3js = new Web3(window.web3.currentProvider);
        var myContract = new web3js.eth.Contract(this.props.abiArray, contractAddress);
        var componentHandler = this;

        console.log(tokenAmount, gasPrice, withdrawAddress);

        myContract.methods.transfer(withdrawAddress, tokenAmount)
        .send({
            gas: gasLimit,
            from: address,
            gasPrice: gasPrice * gasPriceDecimal
        })
        .then(function(success) {
            if (success){
                componentHandler.handleBalance(address);
                if (componentHandler.getCurrentLang()) alert("BTNY transferred successfully!");
                else alert("BTNY成功转移！");
                var playload = {
                    tnx: success.transactionHash, 
                    savedDate: new Date().toLocaleString(),
                    tnxType: 1
                };
                handleTnx(playload);
            }
            else {
                if (componentHandler.getCurrentLang()) alert("Something wrong in BTNY transfer!");
                else alert("BTNY转移失败！");
            }
        })
        .catch(function(e) {
            console.log('Error in Transaction!', e);
            alert(e);
        });
    }

    privateTransfer = async () => {
        var componentHandler = this;
        var destAddress = this.state.withdrawAddress;
        var transferAmount = this.state.amount;
        var my_privkey = this.state.privateKey;
        if (!my_privkey.includes('0x')) my_privkey = '0x' + my_privkey;
        var myAddress = _web3.eth.accounts.privateKeyToAccount(my_privkey).address;
        var count = await _web3.eth.getTransactionCount(myAddress);
        var abiArray = this.state.abiArray;
        var contract = new _web3.eth.Contract(abiArray, contractAddress, { from: myAddress });
        var rawTransaction = {
            "from": myAddress,
            "nonce": count,
            "gasPrice": this.state.gasPrice * gasPriceDecimal,                  
            "gasLimit": gasLimit,
            "to": contractAddress,
            "value": "0x0",
            "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
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
                if (componentHandler.getCurrentLang()) alert("BTNY transferred successfully!");
                else alert("BTNY成功转移！");
                var playload = {
                    tnx: success.transactionHash, 
                    savedDate: new Date().toLocaleString(),
                    tnxType: 1
                };
                handleTnx(playload);
            } else {
                console.log(success);
                if (componentHandler.getCurrentLang()) alert("Something wrong in BTNY transfer!");
                else alert("BTNY转移失败！");
            }
        })
        .catch(function(err) {
            console.log(err);
            alert(err);
        });
        return tx_hash_str;
    }

    transferToken = async (type) => {
        if (type == "token") {
            if (this.state.regMethod == "metamask" && this.state.address && this.state.amount && this.state.gasPrice && this.state.withdrawAddress) {
                if (this.state.address != '') {
                    this.handleWaiting("metamask");
                } else {
                    if (this.getCurrentLang()) alert("Please sign to Ethereum network first!");
                    else alert("请先登录以太坊网络！");
                }
            } else if (this.state.regMethod == "private" && this.state.amount && this.state.gasPrice && this.state.withdrawAddress) {
                if (this.state.privateKey != '') this.handleWaiting("private");
                else {
                    if (this.getCurrentLang()) alert("Please sign to Ethereum network first!");
                    else alert("请先登录以太坊网络！");
                }
            }
        }
    }

    handlePrivateKey(privateKey) {
        this.setState({
            tempPrivateKey: privateKey,
        });
    }

    handleValueChange(value, type) {
        if (type == 1) {
            this.setState({amount: value});
        } else if (type == 2) {
            this.setState({withdrawAddress: value});
        } else if (type == 3) {
            this.setState({gasPrice: value});
        } else if (type == 4) {
        	this.setState({value: value});
        }
    }

	render() {
		return (
			<div>
				<div className="tab_container">
					<div className="tab_row_cover full_width">
						<div className="tab_row">
							<div className="tab_header">
								<span className="sign_info"><Trans>sign_to_ethereum_meta</Trans> </span>
								<button className="btn_yellow btn_small" onClick={() => this.handleMetamaskClick()} style={this.state.addressColor}>Metamask</button>
								<span className="sign_info"> <Trans>or</Trans> </span>
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
                                                                placeholder1: "Sign to network first.",
                                                                placeholder2: "Sign to network first.",
                                                                addressFromPriv: null})}}
                                        >
                                            Unlock
                                        </button>
                                    </div>) : ("")
                                }
							</div>
                            <div className="tab_body">
                                {this.state.address ? (<p><Trans>my_wallet_address</Trans> : <b>{this.state.address}</b></p>) : ""}
                                {this.state.addressFromPriv ? (<p><Trans>my_wallet_address</Trans> : <b>{this.state.addressFromPriv.toLowerCase()}</b></p>) : ""}
                            </div>
						</div>
					</div>
				</div>
				<div className="tab_container">
	                <div className="tab_row_cover">
	    				<div className="tab_row">
	    					<div className="tab_header">
	    						<span className="sign_info"><Trans>btny_balance</Trans></span>
	    						<img src="/images/favicon.png" style={{"width": "55px", "float": "right"}} />
	    					</div>
	    					<div className="tab_body">
	    						<span className="balance_info">{this.state.tokenBalance} BTNY</span>
	    					</div>
	    				</div>
	    				<div className="tab_row">
	    					<div className="tab_header">
	    						<span className="sign_info"><Trans>withdraw_btny</Trans></span>
	    					</div>
	    					<div className="tab_body">
	    						<p>Wallet Address</p>
	    						<input type="text"
	                                className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder1}
	    							value={this.state.withdrawAddress}
	                                onChange={(e) => this.handleValueChange(e.target.value, 2)} />	    					
	    						<p>BTNY Amount</p>
	    						<input type="number" 
	                                className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder1}
	    							value={this.state.amount}
	                                onChange={(e) => this.handleValueChange(e.target.value, 1)} />
	    						<p>Gas Fee</p>
	    						<input type="number"
	                                className={this.state.placeholder1 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder1}
	    							value={this.state.gasPrice}
	                                onChange={(e) => this.handleValueChange(e.target.value, 3)} /><br />
	    						<button onClick={() => this.handleTransferToken("token")}
	                                style={{"marginTop": "40px"}}><Trans>withdraw</Trans></button>
	    					</div>
	    				</div>
	                </div>
	                <div className="tab_row_cover">
	    				<div className="tab_row">
	    					<div className="tab_header">
	    						<span className="sign_info"><Trans>ethereum_balance</Trans></span>
	    						<img 
                                    src="/images/eth.png"
                                    style={{"width": "55px", "float": "right"}}
                                    data-tip={this.state.ethAddrTip}
                                    onClick={() => {copy(this.state.ethAddr)}}
                                />
	    					</div>
	    					<div className="tab_body">
	    						<span className="balance_info">{this.state.ethereumBalance} ETH</span>
	    					</div>
	    				</div>
	    				<div className="tab_row">
	    					<div className="tab_header">
	    						<span className="sign_info"><Trans>withdraw_ethereum</Trans></span>
	    					</div>
	    					<div className="tab_body">
	    						<p><Trans>wallet_address</Trans></p>
	    						<input type="text"
	                                className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder2}
	    							value={this.state.withdrawAddress}
	                                onChange={(e) => this.handleValueChange(e.target.value, 2)} />	    					
	    						<p><Trans>ethereum_amount</Trans></p>
	    						<input type="number"
	                                className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder2}
	    							value={this.state.value}
	                                onChange={(e) => this.handleValueChange(e.target.value, 4)} />
	    						<p><Trans>gas_fee</Trans></p>
	    						<input type="number"
	                                className={this.state.placeholder2 ? "amount_in elm_disable" : "amount_in"}
	    							placeholder={this.state.placeholder2}
	    							value={this.state.gasPrice}
	                                onChange={(e) => this.handleValueChange(e.target.value, 3)} /><br />
	    						<button onClick={() => this.handleTransferEther("ethereum")}
	                                style={{"marginTop": "40px"}}><Trans>withdraw</Trans></button>		
	    					</div>
	    				</div>
	                </div>
				</div>
                {/*<ReactTooltip />*/}
                {!this.state.isLoaded ? <Preload /> : ""}
                {this.state.alert ? <Alert content={this.state.content} /> : ""}
			</div>
		);
	}
}

function handleTnx(playload) {
    axios.post(API_SERVER + "/api/v1/save/tnx", playload)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}

export default translate('translations')(Wallet);