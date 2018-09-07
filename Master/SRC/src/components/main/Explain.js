import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Explain extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
            <div className="section section-pad no-pb section-bg-alt">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="res-m-btm animated" data-animate="fadeInUp" data-delay=".1">
                                {this.props.lang == "en" ? (<img src="images/graph-dark-b.png" alt="graph" />) : (<img src="images/graph-dark-b(c).png" alt="graph" />)}
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-1">
                            <div className="text-block">
                                <h4 className="animated" data-animate="fadeInUp" data-delay="0"><Trans>more_honey</Trans></h4>
                                <p className="lead animated" data-animate="fadeInUp" data-delay=".1"><Trans>corss_industry</Trans></p>
                                <p className="animated" data-animate="fadeInUp" data-delay=".2"><Trans>bithubs_interactive</Trans></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default translate('translations')(Explain);