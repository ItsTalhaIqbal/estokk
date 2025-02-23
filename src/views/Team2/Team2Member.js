
import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

import { Link } from'react-router-dom';

import desc from './content.json'

class Team2Member extends Component {

  render() {
    let img = this.props.img;
    let name = this.props.name;
    let job = this.props.job;
    let content = desc.content;
    let delay = this.props.delay;
    let socialStr = this.props.content;
    let social = socialStr.split(',');
    // let socialLink ;

    // if(social.length !== 0) {
    //   social.map(item => {
    //     item = 'in'
    //   })
    // }

    return (
      <Fade delay={delay}>
        <div style={{margin: 30, marginLeft:"5%", marginright:"5%"}}>
          <Image width="100%" src={img} alt="Team1Member"/>
          <div style={{height:10, backgroundColor:"#0cc1cb"}}/>
          <div style={{height: 24}} />
          <div className="d-highlight d-text-40 d-content-center d-font-mont-bold" style={{ letterSpacing:"10px", lineHeight:2}}>
            {name}
          </div>
          <div className="text-black d-text-30 d-content-center d-font-mont-bold" style={{letterSpacing:"2px", lineHeight:2}}>
            {job}
          </div>
          <div className='text-black d-text-26 d-font-mont-regular mt-3' style={{textAlign:"justify", letterSpacing:"2px", lineHeight:2}}>
            {content}
          </div>
          <div className="d-content-center d-text-30" style={{color:"#786E64", marginTop:"5%"}}>            
            {social.map(item => {
              item = item.trim();
              let url = `image/Team/${item}.png`;
              let socialLink = (item === 'in') ? 'https://www.instagram.com/':(
                (item === 'f')? 'https://www.facebook.com/':'https://www.twitter.com/'
              ) 
              return(
                  <a href={socialLink} target="_blank" rel="noopener noreferrer" style={{color:"#786E64"}}>
                    <img src={url} className="d-highlight mr-5" alt="..." /> 
                  </a>       
                  )
              })}
            </div>        
        </div> 
      </Fade>
    )
  }
}

export default Team2Member;
