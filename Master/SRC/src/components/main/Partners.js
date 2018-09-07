import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Partners extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
            <div className="section section-pad section-bg-alt" id="partners">
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <div className="section-head">
                                <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0"><Trans>out_partners</Trans>
                                    <span><Trans>partners</Trans></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="partner-list">
                        <div className="row text-center">
                            <div className="col-sm">
                                <div className="single-partner animated" data-animate="fadeInUp" data-delay="0">
                                    <a href="https://www.bitbubs.com" target="none"><img src="images/partner-md-a.png" alt="partner" /></a>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="single-partner animated" data-animate="fadeInUp" data-delay=".1">
                                    <a><img src="images/partner-md-b.png" alt="partner" /></a>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="single-partner animated" data-animate="fadeInUp" data-delay=".2">
                                    <a><img src="images/partner-md-c.png" alt="partner" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="res-m-btm animated" data-animate="fadeInUp" data-delay=".1">
                            <img src="images/giantbfarm.jpg" alt="farm" />
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default translate('translations')(Partners);