import React from 'react';
import { Link } from 'react-router-dom';
import '../faq.css';

function Card(props) {
    return (
        <Link
            className="link-style"         
            to={`/faq/${props.id}`}
        >         
            <div className="image-space">
                <img src={`image/faq/${props.image}`} alt="..."/>            
            </div>
            <div className="mt-4">
                <h5>{props.title}</h5>
            </div>
            <div className="mt-4 pl-16 pr-16" style={{color: 'black'}}>
                {props.desc}
            </div>
            <div className="mt-4">
                {`${props.number} artiles`}
            </div>
        </Link>
        
    )
}
export default Card;