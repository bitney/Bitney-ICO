import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class RoadMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section section-pad section-bg section-connect" id="roadmap">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0">Our Roadmap
	                                <span><Trans>roadmap</Trans></span>
	                            </h2>
	                        </div>
	                    </div>
	                </div>
	                <div className="row roadmap-list align-items-end animated" data-animate="fadeInUp" data-delay="0">
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-sm roadmap-done">
	                            <h6><Trans>april2018</Trans></h6>
	                            <p><Trans>whitepaper_release</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg width-0">
	                        <div className="single-roadmap roadmap-down roadmap-done">
	                            <h6><Trans>may2018</Trans></h6>
	                            <p><Trans>develop_erc20</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-lg">
	                            <h6><Trans>june2018</Trans></h6>
	                            <p><Trans>ico_and_boarding</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg width-0">
	                        <div className="single-roadmap roadmap-down">
	                            <h6><Trans>august2018</Trans></h6>
	                            <p><Trans>exchange_listing_and</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-sm">
	                            <h6><Trans>october2018</Trans></h6>
	                            <p><Trans>game_demo</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg width-0">
	                        <div className="single-roadmap roadmap-down">
	                            <h6><Trans>december2018</Trans></h6>
	                            <p><Trans>beeznix_game_beta</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-lg">
	                            <h6><Trans>january2019</Trans></h6>
	                            <p><Trans>beeznix_game_release</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg width-0">
	                        <div className="single-roadmap roadmap-down">
	                            <h6><Trans>february2019</Trans></h6>
	                            <p><Trans>launch_of_goddess</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-sm">
	                            <h6><Trans>februray2</Trans></h6>
	                            <p><Trans>farm_expansion_and</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg width-0">
	                        <div className="single-roadmap roadmap-down">
	                            <h6><Trans>march2019</Trans></h6>
	                            <p><Trans>beeznix_expansion</Trans></p>
	                        </div>
	                    </div>
	                    <div className="col-lg">
	                        <div className="single-roadmap roadmap-lg">
	                            <h6><Trans>apri2019</Trans></h6>
	                            <p><Trans>begin_media_franchise</Trans></p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(RoadMap);