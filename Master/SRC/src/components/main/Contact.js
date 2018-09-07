import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section section-pad section-bg-alt" id="contact">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0">Contact Bitney.io
	                                <span>Contact</span>
	                            </h2>
	                            <p className="animated" data-animate="fadeInUp" data-delay=".1">Questions? Ask us here.</p>
	                        </div>
	                    </div>
	                </div>
	                <div className="row">
	                    <div className="col-lg-8 offset-lg-2">
	                        <ul className="contact-info">
	                            <li className="animated" data-animate="fadeInUp" data-delay="0"><em className="fa fa-phone"></em><span>+60376211930</span></li>
	                            <li className="animated" data-animate="fadeInUp" data-delay=".1"><em className="fa fa-envelope"></em><span>hello@bitney.io</span></li>
	                            <li className="animated" data-animate="fadeInUp" data-delay=".2"><em className="fa fa-paper-plane"></em><span>Join us on Telegram</span></li>
	                        </ul>
	                    </div>
	                </div>
	                <div className="row">
	                    <div className="col-lg-8 offset-lg-2">
	                        <form id="contact-form" className="form-message text-center" action="form/contact.php" method="post">
	                            <div className="form-results"></div>
	                            <div className="input-field animated" data-animate="fadeInUp" data-delay=".3">
	                                <input name="contact-name" type="text" className="input-line required" />
	                                <label className="input-title">Your Name</label>
	                            </div>
	                            <div className="input-field animated" data-animate="fadeInUp" data-delay=".4">
	                                <input name="contact-email" type="email" className="input-line required email" />
	                                <label className="input-title">Your Email</label>
	                            </div>
	                            <div className="input-field animated" data-animate="fadeInUp" data-delay=".5">
	                                <textarea name="contact-message" className="txtarea input-line required"></textarea>
	                                <label className="input-title">Your Message</label>
	                            </div>
	                            <input type="text" className="d-none" name="form-anti-honeypot" value="" />
	                            <div className="input-field animated" data-animate="fadeInUp" data-delay=".6">
	                                <button type="submit" className="btn">Submit</button>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(Contact);