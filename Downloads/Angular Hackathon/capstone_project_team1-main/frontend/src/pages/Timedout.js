import React from 'react'
import '../css/Timedout.css';
import { Row, Col } from 'react-bootstrap';
import OneLineFooter from '../components/OneLineFooter';
import HeaderTop from '../components/HeaderTop';
import { Helmet } from 'react-helmet';
export default function Timedout() {
  return (
    <div className='Container'>
        <Helmet>
            <title>Session Timed out</title>
        </Helmet>
        <HeaderTop/>
        <div className='st1'>
            <div>
                <img src="https://www.natwest.com/content/dam/championlogos/Natwest_Secondary_Horizontal_RGB_NEG.svg" alt="NatWest logo" height={100} className='pb-4'/>
            </div>
            <div>
                <h1>Sorry, you've timed out</h1>
            </div>
        </div>
        <div className='st2' >
            <Row >
                <Col xs={12} sm={8} className='st3'>
                   <h2>what's next?</h2>
                   <p>For your own security, we've closed your application in case you've moved away from your device.<br/><br/>
                   we've not saved any details so if you'd like to start again, you'll need to start from the beginning.</p>
                   <a href="/login" className='btn btn-primary'>Start again</a>
                </Col>
                <Col xs={12} sm={4}></Col>
            </Row>
            
        </div>
        <OneLineFooter/>
    </div>
  )
}
