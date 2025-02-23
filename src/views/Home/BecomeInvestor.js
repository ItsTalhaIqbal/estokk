
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

class BecomeInvestor extends Component {

  render() {
    let img = this.props.img;
    let title = this.props.title;
    let description = this.props.description;
    let delay = this.props.delay;
    const backMode = this.props.backMode;
    return (
        <Fade delay={delay}>
          <div className="d-content-center becomeInvestorDiv" style={{marginTop: 30, position:"relative", marginBottom:50}}>
              <img src="/image/home/quote.png" className="becomeInventor margin_5" alt="BecomeInvestor" />
            <div className="paddingtop"/>
            <img src={backMode=="light"?"/imgs/home/6/check_light.png":"/image/home/check.png"} alt="BecomeInvestor" style={{width:"12%", height:"12%"}}/>
           
            <div className="d-highlight d-text-50" dangerouslySetInnerHTML={{__html:title}}>
            </div>
            <div style={{padding: '2%', fontFamily:"Montserrat-Regular"}} />
            <div className="d-gray d-text-18" dangerouslySetInnerHTML={{__html:description}}>
            </div>
          </div>
        </Fade>
    )
  }
}

export default BecomeInvestor;
