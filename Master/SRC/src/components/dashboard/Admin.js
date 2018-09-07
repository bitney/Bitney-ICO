import React, { Component } from 'react';
import Preload from '../functions/Preload';
import Alert from '../functions/Alert';
import axios from 'axios';
import { API_SERVER, contractAddress, WebHttpProvider, gasPriceDecimal, etherConvert, isoCountries, adminShowViews } 
    from '../constants';
import { default as Web3 } from 'web3';
import { translate, Trans } from 'react-i18next';

var provider = new Web3.providers.HttpProvider(WebHttpProvider);
var _web3 = new Web3(provider);

const Tx = require('ethereumjs-tx');

class Admin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
            selectedUser: -1,
            totalEtherReceived: 0,
            totalNumberTokenSold: 0,
            privateSaleTotalNumberTokenSold: 0,
            preSale1TotalNumberTokenSold: 0,
            preSale2TotalNumberTokenSold: 0,
            publicSaleTotalNumberTokenSold: 0,
            isLoaded: 0,
            smartContractAddr: "",
            privateKey: "",
            showViews: 1,
            content: "",
            isAlert: 0
		};

        this.handleEachUser = this.handleEachUser.bind(this);
        this.handleSmartContractChange = this.handleSmartContractChange.bind(this);
        this.handlePrivateKeyChange = this.handlePrivateKeyChange.bind(this);
        this.handleArrowClick = this.handleArrowClick.bind(this);
	}

	componentDidMount() {
        axios.get(API_SERVER + "/api/v1/user/all")
        .then(response => {
            var users = response.data;
            this.setState({users: users, isLoaded: 1});
            
            var contract = new _web3.eth.Contract(this.props.abiArray, contractAddress);
            var componentHandler = this;

            contract.methods.privateSaleSupply().call().then(function(e) {
                componentHandler.setState({
                    privateSaleTotalNumberTokenSold: (2000000 - e / etherConvert).toFixed(0)
                });
            });

            contract.methods.preSale1Supply().call().then(function(e) {
                componentHandler.setState({
                    preSale1TotalNumberTokenSold: (1000000 - e / etherConvert).toFixed(0)
                });
            });

            contract.methods.preSale2Supply().call().then(function(e) {
                componentHandler.setState({
                    preSale2TotalNumberTokenSold: (1000000 - e / etherConvert).toFixed(0)
                });
            });

            contract.methods.publicSaleSupply().call().then(function(e) {
                componentHandler.setState({
                    publicSaleTotalNumberTokenSold: (1000000 - e / etherConvert).toFixed(0)
                });
            });
        })
        .catch(err => console.log(err));
	}

    getCurrentLang() {
        var lang = window.localStorage.getItem('i18nextLng');
        if (lang == 'ch') return 0;
        else if (lang == 'en') return 1;
        else return 1; 
    }

    downloadImg(imgs, userId) {
        return imgs.map((img, i) => {
            return (
                <label>
                    <a href={API_SERVER + "/api/v1/admin/download/" + userId + "/" + img} className="imageName">{img}</a>
                </label>
            );
        });
    }

    handleEachUser(index, type) {
        if (type == "id") {
            var user = this.state.users[index];
            this.setState({
                content: (
                    <div className="verifyAlert">
                        <div className="verifyAlertHeader">
                            <div className="symbol1">&lt;</div>
                            <div className="symbol2">Document Verification</div>
                            <div className="symbol4" onClick={() => this.setState({isAlert: 0})}>X</div>
                            <div className="symbol3">{user.email}</div>
                        </div>
                        <div className="verifyAlertBody">
                            <div className="symbol1">
                                <label><Trans>full_name</Trans></label><br />
                                <label><Trans>date_submit</Trans></label><br />
                                <label><Trans>date_birth</Trans></label><br />
                                <label><Trans>country</Trans></label><br />
                                <label><Trans>phone_number</Trans></label><br />
                                <label><Trans>card_number</Trans></label><br />
                                <label><Trans>issued_date</Trans></label><br />
                                <label><Trans>image_upload</Trans></label>
                            </div>
                            <div className="symbol2">
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label>
                            </div>
                            <div className="symbol3">
                                <label>{user.name}</label><br />
                                <label>{user.submitId}</label><br />
                                <label>{user.birthDay.split("T")[0]}</label><br />                                
                                <label>{isoCountries[user.countryCode]}</label><br />
                                <label>{user.phone}</label><br />
                                <label>{user.cardNum}</label><br />
                                <label>{user.issuedDate.split("T")[0]}</label><br />
                                {this.downloadImg(user.imgs, user.id)}
                            </div>
                        </div>
                        <div className="verifyAlertBody">
                            <div className="symbol1">
                                <label><Trans>verify</Trans></label>
                            </div>
                            <div className="symbol2">
                                <label>:</label>
                            </div>
                            <div className="symbol3">
                                <button
                                    class="verifyBtn"
                                    style={{background: "#458c28"}}
                                    onClick={() => this.handleVerify(user.id, "id", "verified")}
                                ><Trans>approve</Trans></button>&nbsp;&nbsp;
                                <button
                                    class="verifyBtn"
                                    style={{background: "#f73e3e"}}
                                    onClick={() => this.handleVerify(user.id, "id", "rejected")}
                                ><Trans>reject</Trans></button>
                            </div>
                        </div>
                    </div>
                ),
                isAlert: 1
            });
        } else {
            var user = this.state.users[index];
            this.setState({
                content: (
                    <div className="verifyAlert">
                        <div className="verifyAlertHeader">
                            <div className="symbol1">&lt;</div>
                            <div className="symbol2">address_verification</div>
                            <div className="symbol4" onClick={() => this.setState({isAlert: 0})}>X</div>
                            <div className="symbol3">{user.email}</div>
                        </div>
                        <div className="verifyAlertBody">
                            <div className="symbol1">
                                <label><Trans>full_address</Trans></label><br />
                                <label><Trans>document_type</Trans></label><br />
                                <label><Trans>issued_date</Trans></label><br />
                                <label><Trans>date_submit</Trans></label><br />
                                <label><Trans>image_upload</Trans></label>
                            </div>
                            <div className="symbol2">
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label><br />
                                <label>:</label>
                            </div>
                            <div className="symbol3">
                                <label>{user.address}</label><br />
                                <label>{user.docType}</label><br />
                                <label>{user.docIssuedDate.split("T")[0]}</label><br />                                
                                <label>{user.submitDoc}</label><br />
                                {this.downloadImg(user.imgs, user.id)}
                            </div>
                        </div>
                        <div className="verifyAlertBody">
                            <div className="symbol1">
                                <label><Trans>verify</Trans></label>
                            </div>
                            <div className="symbol2">
                                <label>:</label>
                            </div>
                            <div className="symbol3">
                                <button
                                    class="verifyBtn"
                                    style={{background: "#458c28"}}
                                    onClick={() => this.handleVerify(user.id, "doc", "verified")}
                                ><Trans>approve</Trans></button>&nbsp;&nbsp;
                                <button
                                    class="verifyBtn"
                                    style={{background: "#f73e3e"}}
                                    onClick={() => this.handleVerify(user.id, "doc", "rejected")}
                                ><Trans>reject</Trans></button>
                            </div>
                        </div>
                    </div>
                ),
                isAlert: 1
            });  
        }
    }

    handleVerify(userId, verifyType, verifyStatus) {
        var playload = {
            userId: userId,
            verifyType: verifyType,
            verifyStatus: verifyStatus
        };

        axios.post(API_SERVER + '/api/v1/admin/verify', playload)
        .then((data) => {
            let results = data.data;
            this.setState({
                isLoaded: 0,
                isAlert: 0
            });
            this.componentDidMount();
            if (this.getCurrentLang()) alert("User " + verifyStatus + " successfully!");
            else {
                if (verifyStatus == 'verified') alert("用户验证成功!");
                else alert("用户拒绝成功!");
            }
        })
        .catch(err => {
            if (this.getCurrentLang()) alert("Something wrong in User verification!");
            else alert("用户验证有问题！");
        });
    }

    handleSmartContractChange(address) {
        this.setState({smartContractAddr: address});
    }

    handlePrivateKeyChange(privateKey) {
        this.setState({privateKey: privateKey});
    }

    handleSmartContract = async () => {
        if (!this.state.smartContractAddr || !this.state.privateKey) {
            if (this.getCurrentLang()) alert("Please input Smart-Contract address and Private Key correctly.");
            else alert("请正确输入智能合约地址和私钥。");
        } else {
            if (this.getCurrentLang()) alert("Please wait for the confirmation message. Usually Ethereum network takes time.");
            else alert("请等待确认消息。 通常以太坊网络需要时间。");
            var my_privkey = this.state.privateKey;
            if (!my_privkey.includes('0x')) my_privkey = '0x' + my_privkey;
            var myAddress = _web3.eth.accounts.privateKeyToAccount(my_privkey).address;
            var count = await _web3.eth.getTransactionCount(myAddress);
            var gasPrice = this.state.gasPrice;
            var abiArray = this.props.abiArray;
            var contract = new _web3.eth.Contract(abiArray, contractAddress, { from: myAddress });
            var rawTransaction = {
                "from": myAddress,
                "nonce": count,
                "gasPrice": 10 * gasPriceDecimal,                  
                "gasLimit": 800000,
                "to": contractAddress,
                "value": 0,
                "data": contract.methods.setERC721Address(this.state.smartContractAddr).encodeABI(),
                "chainId": 3
            };
            var privKey = new Buffer(this.state.privateKey, 'hex');
            var tx = new Tx(rawTransaction);
            tx.sign(privKey);
            var tx_hash = tx.hash();
            var tx_hash_str = "0x"+tx_hash.toString('hex');
            var serializedTx = tx.serialize();
            var componentHandler = this;
            _web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .then(function(success) {
                if (success) {
                    console.log(success);
                    if (componentHandler.getCurrentLang()) alert("ERC-721 Smart-Contract is set successfully!");
                    else alert("ERC-721智能合同成功设置！");
                } else {
                    console.log(success);
                    if (componentHandler.getCurrentLang()) alert("Something wrong in Smart Contract setting!");
                    else alert("智能合同设置有问题！");
                }
            })
            .catch(function(err) {
                console.log(err);
                alert(err);
            });
            return tx_hash_str;
        }
    }

    handleArrowClick(type) {
        if (type == "<<") this.setState({showViews: 1});
        else if (type == "<") this.setState({showViews: this.state.showViews - 1});
        else if (type == ">") this.setState({showViews: this.state.showViews + 1});
        else if (type == ">>") this.setState({showViews: parseInt(this.state.users.length / 10) + 1});
    }

	render() {
        const kycStatus = (status, index, type) => {
            if (status == 0)
                return (<p className="verifyTxt" style={{color: "rgb(226, 55, 55)"}}><Trans>not_provided</Trans></p>);
            else if (status == 1)
                return (
                    <div>
                        <p className="verifyTxt" style={{color: "#f79625"}}>Pending</p>
                        <button className="verifyTxtBtn" onClick={() => this.handleEachUser(index, type)}><Trans>more_info</Trans></button>
                    </div>     
                );
            else if (status == 2)
                return (
                    <div>
                        <p className="verifyTxt" style={{color: "rgb(12, 121, 12)"}}>Verified</p>
                        <button className="verifyTxtBtn" onClick={() => this.handleEachUser(index, type)}><Trans>more_info</Trans></button>
                    </div> 
                );
            else if (status == -1)
                return (
                    <div>
                        <p className="verifyTxt" style={{color: "rgb(140, 140, 140)"}}>Rejected</p>
                        <button className="verifyTxtBtn" onClick={() => this.handleEachUser(index, type)}><Trans>more_info</Trans></button>
                    </div>
                );
        }

        const activityStatus = (total) => {
            if (total >= 500) return (<td style={{color: "#f79625"}}>MID</td>);
            else if (total >= 1000) return (<td style={{color: "#0c790c"}}>HIGH</td>);
            else if (total < 500 && total > 0) return (<td style={{color: "gray"}}>LOW</td>);
            else if (total == 0) return (<td style={{color: "#e23737"}}>NONE</td>);
        }

        const totalActive = (total) => {
            if (total == 5) return (<div style={{width: "100%", height: "20px", background: "#0c790c"}}></div>);
            else if (total >= 3) return (<div style={{width: "100%", height: "20px", background: "#f79625"}}></div>);
            else if (total >= 1) return (<div style={{width: "100%", height: "20px", background: "gray"}}></div>);
            else if (total == 0) return (<div style={{width: "100%", height: "20px", background: "#e23737"}}></div>);
        }

        const mapToUsers = (users) => {
            if (users) {
                return users.map((user, i) => {
                    if ((this.state.showViews - 1) * adminShowViews <= i && i < this.state.showViews * adminShowViews) 
                    {
                        return (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{user.email}</td>
                                <td style={user.email_verified ? {color: "#0c790c"} : {color: "#e23737"}}>{user.email_verified ? "Verified" : "Not Verified"}</td>
                                <td>{kycStatus(user.idStatus, i, "id")}</td>
                                <td>{kycStatus(user.docStatus, i, "doc")}</td>
                                <td>{totalActive(user.email_verified + user.idStatus + user.docStatus)}</td>
                                {activityStatus(user.buyAmount)}
                            </tr>
                        );
                    }
                });    
            }
        }
        
		return (
            <div>
                <div className="tab_container flex admin_container">
                    <div className="tab_container full_width">
                        <div className="tab_row">
                            <div className="tab_header">
                                <span className="sign_info"><Trans>kyc</Trans></span>
                            </div>
                            <div className="tab_body">
                                <div className="tab_side">
                                    <span className="sign_info" style={{"alignSelf": "center"}}>
                                        <Trans>registered_users</Trans>
                                    </span><br />
                                    <table>
                                        <tr style={{background: "gray", fontWeight: "bold"}}>
                                            <th>no.</th>
                                            <th><Trans>user_email</Trans></th>
                                            <th><Trans>email_verification</Trans></th>
                                            <th><Trans>document_verification</Trans></th>
                                            <th><Trans>address_verification</Trans></th>
                                            <th><Trans>status</Trans></th>
                                            <th><Trans>buy</Trans> BTNY</th>
                                        </tr>
                                        {mapToUsers(this.state.users)}
                                    </table>
                                    <div style={{textAlign: "right"}}>
                                        <button 
                                            className="arrowBtn"
                                            onClick={() => this.handleArrowClick("<<")}
                                            style={this.state.showViews == 1 ? {pointerEvents: "none"} : null}
                                        >&lt;&lt;</button>&nbsp;
                                        <button
                                            className="arrowBtn"
                                            onClick={() => this.handleArrowClick("<")}
                                            style={this.state.showViews == 1 ? {pointerEvents: "none"} : null}
                                        >&lt;</button>&nbsp;
                                        <button
                                            className="arrowBtn"
                                            onClick={() => this.handleArrowClick(">")}
                                            style={this.state.users.length < this.state.showViews * 10 ? {pointerEvents: "none"} : null}
                                        >&gt;</button>&nbsp;
                                        <button
                                            className="arrowBtn"
                                            onClick={() => this.handleArrowClick(">>")}
                                            style={this.state.users.length < this.state.showViews * 10 ? {pointerEvents: "none"} : null}
                                        >&gt;&gt;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab_container flex">
                    <div className="tab_container full_width">
                        <div className="tab_row">
                            <div className="tab_header">
                                <span className="sign_info">BTNY <Trans>status</Trans></span>
                            </div>
                            <div className="tab_body">
                                <p><Trans>tokens_sold_private</Trans><b>
                                    {this.state.privateSaleTotalNumberTokenSold}</b>
                                </p>
                                <p><Trans>tokens_sold_pre1</Trans><b>
                                    {this.state.preSale1TotalNumberTokenSold}</b>
                                </p>
                                <p><Trans>tokens_sold_pre2</Trans><b>
                                    {this.state.preSale2TotalNumberTokenSold}</b>
                                </p>
                                <p><Trans>tokens_sold_public</Trans><b>
                                    {this.state.publicSaleTotalNumberTokenSold}</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab_container flex">
                    <div className="tab_container full_width">
                        <div className="tab_row">
                            <div className="tab_header">
                                <span className="sign_info"><Trans>set_erc721_addr</Trans></span>
                            </div>
                            <div className="tab_body">
                                <p>Smart Contract <Trans>address</Trans></p>
                                <input type="text"
                                    className={"amount_in"}
                                    placeholder={"Please input ERC-721 Smart Contract Address here..."}
                                    value={this.state.smartContractAddr}
                                    onChange={(e) => this.handleSmartContractChange(e.target.value)} /><br />
                                <p><Trans>owner_private_key</Trans></p>
                                <input type="text"
                                    className={"amount_in"}
                                    placeholder={"Please input Private Key here..."}
                                    value={this.state.privateKey}
                                    onChange={(e) => this.handlePrivateKeyChange(e.target.value)} /><br />
                                <button onClick={() => this.handleSmartContract()}
                                    style={{"marginTop": "40px"}}><Trans>set</Trans></button>
                            </div>
                        </div>
                    </div>
                </div>
                {!this.state.isLoaded ? (<Preload />) : ""}
                {this.state.isAlert ? (<Alert content={this.state.content} sStyle={true} />) : ""}
            </div>
		);
	}
}

export default translate('translations')(Admin);