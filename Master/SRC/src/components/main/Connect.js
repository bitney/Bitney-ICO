import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Connect extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section subscribe-section section-pad-md section-bg section-connect">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col-md-6 offset-md-3">
	                        <h4 className="section-title-md animated" data-animate="fadeInUp" data-delay="0"><Trans>dont_miss_out</Trans></h4>
	                        <form id="subscribe-form" action="https://bitney.io/mailchimp/subscribe.php" method="post" className="subscription-form inline-form"></form>
	                        <form id="subscribe-form" action="" className="subscription-form inline-form">
	                            <input type="text" name="email" id="email" className="input-round required email" placeholder={this.props.lang == 'en' ? 'Enter your email address' : '输入您的电子邮箱地址'} />
	                            <input type="text" className="d-none" name="fname" value="" />
	                            <input name="submit" id="subscribe" className="btn btn-plane"  type="button" value="Subscribe" style={{height: "64px"}} />
	                            <div className="subscribe-results"></div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(Connect);