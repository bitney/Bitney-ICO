import React, { Component } from 'react';
import Uploader from './Uploader';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios, { post } from 'axios';
import { API_SERVER } from '../../constants';
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { translate, Trans } from 'react-i18next';

class IdCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
            birthDay: moment(),
            issuedDate: moment(),
            name: "",
            cardNum: "",
            cardType: "National ID",
            file: null,
            url: "",
            formData: null,
            config: null,
            base64Img: null,
            phone: null,
            countryCode: "IT"
		};

        this.handleBDateChange = this.handleBDateChange.bind(this);
        this.handleIDateChange = this.handleIDateChange.bind(this);
        this.handleDataChnage = this.handleDataChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
	}

    getCurrentLang() {
        var lang = window.localStorage.getItem('i18nextLng');
        if (lang == 'ch') return 0;
        else if (lang == 'en') return 1;
        else return 1; 
    }

    handleBDateChange(date) {
    	this.setState({birthDay: date});
    }

    handleIDateChange(date) {
    	this.setState({issuedDate: date});
    }

    handleDataChange(value, type) {
    	if (type == 1) this.setState({name: value});
    	if (type == 2) this.setState({cardNum: value});
    	if (type == 3) this.setState({cardType: value});
    }

    handleFileChange(url, formData, config, base64Img) {
    	console.log(formData);
    	this.setState({
    		url: url,
    		formData: formData,
    		config: config,
            base64Img: base64Img
    	});
    }

    handleUpload() {
    	if (!post(this.state.url, this.state.formData, this.state.config)) {
    		if (this.getCurrentLang()) alert("Something wrong in id card uploading.");
            else alert("身份证上传有问题。");
    	}

    	var playload = this.state;
    	delete playload["url"];
    	delete playload["formData"];
    	delete playload["config"];
        axios.post(API_SERVER + '/api/v1/upload/card', playload)
        .then((data) => {
            let results = data.data;
            if (this.getCurrentLang()) alert("Successfully uploaded!");
            else alert("成功上传！");
        })
        .catch(err => console.log(err));
    }

	render() {
		return (
			<div className="tab_body">
				<p><Trans>captured_image_id</Trans></p>
				<Uploader type="id" handleFileChangeId={this.handleFileChange} />
                <p><Trans>full_name</Trans></p>
                <input type="text" className="amount_in" onChange={(e) => this.handleDataChange(e.target.value, 1)} />
                <p><Trans>birthday</Trans></p>
                <DatePicker selected={this.state.birthDay} onChange={this.handleBDateChange} />
                <p><Trans>country_phone_number</Trans></p>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={ this.state.phone }
                    onChange={(phone) => {
                        this.setState({
                            phone: phone,
                            countryCode: document.getElementsByClassName("react-phone-number-input__icon-image")[0].getAttribute("alt")
                        });
                        console.log(document.getElementsByClassName("react-phone-number-input__icon-image")[0].getAttribute("alt"));
                    }} 
                />
                <p><Trans>card_number</Trans></p>
                <input type="text" className="amount_in" onChange={(e) => this.handleDataChange(e.target.value, 2)} />
                <p><Trans>card_type</Trans></p>
                <select onChange={(e) => this.handleDataChange(e.target.value, 3)}>
                    <option value="National ID"><Trans>national_id</Trans></option>
                    <option value="Driving License"><Trans>driving_lice</Trans></option>
                    <option value="Passport"><Trans>passport</Trans></option>
                </select>
                <p><Trans>issued_date</Trans></p>
                <DatePicker selected={this.state.issuedDate} onChange={this.handleIDateChange} />
                <br />
                <button onClick={() => this.handleUpload()}> <Trans>upload</Trans> </button>
			</div>
		);
	}
}

export default translate('translations')(IdCard);