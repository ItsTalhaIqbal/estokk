import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import BecomeInvestor from './BecomeInvestor'
import './home.css'
import Home3 from "./Home3"
import { callPost } from '../../services/axios'
import { Notification } from 'element-react'
import { withTranslation } from 'react-i18next';
import AccordianComp from './AccordianComp'
import FaqComp from './FaqComp'
import { connect } from 'react-redux'
//IMAGES
import Home1 from '../../assets/imgs/image/home/first_background.png';
import Home1LIGHT from '../../assets/imgs/home1_light.png';

import Home8 from  '../../assets/imgs/image/home/bad.png';
import Home8LIGHT from  '../../assets/imgs/home8_light.png';


class Home extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.formDataSet = {
      name: null,
      email: null,
      phone: null,
      description: null,
      status: 'pending'
    }
    this.state = {
      email: null,
      firstName:null,

      isModalVisible: false,
      formData: {
        name: null,
        email: null,
        phone: null,
        description: null,
        status: 'pending'
      },
      isEmailValid: true,
      isNameValid: true,
      isPhoneValid: true
    }
  }


  componentDidMount() {
    window.scrollTo(0, 0)
    const urlParams = new URLSearchParams(this.props.location.search);
    const myParam = urlParams.get('ask_question');
    // console.log('hhhhhhhhhhhhhhhhh',urlParams,myParam)
    if(myParam){
      var element = document.querySelector("#schedule_call");

      // console.log('hhhhhhhhhhhhhhhhh',element)
      // scroll to element
      // element.scrollIntoView();
      setTimeout(()=>{
        // window.scrollTo(0,document.body.scrollHeight);
        element.scrollIntoView();
      },100)
      
      
      
    }
  }
  onChange = (e) => {
    this.setState({email:e.target.value});
  }
  onModalClose = () => {
    this.setState({...this.state, ...{isModalVisible: false},formData: this.formDataSet })
  }

  onSubmit = () =>{
    // console.log('token', token);
    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;
    console.log('token',token);
    callPost('/api/admin/savenewsletter', {email:this.state.email}, token)
      .then((response) => {
        if(response.data){
          Notification.success({
            title: 'Success',
            message: response.data?.message,
            type: 'success',
          })
        }
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning',
        })
      }
      )
  }
  validateEmail = (email) => {
    var mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(mail_format.test(String(email).toLowerCase()))

    {
      return true;    
    }

    return false;

  }
  isFormDataValid = () => {
    let invalidData = {};
    let validData = {};
    let data = {...this.state.formData}
    let returnTrue = true;
    if(!this.validateEmail(data.email)){
      invalidData.isEmailValid = returnTrue = false;
    }
    else {
      validData.isEmailValid = true;
    }
    if(!data.phone){
      invalidData.isPhoneValid = returnTrue = false;
    }
    else {
      validData.isPhoneValid = true;
    }
    if(!data.name){
      invalidData.isNameValid = returnTrue = false;
    }
    else {
      validData.isNameValid = true;
    }

    this.setState({
      ...this.state,
      ...invalidData,
      ...validData
    })
    if(!returnTrue){
      return false;
    }

    return true;
  }
  submitCallRequest = (e) =>{
    e.preventDefault();
    if(!this.isFormDataValid()){
      return false;
    }

    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;
    console.log('token',token);
    callPost('/api/admin/saveCallRequest', this.state.formData, token)
      .then((response) => {
        Notification.success({
          title: 'Success',
          message: response.data.message,
          type: 'success',
        })
        this.onModalClose()
      }).catch(err => {
        console.log(err);
        Notification.error({
          title: 'Failed',
          message: 'Please try again.',
          type: 'Warning',
        })
      }
      )
  }

  onFormDataChange = (e, type) => {

    let field = e.target.value;
    this.setState({
      ...this.state,
      formData:{
        ...this.state.formData,
        [type]:field
      }
    },()=>{
      if(type==='email'){
      

        if(this.validateEmail(field)){
          this.setState({
            ...this.state,
            isEmailValid:true
          })
        }
        else
        {
            this.setState({
              ...this.state,
              isEmailValid:false
            })
        }
      }
    })

  }
  renderHome1() {
    const { t, backMode } = this.props
    return <Fade>
      <div className="img-box img-box-home1" style={{backgroundImage:backMode=="light"?"url(" + Home1LIGHT +")" :"url(" + Home1 +")"}}>
        <Row style={{ margin: "4% 12% 0% 12%" }}>
          <Col md="8" style={{ marginBottom: 20,}}>
            <Fade bottom delay={200}>
              <div className=" d-text-85" style={{color:"#ffffff", marginTop:300}}>
              {t("home.eSTOKK Revolutionize")}
              </div>
              <div className=" d-text-85 d-white">
              {t("home.Real Estate Investment")}
              </div>
              <div style={{ height: 30 }} />
              <div className="d-white d-font-book d-text-36" dangerouslySetInnerHTML={{__html:t("home.Description")}}>
              
              </div>
            </Fade>
          </Col>
        </Row>


        <div style={{ margin: "50px 13% 0% 13%"}}>
            
          <div className="mb-12 d-flex">
              <Link to='/marketplace'>
                <Button className=" d-text-24 home2-btn primary-btn">{t("home.VIEW PROPERTIES")}</Button>
              </Link>
              <div className="ms-2 mt-2"></div>
              <Link to='/how-it-works'>
                <Button className=" d-text-24 home3-btn secondary-btn" variant="default" >{t("home.HOW IT WORKS")}</Button>
              </Link>
          </div>
          <div className="pt-10 margin-80">
            <img src="/image/home/forbes.png" alt="" style={{ width: '103%' }}/>
          </div>
        </div>
        
      </div>
    </Fade>
  }

  renderHome2() {
    const {  backMode } = this.props
    return <Fade>
      <div>
        <div style={{ margin: "8% 18% 8% 18%" }}  className="text-center">
          <Fade bottom delay={200}>
            <div>
              <img src={backMode=="light"?"/image/home/equal.png":"/image/home/equal.png"}></img>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome4() {
    const { t } = this.props
    return <Fade>
      <div className="img-box img-box-home4">
        <div  style={{ margin: "10% 18%"}}>
          <Fade bottom delay={200}>
          <div style={{marginLeft:"60%", paddingTop:"3%"}}>
            <div className=" d-text-85" dangerouslySetInnerHTML={{__html:t("home.SMART")}}>
                {/* {t("home.A savings Investment")} */}
            </div>
            <div className=" d-text-56" style={{color:"#786E64"}} dangerouslySetInnerHTML={{__html:t("home.Enjoy the Benefits")}}>
            </div>
          </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome5() {
    const { t, backMode} = this.props
    return <Fade>
      <div className="img-box img-box-home5" >
          <Fade bottom delay={200}>
            <div className="img-box" style={{ padding: "8% 16% 8% 16%", backgroundColor:backMode=="light"?"#D5C1B0":"transparent" ,position:"relative"}}>
              <div className="d-content-center d-white d-text-85" dangerouslySetInnerHTML={{__html:t("home.How to Invest in Real Estate with eSTOKK")}}>
              </div>              
            </div>            
            <div className="img-box img-box-home5-2" style={{ padding: "0% 16%", position:"relative", zIndex:"1001" }}>
              <img src="/image/home/overview.png" style={{margin:"-5% 25%", width:"50%"}}/>
            </div>
            <div className="img-box" style={{backgroundColor:backMode=="light"?"#E4E4E4":"transparent"}} >
              <img src={backMode=="light"?"/imgs/home/5/8_light.png":"/image/home/logo_10.png"} style={{width:"30%", paddingBottom:"8%", paddingTop: "10%", marginLeft:"35%"}}/>
            </div>
          </Fade>
      </div>
    </Fade>
  }

  renderHome6() {
    const { t,backMode } = this.props
    return <Fade>
      <div className="img-box" style={{backgroundColor:backMode=="light"?"#fff":"#ffffff"}}>
        <div className="home6-margin">
          <Fade bottom delay={200}>
            
            <div className="d-content-center">
              <div className="d-content-center d-white d-text-60" 
                dangerouslySetInnerHTML={{__html:t("home.Benefits, No Drawbacks")}} style={{borderBottom:"5px solid #44c2da"}}>
                  
              </div>
              <div className="d-content-center d-white d-text-32"  dangerouslySetInnerHTML={{__html:t("home.eSTOKK thanks to its revolutionary")}}>
              </div>
              
            <Row>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Maximized Returns")}
                  description={t("home.UP to 12% * Earn rental Income Every week")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Total Liquidity")}
                  description={t("home.Purchase and sale 100% online You buy and sell whenever you want")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Fee-Fee Zone")}
                  description={t("home.Neither buying nor selling")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
              <Col md={3} sm={6}>
                <BecomeInvestor
                  title={t("home.Effortless Managment")}
                  description={t("home.No Looking for property to buyNo tenant searchTokized.immo take care of everything")}
                  delay={200}
                  backMode={backMode}
                />
              </Col>
            </Row>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  // renderHome7() {
  //   // const { t } = this.props
  //   // return <Fade>
  //   //   <div className="img-box img-box-home7">
  //   //     <div style={{ margin: "10% 12% 10% 12%" }}>
  //   //       <Fade bottom delay={200}>
  //   //           <div className="d-content-center d-black d-text-60 mb-10" dangerouslySetInnerHTML={{__html:t("home.How eSTOOK.immo work ?")}}>
  //   //           </div>
              
  //   //           <Row>
  //   //             <Col md={7} style={{paddingRight:0}}><img src="/imgs/home/7/1.png"></img></Col>
  //   //             <Col md={5} className="d-text-32">
  //   //               <AccordianComp/>
  //   //             </Col>
  //   //           </Row>
  //   //       </Fade>
  //   //     </div>
  //   //   </div>
  //   // </Fade>
  // }
  renderHome10() {
    const { t, backMode } = this.props
    return <Fade>
      <div className="img-box gradient">
        <div style={{ margin: "5% 12% 5% 12%" }}>
          <Fade bottom delay={200}>
            <div>
              <div className="d-content-center">
              <Link to={'/home'}><img className="img-mobile" src="/image/home/logo.png" alt="Logo"/></Link>
              </div>
              <div className="d-content-center d-font-bold d-text-60" style={{color:"#173039"}}>
                {t("home.Interested in Updates?")}
              </div>
              <div className="d-content-center d-white d-font-bold d-text-30">
                {t("home.eSTOKK Newsletter")}
              </div>
              <div className="d-content-center d-white d-font-bold d-text-18">
                {t("home.Fractional, liquid real estate investing.")}
              </div>
              <div style={{ height: 24 }} />
              <Form style={{ margin: "0 12% 0 12%" }}>
                <Form.Group as={Row} style={{ alignItems: 'center' }}>
                  <Form.Label column sm={4} style={{ marginTop: 24 }}>
                    <div className="d-content-center d-white d-font-black d-text-48">
                      {t("home.Stay in Touch With Us.")}
                    </div>
                  </Form.Label>
                  <Col sm={2} style={{ marginTop: 24 }}> 
                    <Form.Control type="firstname" placeholder={t("home.First Name")} style={{ height: 45 }} onChange={this.onChange}/>
                  </Col>
                  <Col sm={3} style={{ marginTop: 24 }}> 
                    <Form.Control type="email" placeholder={t("home.Email Address")} style={{ height: 45 }} onChange={this.onChange}/>
                  </Col>
                  <Col sm={3} style={{ marginTop: 24 }}>
                    <Button className="d-font-black d-back-highlight-button d-text-18 btn-borrow1" onClick={this.onSubmit}
                      style={{height: 45, width: '100%', minWidth: 200 }}>{t("home.Newsletter SIGN UP")}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  }

  renderHome8() {
    const { t, backMode } = this.props
    return <Fade>
      <div style={{height:50, backgroundColor:backMode=="light"? "#F0EEEB":"#ffffff"}}></div>
      <div className="img-box img-box-home8" style={{backgroundImage:backMode=="light"?"url(" + Home8LIGHT +")" :"url(" + Home8 +")"}}>
          <div style={{marginLeft:"48%"}}>
            <Fade bottom delay={200}>
              <div className="d-white  d-text-90 home8-tag" style={{paddingLeft:"15%", paddingBottom:"7%", paddingTop:"10%"}} dangerouslySetInnerHTML={{__html:t("home.Ready to start investing")}}>
                
              </div> 
              <Link to={'/marketplace'}>
                <Button className=" d-text-30 btn btn-borrow home-footer" style={{ backgroundColor:"#0c1720 !important" ,width:"32%",marginLeft:15, color:"black", height:50, marginBottom:100, fontFamily:"Montserrat-Regular"}}>{t("home.Browse Properties")}</Button>
              </Link>
            </Fade>
          </div>
      </div>
    </Fade>
  }

  renderHome9() {

    const { t, backMode } = this.props
    return <Fade >
      <div className="img-box" id="schedule_call" style={{ backgroundColor:backMode=="light"?"#E2E0DE":"#ffffff" }}>
        <div style={{ margin: "10% 10%" }}>
          <Fade bottom delay={200}>
            <div className="d-font-black d-text-82 text-center" style={{fontColr:'#173039'}}>
              {t("home.Why Choose Real Estate in Investment")}
            </div>
            <div className="d-white d-font-book d-text-20" style={{marginTop: '3%', lineHeight: 1.3}}>
                <span className="d-font-circular text-bold mt-10  color-blue" style={{fontSize: '30px'}}>Consistent Income:</span><br/>
                <span className=' d-font-circular color-black' style={{fontSize: '30px'}}>Real estate stands as an asset class renowned for its reliable income and minimal fluctuations.</span><br/><br/>
                <span className="d-font-circular text-bold mt-10  color-blue" style={{fontSize: '30px'}}>Time-Test Excellent:</span><br/>
                <span className=' d-font-circular color-black' style={{fontSize: '30px'}}>Over the years, real estate has consistently proven itself as the prime avenue for wealth accumulation.</span><br/><br/>
                <span className="d-font-circular text-bold mt-10  color-blue" style={{fontSize: '30px'}}>Recurring Revenue:</span><br/>
                <span className=' d-font-circular color-black' style={{fontSize: '30px'}}>With real estate, passive icome flows in through rent, providing a consistent financial stream..</span><br/><br/>
                <span className="d-font-circular text-bold mt-10  color-blue" style={{fontSize: '30px'}}>Enduring Stability:</span><br/>
                <span className=' d-font-circular color-black' style={{fontSize: '30px'}}>Real estate prices show greater resilience compared to stocks and other financial assets, ensuring long-term reliabilty.</span><br/><br/>
                <span className="d-font-circular text-bold mt-10  color-blue" style={{fontSize: '30px'}}>Residential Resonance:</span><br/>
                <span className=' d-font-circular color-black' style={{fontSize: '30px'}}>The significance of housing has surged in the wake of Covid-19, making real estate investment more pertinent ever.</span>
            </div>
            <div style={{ height: 50 }}></div>
            <div>
              <Link to={'/my-account'}>
                  <Button className="d-text-24 home-footer button-center" variant="default" style={{width:"12vw", color:"#22847f", backgroundColor:"#173039", borderRadius:0,}}>{t("home.START NOW")}</Button>
              </Link>
            </div>
          </Fade>
        </div>
      </div>
      
    </Fade>
  }

  // renderHome11() {

  //   const { t, backMode } = this.props
  //   return <Fade >
  //     <div style={{height:50, backgroundColor:"#fff"}}></div>
  //     <div style={{height:50, backgroundColor:"#DBA87E"}}></div>
  //     <div className="img-box" style={{backgroundColor:backMode=="light"?"#fff":"#2e2e2e"}}>
  //       <div style={{ margin: "5% 10% 5% 0%" }}>
  //         <Row>
  //           <Col md={4}>
  //             <div style={{marginLeft:"30%", marginBottom:55,}}>
  //               <div className="d-font-black d-text-72" style={{color:"#DBA87E"}}>
  //                 {t("home.FAQ")}
  //               </div>
  //               <div className="d-white d-font-black d-text-48" dangerouslySetInnerHTML={{__html:t("home.Your most frequently asked questions")}}>
          
  //               </div>
  //               <div className="d-font-black d-text-20" style={{color:"#DBA87E", marginTop:12, fontFamily:"Montserrat-Regular"}} dangerouslySetInnerHTML={{__html:t("home.we rely on")}}>
          
  //               </div>
  //             </div>
              
  //             <img src="/imgs/home/11/1.png"></img>
  //           </Col>
  //           <Col md={7}>
  //             <div style={{marginLeft:"5%", marginBottom:55, marginTop:"7%"}}>
  //               <FaqComp backMode={backMode}/>
  //             </div>
  //           </Col>
  //         </Row>
  //       </div>
  //     </div>
      
  //   </Fade>
  // }

  render() {
    return (
      <div style={{fontFamily:"Montserrat-Bold"}}>
        {this.renderHome1()}
        {this.renderHome2()}
        {this.renderHome4()}
        {<Home3 />}
        
        {this.renderHome5()}
        {this.renderHome6()}
        {/* {this.renderHome7()} */}
        {this.renderHome8()}
        {this.renderHome9()}
        {this.renderHome10()}

        {/* {this.renderHome11()} */}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const {  backMode } = state.auth
  return {
    backMode
  }
}
export default withTranslation()(connect(mapStateToProps, null)(Home));