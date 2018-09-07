import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section footer-scetion no-pt section-pad-sm section-bg">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col-md-12">
	                        <ul className="social">
	                            <li className="animated" data-animate="fadeInUp" data-delay="0"><a href="https://www.fb.com/bitneys" target="none"><em className="fa fa-facebook"></em></a></li>
	                            <li className="animated" data-animate="fadeInUp" data-delay=".1"><a href="https://www.twitter.com/bitneytoken" target="none"><em className="fa fa-twitter"></em></a></li>
	                            <li className="animated" data-animate="fadeInUp" data-delay=".2"><a href="#"><em className="fa fa-youtube-play" target="none"></em></a></li>
	                            <li className="animated" data-animate="fadeInUp" data-delay=".3"><a href="https://wwww.github.com/bitney" target="none"><em className="fa fa-github"></em></a></li>
	                        </ul>
	                        <span className="copyright-text animated" data-animate="fadeInUp" data-delay=".3">
	                        <Trans>copyright_2018</Trans>
	                        <span><Trans>all_trademarks</Trans></span>
	                        </span>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(Footer);