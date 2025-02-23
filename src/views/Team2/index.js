import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Fade from 'react-reveal/Fade';
import Team2Member from './Team2Member'
import { actionTeamList } from "../../redux/actions/team";
import { useTranslation } from "react-i18next";

const Team2 = () => {

    const dispatch = useDispatch();

    const teams = useSelector(state => state.team.teamData);
    const { t } = useTranslation();

    console.log(teams);

    useEffect(() => {
        dispatch(actionTeamList());
    }, []);



    return (
        <div style={{backgroundColor:"#fff"}}>
            <Fade>
                <div className="img-box img-box-team">
                    <Fade bottom delay={200}>
                        <div style={{ margin: "17% 12% 8% 12%" }}>
                            <div className="col-md-6">
                                <div className="d-white d-font-black d-text-90">
                                    About Us
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
                <div className='d-highlight text-center d-text-72 d-font-black' style={{marginTop: "5%"}}>
                    <p>WHO ARE WE:</p>
                </div>
                <div className='text-center d-text-30 d-font-book text-black' style={{paddingLeft: "10%", paddingRight:"10%"}}>
                    <p>eSTOOK is family project that started with the idea to democratize real estate ownership. Our Team is an association of Real-Estate professionals, technology and blockchain expert.</p>
                </div>
                <div className='d-highlight text-center d-text-72 d-font-black' style={{marginTop: "5%"}}>
                    <p>OUR GOAL:</p>
                </div>
                <div className='text-center d-text-30 d-font-book text-black' style={{paddingLeft: "10%", paddingRight:"10%"}}>
                    <p>Revolutionize real estate ownership while offering a possibility to all walletes to grow a real estate portfolio.</p>
                </div>
                <div className='d-highlight text-center d-text-72 d-font-black' style={{marginTop: "5%"}}>
                    <p>OUR ANSWER:</p>
                </div>
                <div className='text-center d-text-30 d-font-book text-black' style={{paddingLeft: "10%", paddingRight:"10%"}}>
                    <p>A platform that facilitates the tokenization of real estate properties, allowing for fractional ownership and investment in real estate through blockchain technology for alll kind of wallets.</p>
                </div>
                <div className='text-center d-text-72 d-font-black' style={{marginTop: "5%", color: "#173039"}}>
                    <p>Meet Our Team:</p>
                </div>
                <div className='text-center d-text-30 d-font-book text-black' style={{paddingLeft: "10%", paddingRight:"10%"}}>
                    <p>eSTOOK.immo is a union of seasoned real estate and blockchain industry executives, along with marketing, ecomerce and technology experts. Together, we are executing our collective vision to create a new real estate ownership experience.</p>
                </div>
            </Fade>
            <div style={{ padding: "8% 25%" }}>
                <Row>
                    {
                        teams.map((team, key) =>
                            <Col md="6">
                                <Team2Member
                                    img={`${process.env.REACT_APP_API_ENDPOINT}/public/${team.avatar}`}
                                    name={team.name}
                                    job={team.job}
                                    content={team.content}
                                    delay={400}
                                />
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
    )
}

export default Team2;
