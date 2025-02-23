import React, { Component } from 'react';
import { Row, Col, Tab, Nav, Container,  Form,  FormControl,  InputGroup, } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { withTranslation } from 'react-i18next';
import  Card  from './Card';

import '../faq.css';
import faqs from '../faq.json'

function FaqHeader() {
    return (
        <Fade>
          <div className="img-box img-box-faq" style={{marginBottom: "80px"}}>
            <Fade bottom delay={200}>
            <div style={{ margin: "15% 5% 5% 12%" }}>
              <div className="col-md-11">
                <div className="d-white d-font-black d-text-78">
                  <span className='d-text-82'>eSTOKK Help & FAQ:</span><span className='d-text-60'>navigating Real Estate Tokenization and Rental Icome Insights</span>
                </div>
                <div className='d-white d-text-18' style={{marginTop: "5%"}}>
                <Form className="d-flex">
                  <InputGroup>
                    <InputGroup.Text className="search-style">                      
                      <i className='fa fa-search'></i>
                    </InputGroup.Text>
                    <FormControl type="search" className="search-style box-style" placeholder="Search for articles..." />
                  </InputGroup>
                  
                </Form>
                </div>
              </div>
            </div>
            </Fade>
          </div>
        </Fade>
    )
}

export default FaqHeader;