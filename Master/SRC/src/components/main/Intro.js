import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Intro extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
            <div className="section section-pad section-bg-blend nopb" id="intro">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 offset-md-1">
                            <div className="res-m-btm animated" data-animate="fadeInUp" data-delay=".1">
                                {this.props.lang == "en" ? (<img src="images/graph-dark-a.png" alt="graph" />) : (<img src="images/graph-dark-a(c).png" alt="graph" />)}
                            </div>
                        </div>
                        <div className="col-md-6 order-md-first order-last">
                            <div className="text-block">
                                <h2 className="animated" data-animate="fadeInUp" data-delay="0"><Trans>a_unique_bus</Trans> <br /> <Trans>for_game_rewards</Trans></h2>
                                <p className="lead animated" data-animate="fadeInUp" data-delay=".1"><Trans>btny_built_off</Trans></p>
                                <a href="nonce" className="play-btn video-play animated" data-animate="fadeInUp" data-delay=".2">
                                    <em className="play"><span></span></em>
                                    <span><Trans>coming_soon</Trans></span>
                                    <span><Trans>game_trailer</Trans></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default translate('translations')(Intro);