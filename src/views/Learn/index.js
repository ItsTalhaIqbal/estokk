import React, { useEffect } from 'react';
import { Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom"

export default function Learn() {

  const { t } = useTranslation();

  const docs = [
    {label: t("Learn.ppm"), content: t("Learn.content"), eventKey: "0"},
    {label: t("Learn.PPM Supplement"), content: t("Learn.content"), eventKey: "1"},
    {label: t("Learn.Series Designation"), content: t("Learn.content"), eventKey: "2"},
    {label: t("Learn.Subscraption	 Agreement (Generic)"), content: t("Learn.content"), eventKey: "3"},
  ]
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])

  const sitesettings = useSelector(state => state.sitesettings.sitesettingsData);

  
    return (
      <div style={{backgroundColor:"#fff"}}>
        <Fade bottom>
            <div style={{padding: "10% 20%", backgroundColor:"#2E2E2E"}} className='img-box img-box-learn'>
              <video width="100%" controls>
                <source src={sitesettings?.[0]?.videoLink?sitesettings?.[0]?.videoLink:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4"></source>
              </video>
            </div>
          <div style={{margin: "6% 12% 0% 12%", }}>
            
            <Row>
              <Col md="1"></Col>
              <Col md="4">
                <div className="d-highlight d-font-bold d-text-56 text-center color-black">
                  {t("Learn.Introduction to eSTOOK")}
                </div>
                <div className="d-font-book d-text-32 mt-3">
                  {t("Learn.desc-1")}
                </div>
                <div style={{paddingTop: '12%'}} />
                <Link to="/faq">
                  <Button className="d-font-book d-text-32 btn-blue" style={{width: '70%', padding: '2% 0', marginLeft:"15%"}}>
                    {t("Learn.READ MORE")}
                  </Button>
                </Link>
 
              </Col>
              <Col md="2"></Col>
              <Col md="4">
                <div className="d-highlight d-font-bold d-text-56 text-center color-black">
                  {t("Learn.Download Whitepaper")}
                </div>
                <div className="d-font-book d-text-32 mt-3">
                  {t("Learn.desc-2")}
                </div>
                <div style={{paddingTop: '12%'}} />
                <Link to="/how-it-works">
                  <Button className="d-font-book d-text-32 btn-blue" style={{width: '70%', padding: '2% 0', marginLeft:"15%"}}>
                    {t("Learn.DOWNLOAD WHITEPAPER")}
                  </Button>
                </Link>

              </Col>
              <Col md="1"></Col>
              {/* <Col md="4">
                <div className="d-highlight d-font-bold d-text-56 text-center">
                  {t("Learn.Learning Center")}
                </div>
                <div className="d-font-book d-text-32 mt-3">
                  {t("Learn.desc-2")}
                </div>
                <div style={{paddingTop: '12%'}} />
                <Button className="d-font-book d-text-32" style={{width: '70%', padding: '2% 0', marginLeft:"15%"}}>
                  {t("Learn.Learning Center")}
                </Button>
              </Col> */}
            </Row>
            <div className="d-highlight d-font-bold d-text-56 text-blue" style={{paddingTop: '12%'}}>
              {t("Learn.Our Documentation")}
            </div>
            <div className="d-font-book d-text-32">
              {t("Learn.desc-3")}
            </div>
            <Accordion style={{paddingTop: '6%'}}>
              {
                docs.map((item, i) => {
                  return <Card style={{border: '0px solid', backgroundColor: 'transparent', paddingBottom: 12}} key={i}>
                    <Accordion.Toggle as={Card.Header} eventKey={item.eventKey} className="bg-blue text-white d-font-bold d-text-32 d-flex justify-content-between">
                      {item.label}
                      <i className="fa fa-caret-down d-text-56"></i>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={item.eventKey}>
                      <Card.Body className="d-font-book d-text-24" style={{padding: 24}}>
                        {item.content}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                })
              }
            </Accordion>
          </div>
        </Fade>
      </div>
    )
  
}

