import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../faq.css';
// import article from '../content.json'

function Article(props) {
    const description = props.content;
    return (
        <Container>
            <div className='direct-style'>
                <Link
                    className="link-style-1"
                    to={`/faq`}
                >
                    {`All Collections > `}
                </Link>
                <Link
                    className="link-style-1"
                    to={`/faq/${props.upTitleId}`}
                >
                    {`${props.upTitle} > `}
                </Link>
                <Link
                    className="link-style-1"
                    to="#"
                >
                    {`${props.title}`}
                </Link>
            </div>
            <div className='mt-5'>
                <h1 className='title-style'>{props.title}</h1>
            </div>
            <div className="date-style">
                Update over a week ago
            </div>
            <div dangerouslySetInnerHTML={{__html:description}} className='des-style'>
            </div>
            <div className='answer-style'>
                <div className='ques-style'>Did this answer your questions</div>
                <div className="emoji-style ">😔 😐 😀</div>
            </div>
        </Container>
    )
}

export default Article;