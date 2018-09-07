import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class TokenSale extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section section-pad section-bg-alt" id="tokenSale">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0"><Trans>token_sale</Trans>
	                                <span><Trans>token</Trans></span>
	                            </h2>
	                        </div>
	                    </div>
	                </div>
	                <div className="gaps size-3x"></div>
	                <div className="gaps size-3x d-none d-md-block"></div>
	                <div className="row text-center">
	                    <div className="col-md-6">
	                        <div className="single-chart res-m-btm">
	                            <h3 className="sub-heading"><Trans>distribution</Trans> <br className="hidden-xs" /> <Trans>of_tokens</Trans></h3>
	                            <div className="animated" data-animate="fadeInUp" data-delay="0">
	                            	{this.props.lang == "en" ? (<img src="images/chart-dark-a.png" alt="chart" />) : (<img src="images/chart-dark-a(c).png" alt="chart" />)}
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6">
	                        <div className="single-chart">
	                            <h3 className="sub-heading"><Trans>use</Trans> <br className="hidden-xs" /> <Trans>of_proceeds</Trans></h3>
	                            <div className="animated" data-animate="fadeInUp" data-delay=".1">
	                                {this.props.lang == "en" ? (<img src="images/chart-dark-b.png" alt="chart" />) : (<img src="images/chart-dark-b(c).png" alt="chart" />)}
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(TokenSale);