import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import  Card  from './Card';
import { axiosGet } from '../../../services/axios';

import '../faq.css';
// import faqs from '../faq.json'



function Overview() {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        axiosGet("/api/faq/list").then((response) => {
            let result = response.data
            setArticles(result.categories);
        })
    }, []);
    return (
        <Container>
            <Row>          
            {articles.map(article => {
                return (
                <Col 
                    className="faq-box"   
                    key={article.id} md={4} sm={6} xs={12}>
                    <Card
                    id={article.id}
                    title={article.title}
                    number={article.number}
                    desc={article.desc}
                    image={article.image}
                    />
                </Col>
                )
            })}
            </Row>
        </Container>
    )
}

export default Overview;