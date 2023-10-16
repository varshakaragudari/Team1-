import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import image from '../images/image.png';
import '../css/Footer.css';
import useWindowSize from '../pages/UseWindowSize';

export default function Footer() {
    //const size = useWindowSize(); 

    return (
        <div className='light-purple-bg-container'>
            <div className="clear"></div>
            <div className='footerContainer2'>
                <div className='di1'>
                    <Row className='rw1'>
                        <Col xs={6} md={3}>
                            <div className='rw1col1'>
                                <div loading="lazy" className='abc1'><img src={image} alt="natwest logo" style={{maxHeight:'50px',maxWidth:'auto'}}/></div>
                                <div className='abc1'><h5>NatWest</h5></div>
                                <div className='abc1'>
                                    <img loading="lazy" src="https://www.seekpng.com/png/full/152-1521509_linkedin-icon-linked-in-logo-white-png.png" alt="linkedin logo" style={{maxHeight:'30px',maxWidth:'auto',marginRight:'10px'}}/> 
                                    <img loading="lazy" src="https://www.seekpng.com/png/full/1-19750_instagram-white-logo-instagram-logo-png-white-outline.png" alt="instagram logo" style={{maxHeight:'30px',maxWidth:'auto'}}/>
                                </div>
                                <div className='abc1'><h5>Get the app</h5></div>
                                
                                <div className='abc1'><img loading="lazy" src="https://icon-library.com/images/google-play-download-icon/google-play-download-icon-0.jpg" alt="google play download icon" style={{maxHeight:'40px',maxWidth:'auto'}}/></div>
                                <div className='abc1'><img loading="lazy" src="https://icon-library.com/images/google-play-download-icon/google-play-download-icon-9.jpg" alt="apple store download icon" style={{maxHeight:'40px',maxWidth:'auto'}} /></div>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div className='rw1col2'>
                                <h5>Products</h5>
                                <a className='text-decoration-none text-light' href="#">Bank Accounts</a><br/>
                                <a className='text-decoration-none text-light' href="#">Savings</a><br/>
                                <a className='text-decoration-none text-light' href="#">Investments</a><br/>
                                <a className='text-decoration-none text-light' href="#">Credit cards</a><br/>
                                <a className='text-decoration-none text-light' href="#">Loans</a><br/>
                                <a className='text-decoration-none text-light' href="#">Insurance</a><br/>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div className='rw1col2'>
                                <h5>Help and support</h5>
                                <a className='text-decoration-none text-light' href="/helpdesk/faqs">Frequently asked questions</a><br/>
                                <a className='text-decoration-none text-light' href="/helpdesk/knowledge-base">Help product</a><br/>
                                <a className='text-decoration-none text-light' href="/helpdesk/feedback">Feedback</a><br/>
                                <a className='text-decoration-none text-light' href="#">Security</a><br/>
                                <a className='text-decoration-none text-light' href="#">Service Status</a><br/>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div className='rw1col3'>
                                <h5>Contact Us</h5>
                                <p>Registered Office: 36 St Andrew Square, Edinburgh, United Kingdom, EH2 2YB.</p>
                                <p>General enquires: 03457 888 444</p>
                                <p>General enquires Overseas: +44 3457 888 444</p>
                                <p>General enquires Relay UK: 18001 03457 888 444</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='d-flex justify-content-center vw-100 m-2'>
                    <div className='d-flex justify-content-center bt-white'> 
                        <Row>
                            <Col xs={6} sm={6} md={2} ><a className='bt1p text-decoration-none' href='#'>Privacy and Cookies</a></Col>
                            <Col xs={6} sm={6} md={2}><a className='bt1p text-decoration-none' href='#'>Website TnC</a></Col>
                            <Col xs={6} sm={6} md={1} ><a className='bt1p text-decoration-none' href='#'>Accessibility</a></Col>
                            <Col xs={6} sm={6} md={1} ><a className='bt1p text-decoration-none' href='#'>Careers</a></Col>
                            <Col xs={6} sm={6} md={2} ><a className='bt1p text-decoration-none' href='/sitemap'>Sitemap</a></Col>
                            <Col xs={6} sm={6} md={1} ><a className='bt1p text-decoration-none' href='#'>Slavery act</a></Col>
                            <Col xs={12} sm={12} md={3} ><a className='bt1p text-decoration-none' href='#'>Copyright © National Westminster Bank plc 2023</a></Col>
                        </Row>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
