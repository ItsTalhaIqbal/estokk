import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../faq.css';

function SubMenu(props) {  
    return (
        <Container>
            <div className='direct-style'>
                <Link
                    className="link-style-1"
                    to={`/faq`}
                >
                    {"All Collections >"}
                </Link>
                <Link
                    className="link-style-1"
                    to="#"
                >
                {`${props.title}`}
                </Link>                
            </div>
            <div className="mt-5">
            <img src={`image/faq/${props.image}`} alt="..."/>
            </div>
            <div className='mt-5'>
                <h2 className='title-style'>{props.title}</h2>
            </div>
            <div className='mt-2 sub-title'>
                {props.desc}
            </div>
            <div className='mt-2 article-number'>
                {`${props.number} articles`}
            </div>
            <div className='article-box pl-16 pb-10'>
                {props.subtitle.map((item, index) => {
                    return(
                        <Link
                            key={index}
                            to={`/faq/${props.id}/${index+1}`}
                            style={{color: "black"}}                 
                        >
                            <Row className='row-style'>
                                <Col md={8} style={{float: "left"}}>
                                    {item.smallTitle}
                                </Col> 
                                <Col me={1}></Col>                           
                                <Col md={1} style={{marginLeft:"80px"}}>
                                    <img src="image/faq/arrow.png" alt="..." />
                                </Col>
                            </Row>
                            
                        </Link> 
                    )                                     
                })}
            </div>
        </Container>
    )
}

export default SubMenu;