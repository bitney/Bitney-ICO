import React from 'react'
import axios, { post } from 'axios';
import { API_SERVER } from '../../constants';

export default class Uploader extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            file: null,
            preview: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
    }

    onChange(e) {
        this.setState({
            file: e.target.files[0],
            preview: true
        });

        var componentHandler = this;
        var input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (v) {
            	document.getElementById(componentHandler.props.type).setAttribute("src", v.target.result);
                componentHandler.fileUpload(input.files[0], v.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    fileUpload(file, base64Img) {
        const url = API_SERVER + "/api/v1/upload/file/" + this.props.type;
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if (this.props.type == "id")
            this.props.handleFileChangeId(url, formData, config, base64Img);
        else
            this.props.handleFileChangeDoc(url, formData, config, base64Img);
        // return post(url, formData, config);
    }

    render() {
    	const preview = (this.state.preview ? (<img id={this.props.type} src="" alt="your image" className="fileUpload" />) : "");

        return ( 
			<form onSubmit={ this.onFormSubmit }>
				{preview}
				<input type="file" onChange={(e) => this.onChange(e)} />
			</form>
        )
    }
}