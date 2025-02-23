import React, {Component} from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import {Layout} from 'element-react';
import Login from "../Login";
import Register from "../Register";
import {connect} from "react-redux";
import { withTranslation } from 'react-i18next'

const mapStateToProps = state => {
    const {logged, user} = state.auth;
    return {
        logged, user
    }
}

const Affiliate = connect(mapStateToProps)(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // logged: props.logged,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props)
    }

    ridirectToAffiliateDasboard = () => {
    this.props.history.push('affiliate-dashboard')
    }

    componentWillUpdate() {
        const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        window.scrollTo(0, 0);
        // if(this.props.user) {
        //   if(this.props.user.roles[0] === 'ADMIN') {
        //     this.props.history.push('/admin/dashboard');
        //   }
        // }
      }
ate
    render() {
        const { t } = this.props
        return (
            <div style={{padding: "7% 12% 7% 12%", backgroundColor:"#fff"}}>
                <Row>
                    <Col sm="6">
                        <Fade bottom delay={200}>
                            <div>
                                <div className="d-font-black d-text-header d-text-72" style={{marginTop: "5%"}}>
                                    {t('affiliate.INTRODUCING THE eSTOOK')}
                                    <br/>
                                    {t('affiliate.AFFILIATE PROGRAM!')}
                                </div>
                                <div className="d-highlight d-font-black d-text-90" style={{marginTop: "10%"}}>
                                    {t('affiliate.Become a Real Estate Agent')}
                                </div>
                                <div style={{marginRight:"25%"}}>
                                <div className="d-font-bold d-text-32">
                                    {t('affiliate.desc')}
                                </div>
                                {/* <div style={{height: 24}}/>
                                <div className="d-highlight d-font-bold d-text-56">
                                    {t('affiliate.How it Works')}:
                                </div>
                                <div className="d-font-bold d-text-24">
                                    <div className='row'>

                                    </div>
                                </div>
                                <div style={{height: 48}}/>
                                <div className="d-font-bold d-text-24">
                                    {t('affiliate.Anyone who owns just one eSTOOK Token is invited to join the Affiliate Program. Begin you real estate investment portfolio, and start earning rental payments and referral rewards to your wallet on a daily basis.')}
                                </div>
                                <div style={{height: 24}}/>
                                <div className="d-highlight d-font-bold d-text-20">
                                    {t('affiliate.Join the first generation of tokenized real estate professionals today!')}
                                </div> */}
                                    </div>
                                
                            </div>
                        </Fade>
                    </Col>
                    <Col sm="6" style={{marginTop: 30}}>
                        <Zoom delay={600}>
                            <div>
                                <img width="100%"
                                     src={!this.props.logged ? `imgs/affiliate/affiliate.png` : `imgs/marketplace.png`}
                                     alt="Affiliate"/>
                                <div className="d-content-highlight d-content-center text-white d-font-black d-text-60"
                                     style={{padding: "3%"}}>
                                    {
                                        !this.props.logged ? t('affiliate.Become an Affiliate!') : t('affiliate.Congratulations!')
                                    }
                                </div>
                                {
                                    !this.props.logged ?
                                        <div className="d-highlight d-font-book d-text-24 mt-3">
                                            {t('affiliate.Join the new generation of digital real estate agents and grow your income stream with eSTOOK referrals.To get started, just sign in or register below!')}
                                        </div>
                                        : <>
                                            <div className=" d-font-mont-regular d-text-40 mt-2">
                                                {t('affiliate.You are now a eSTOOK Affiliate!')}<br/>
                                                {t('affiliate.You are ready to start earning referral rewards.')}<br/>
                                                {t('affiliate.Head to your Affiliate Dashboard to get set up!')}
                                            </div>
                                            <div className="w-full text-center">
                                            <Button onClick={this.ridirectToAffiliateDasboard} className={'d-black d-font-mont-regular d-text-36 d-content-highlight mt-5'}
                                                    style={{
                                                        borderRadius: 4,
                                                        textAlign: "center",

                                                        padding:"10px 50px"
                                                    }}>{t("affiliate.AFFILIATE DASHBOARD")}
                                            </Button>
                                            </div>
                                        </>
                                }

                            </div>
                        </Zoom>
                    </Col>
                </Row>
                <div className='d-highlight d-text-56 d-font-bold'>
                    {t('affiliate.How it Works')}:
                </div>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>1. Sign Up:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.Register as an affiliate on our platform and receive a unique referral link.')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>2. Promote:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_2')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>3. Track:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_3')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>4. Earn Commissions:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_4')}
                        </div>
                    </Col>
                </Row>
                <div className='d-highlight d-text-56 d-font-bold' style={{marginTop:"7%"}}>
                    {t('affiliate.Benefits of Joining')}:
                </div>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>- Token Rewards:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_5')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>- Marketing Materials:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_6')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>- Real-Time Reporting:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_7')}
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"3%"}}>
                    <Col sm="2">
                        <div className='d-font-bold d-text-48'>- Dedicated Support:</div>
                    </Col>
                    <Col sm="10">
                        <div className='d-text-32 d-font-bold'>
                            {t('affiliate.desc_8')}
                        </div>
                    </Col>
                </Row>
                <div className='d-highlight d-text-56 d-font-bold' style={{marginTop:"7%"}}>
                    Terms and Conditions:
                </div>
                <div className='d-text-32 d-font-bold' style={{marginTop: "3%"}}>
                Please review our Affiliate Program terms and contditions for comprehensive details on commission payment schedules, program guideline, and token distribution.
                </div>
                <div className='d-highlight d-text-56 d-font-bold' style={{marginTop:"7%"}}>
                    Join Us Today:
                </div>
                <div className='d-text-32 d-font-bold' style={{marginTop: "3%"}}>
                Don't let this opportunity slip by to enrich your income with Tokzied Real Estate Ventures lnc's real estate investment in Tokens!
Reigsiter today and become a vital part of our success as you embrace the exciting role of a modern digital real estate agent and amplify your income through eSTOOK referrals.
                </div>

                <div className='d-text-87 d-font-bold text-black text-center' style={{marginTop:"5%"}}>
                    {t('affiliate.title_2')}
                </div>
                
                {
                    !this.props.logged && <Fade bottom delay={200} >
                        <Layout.Row style={{marginTop:50}}>
                            <Layout.Col sm="24" md={12}>
                                <div className="grid-content">
                                    <Login/>
                                </div>
                            </Layout.Col>
                            <Layout.Col sm="24" md={12}>
                                <div className="grid-content">
                                    <Register/>
                                </div>
                            </Layout.Col>
                        </Layout.Row>
                    </Fade>
                }

            </div>
        )
    }
})

export default withTranslation()(Affiliate);
