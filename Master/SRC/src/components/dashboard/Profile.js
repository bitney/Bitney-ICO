import React, { Component } from 'react';
import IdCard from './profile/IdCard';
import Document from './profile/Document';
import axios from 'axios';
import { API_SERVER } from '../constants';
import { translate, Trans } from 'react-i18next';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
            isId: 0,
            isDoc: 0,
            idStatus: "nothing",
            docStatus: "nothing"
		};
	}

    componentDidMount() {
        axios.get(API_SERVER + "/api/v1/user/stats")
        .then(response => {
            var status = response.data;
            this.setState({
                idStatus: status.id,
                docStatus: status.document
            });
        })
        .catch(err => console.log(err));
    }

	render() {
        const start =       (<i className="material-icons" style={{color: "#e43e3e", "alignSelf": "center"}}>
                                highlight_off
                            </i>);
        const pending =     (<i className="material-icons" style={{color: "#ffa73b", "alignSelf": "center"}}>
                                schedule
                            </i>);
        const accepted =    (<i className="material-icons" style={{color: "#3ee4b9", "alignSelf": "center"}}>
                                done_all
                            </i>);

		return (
            <div>
                <div className="tab_container flex">
                    <div className="tab_container full_width">
                        <div className="tab_row">
                            <div className="tab_header">
                                <span className="sign_info"><Trans>kyc_verification_status</Trans></span>
                            </div>
                            <div className="tab_body" style={{display: "flex", overflow: "hidden"}}>
                                <div style={{flex: 1, display: "flex"}}>
                                    <span className="sign_info" style={{"alignSelf": "center"}}>
                                        <Trans>identify_card</Trans>
                                    </span>&nbsp;&nbsp;
                                    {this.state.idStatus == "nothing" ? start : ""}
                                    {this.state.idStatus == "pending" ? pending : ""}
                                    {this.state.idStatus == "accepted" ? accepted : ""}
                                </div>
                                <div style={{flex: 1, display: "flex"}}>
                                    <span className="sign_info" style={{"alignSelf": "center"}}>
                                        <Trans>proof_address</Trans>
                                    </span>&nbsp;&nbsp;
                                    {this.state.docStatus == "nothing" ? start : ""}
                                    {this.state.docStatus == "pending" ? pending : ""}
                                    {this.state.docStatus == "accepted" ? accepted : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    			<div className="tab_container flex">
                    <div className="tab_row_cover">
        				<div className="tab_row">
        					<div className="tab_header">
        						<span className="sign_info"><Trans>upload_id_card</Trans></span>
        					</div>
                            <IdCard />
        				</div>
                    </div>
                    <div className="tab_row_cover">
        				<div className="tab_row">
        					<div className="tab_header">
        						<span className="sign_info"><Trans>upload_document</Trans></span>
        					</div>
                            <Document />
        				</div>
                    </div>
    			</div>
            </div>
		);
	}
}

export default translate('translations')(Profile);