import React, { Component } from 'react';
import { translate, Trans } from 'react-i18next';

class Team extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
	        <div className="section section-pad section-bg-alt section-fix" id="team">
	            <div className="container">
	                <div className="row text-center">
	                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0">Advisors
	                                <span>Advisory Board</span>
	                            </h2>
	                            <p className="animated" data-animate="fadeInUp" data-delay="0.1">Supporting the Core Team with individual expertise.</p>
	                        </div>
	                    </div>
	                </div>
	                <div className="row text-center">
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/allan-sq.png" alt="" />
	                                <a href="#team-profile-1" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>allanchan</Trans></h5>
	                                <span className="team-title"><Trans>chairman</Trans></span>
	                            </div>
	                            <div id="team-profile-1" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/allan-lg.png" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>allanchan</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/allan-chan-6688aa166/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>chairman</Trans></p>
	                                                <p><Trans>allanchan_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/mark-sq.jpg" alt="" />
	                                <a href="#team-profile-2" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name">Mark Pui</h5>
	                                <span className="team-title">Advisor (Operations)</span>
	                            </div>
	                            <div id="team-profile-2" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/mark-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name">Mark Pui	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/markpui/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title">Mark Pui</p>
	                                                <p>With over 20 years of experience in the financial and management consulting industry, Mark has been a driving force in accelerating the development of the blockchain and cryptocurrency scene both as an advisor and investor assisting Fintech companies with cryptocurrency integrated funding.
	                                                </p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/darren-sq.png" alt="" />
	                                <a href="#team-profile-3" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>darrenkiang</Trans></h5>
	                                <span className="team-title"><Trans>advisor</Trans></span>
	                            </div>
	                            <div id="team-profile-3" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/darren-lg.png" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>darrenkiang</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/darren-kiang-138149167/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>advisor</Trans></p>
	                                                <p><Trans>darrenkiang_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/saba-sq.jpg" alt="" />
	                                <a href="#team-profile-4" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name">Saba Harati</h5>
	                                <span className="team-title">Advisor (Psychology)</span>
	                            </div>
	                            <div id="team-profile-4" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/saba-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name">Saba Harati	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/saba-harati-905760166/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title">Advisor (Psychology)</p>
	                                                <p>Armed with  a Master's Degree and a strong passion in the field of psychology and human behaviour, Saba is a highly competent counsellor who
	                                                    facilitated the Aftab Rehabilitation Center, providing counselling sessions, conducting client evaluation, developing treatment plans, and overseeing day-to-day operations in the centre. 
	                                                    The career development grew into other areas including developing and monitoring clinical strategies to increase rate of recovery supported by thorough research. 
	                                                    Community engagement and support through voluntary advocacy and building strong support groups with the community. She lends her support, drawing on her expertise in human behavioural patterns to aid the success of the game.
	                                                </p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <br /><br />
	                <div className="row text-center">
	                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0">Core Team
	                                <span>Team</span>
	                            </h2>
	                            <p className="animated" data-animate="fadeInUp" data-delay="0.1">Beeznix is made possible by a dedicated team of experienced, skilled and creative people.</p>
	                        </div>
	                    </div>
	                </div>
	                <div className="row text-center">
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/chng-sq.png" alt="" />
	                                <a href="#team-profile-5" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>chngjunwei</Trans></h5>
	                                <span className="team-title"><Trans>ceofofounder</Trans></span>
	                            </div>
	                            <div id="team-profile-5" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/chng-lg.png" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>chngjunwei</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/jun-ch-ng-aab7377a/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>ceofofounder</Trans></p>
	                                                <p><Trans>chngjunwei_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/yaohan-sq.png" alt="" />
	                                <a href="#team-profile-6" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>limyaohan</Trans></h5>
	                                <span className="team-title"><Trans>coo</Trans></span>
	                            </div>
	                            <div id="team-profile-6" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/yaohan-lg.png" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>limyaohan</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/lim-yao-han-2466304a/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>coo</Trans></p>
	                                                <p><Trans>limyaohan_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/jia-sq.jpg" alt="" />
	                                <a href="#team-profile-7" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>jianina</Trans></h5>
	                                <span className="team-title"><Trans>marketing_director</Trans></span>
	                            </div>
	                            <div id="team-profile-7" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/jia-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>jianina</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/jianina-jason-a21a03b0/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>marketing_director</Trans></p>
	                                                <p><Trans>jianina_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/darian-sq.jpg" alt="" />
	                                <a href="#team-profile-8" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>darian</Trans></h5>
	                                <span className="team-title"><Trans>cto</Trans></span>
	                            </div>
	                            <div id="team-profile-8" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/darian-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>darian</Trans>
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/darian-poh-249a81169/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>cto</Trans></p>
	                                                <p><Trans>darian_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div className="row text-center">
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/nizam-sq.jpg" alt="" />
	                                <a href="#team-profile-9" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>nizamrahman</Trans></h5>
	                                <span className="team-title"><Trans>leaddsng</Trans></span>
	                            </div>
	                            <div id="team-profile-9" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/nizam-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>nizamrahman</Trans>	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/nizam-rahman-33665811b/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>leaddsng</Trans></p>
	                                                <p><Trans>nizamrahman_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/joe-sq.jpg" alt="" />
	                                <a href="#team-profile-10" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>joeong</Trans></h5>
	                                <span className="team-title"><Trans>gamedsng</Trans></span>
	                            </div>
	                            <div id="team-profile-10" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/joe-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>joeong</Trans>	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/joe-ong-wei-shen/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>gamedsng</Trans></p>
	                                                <p><Trans>joeong_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/louise-sq.jpg" alt="" />
	                                <a href="#team-profile-11" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>louisewong</Trans></h5>
	                                <span className="team-title"><Trans>seniormarketing</Trans></span>
	                            </div>
	                            <div id="team-profile-11" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/louise-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>louisewong</Trans>	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/louise-wong-161a48124/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>seniormarketing</Trans></p>
	                                                <p><Trans>louisewong_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="col-md-6 col-lg-3">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/gupta-sq.jpg" alt="" />
	                                <a href="#team-profile-12" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>guptaraghava</Trans></h5>
	                                <span className="team-title"><Trans>leaddev</Trans></span>
	                            </div>
	                            <div id="team-profile-12" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/gupta-lg.jpg" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>guptaraghava</Trans>	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/raghava-gupta-gokavarapu-7b216354" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>leaddev</Trans></p>
	                                                <p><Trans>guptaraghava_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <br /><br />
	                <div className="row text-center">
	                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
	                        <div className="section-head">
	                            <h2 className="section-title animated" data-animate="fadeInUp" data-delay="0">Partnering Business
	                                <span>PARTNER</span>
	                            </h2>
	                            <p className="animated" data-animate="fadeInUp" data-delay="0.1">The first honey farm onboarded by Bitney, Giant B Farms is an established 40 year old beekeeping and honey business venturing into the brave new world of blockchain gaming.</p>
	                        </div>
	                    </div>
	                </div>
	                <div className="row text-center">
	                    <div className="col-md-12 col-lg-12">
	                        <div className="team-circle animated" data-animate="fadeInUp" data-delay=".2">
	                            <div className="team-photo">
	                                <img src="images/desmond-sq.png" alt="" />
	                                <a href="#team-profile-13" className="expand-trigger content-popup"></a>
	                            </div>
	                            <div className="team-info">
	                                <h5 className="team-name"><Trans>desmondtan</Trans></h5>
	                                <span className="team-title"><Trans>partenring</Trans></span>
	                            </div>
	                            <div id="team-profile-13" className="team-profile mfp-hide">
	                                <button title="Close" type="button" className="mfp-close">×</button>
	                                <div className="container-fluid">
	                                    <div className="row no-mg">
	                                        <div className="col-md-6">
	                                            <div className="team-profile-photo">
	                                                <img src="images/desmond-lg.png" alt="" />
	                                            </div>
	                                        </div>
	                                        <div className="col-md-6">
	                                            <div className="team-profile-info">
	                                                <h3 className="name"><Trans>desmondtan</Trans>	
	                                                	<a style={{cursor: "pointer"}} target="_blank" href="https://www.linkedin.com/in/desmond-tan-275158167/" >
	                                                		<i className="fa fa-linkedin-square" style={{fontSize: "30px", float: "right"}}></i>
	                                                	</a>
	                                                </h3>
	                                                <p className="sub-title"><Trans>partenring</Trans></p>
	                                                <p><Trans>desmondtan_detail</Trans></p>
	                                            </div>
	                                        </div>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		);
	}
}

export default translate('translations')(Team);