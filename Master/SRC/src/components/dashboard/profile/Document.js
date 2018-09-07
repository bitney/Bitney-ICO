import React, { Component } from 'react';
import Uploader from './Uploader';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios, { post } from 'axios';
import { API_SERVER } from '../../constants';
import { translate, Trans } from 'react-i18next';

class Document extends Component {
	constructor(props) {
		super(props);

		this.state = {
            issuedDate: moment(),
            address: "",
            docType: "Bill Statement",
            url: "",
            formData: null,
            config: null,
            base64Img: null
		};

        this.handleDateChange = this.handleDateChange.bind(this);
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

    handleDateChange(date) {
        this.setState({issuedDate: date});
    }

    handleDataChange(value, type) {
    	if (type == 1) this.setState({address: value});
    	if (type == 2) this.setState({docType: value});
    }

    handleFileChange(url, formData, config, base64Img) {
    	this.setState({
    		url: url,
    		formData: formData,
    		config: config,
            base64Img: base64Img
    	});
    }

    handleUpload() {
    	if (!post(this.state.url, this.state.formData, this.state.config)) {
    		if (this.getCurrentLang()) alert("Something wrong in document uploading.");
            else alert("文档上传有问题。");
    	}

    	var playload = this.state;
    	delete playload["url"];
    	delete playload["formData"];
    	delete playload["config"];
        axios.post(API_SERVER + '/api/v1/upload/doc', playload)
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
				<p><Trans>captured_image_doc</Trans></p>
                <Uploader type="doc" handleFileChangeDoc={this.handleFileChange} />
                <p><Trans>billing_address</Trans></p>
                <input type="text" className="amount_in" onChange={(e) => this.handleDataChange(e.target.value, 1)} />
                <p><Trans>document_type</Trans></p>
                <select onChange={(e) => this.handleDataChange(e.target.value, 2)}>
                    <option value="Bill Statement"><Trans>bill_state</Trans></option>
                    <option value="Bank Statement"><Trans>bank_state</Trans></option>
                    <option value="Other Fianance Document"><Trans>other_state</Trans></option>
                </select>
                <p>Issued date</p>
                <DatePicker selected={this.state.issuedDate} onChange={this.handleDateChange} /><br />
                <button onClick={() => this.handleUpload()}> <Trans>upload</Trans> </button>
			</div>
		);
	}
}

export default translate('translations')(Document);