import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Game extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <div className="section section-pad section-bg-btoa" id="thegame">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                            <div className="section-head">
                                <div className="heading-animation">
                                    <span className="line-1"></span><span className="line-2"></span>
                                    <span className="line-3"></span><span className="line-4"></span>
                                    <span className="line-5"></span><span className="line-6"></span>
                                    <span className="line-7"></span><span className="line-8"></span>
                                </div>
                                <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0"><Trans>beeznix_heists</Trans> 
                                    <span><Trans>game</Trans></span>
                                </h2>
                                <p className="animated" data-animate="fadeInUp" data-delay=".1"><Trans>a_massively_multi</Trans></p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-12">
                            <div className="res-m-btm animated" data-animate="fadeInUp" data-delay=".1">
                                <a href="https://www.beeznix.com" target="none"><img src="images/beeznix.jpg" alt="beeznix" /></a>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <br />
                            <div className="text-block">
                                <p className="animated" data-animate="fadeInUp" data-delay="0"><Trans>based_on_a_story</Trans></p>
                                <ul className="animated" data-animate="fadeInUp" data-delay=".1">
                                    <li><Trans>build_your_base</Trans></li>
                                    <li><Trans>collect_character_blueprints</Trans></li>
                                    <li><Trans>visit_other_players</Trans></li>
                                    <li><Trans>sell_your_honey</Trans></li>
                                    <li><Trans>sell_your_blueprints</Trans></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="res-m-btm animated" data-animate="fadeInUp" data-delay=".1">
                                {this.props.lang == "en" ? (<img src="images/graph-dark-c.png" alt="graph" />) : (<img src="images/graph-dark-c(c).png" alt="graph" />)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-block">
                                <p className="lead animated" data-animate="fadeInUp" data-delay=".1"><Trans>creating_an_intell</Trans></p>
                                <p className="animated" data-animate="fadeInUp" data-delay="0">
                                    <Trans>the_bluepz_concept</Trans>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default translate('translations')(Game);