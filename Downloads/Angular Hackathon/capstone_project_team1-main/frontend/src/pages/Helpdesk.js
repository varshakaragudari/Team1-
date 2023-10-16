import React from 'react'
import { Link} from 'react-router-dom';
import '../css/Helpdesk.css';
import SimpleForm from './chatbox/SimpleForm';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import feedbackicon from '../images/feedback.svg';
import exploreicon from '../images/knowledge-base.svg';
import questionicon from '../images/question.svg';
import { Helmet } from 'react-helmet';

export default function Helpdesk() {
  return (
    <div>
      <Helmet>
            <title>Helpdesk - Support, FAQs, Knowledge base</title>
      </Helmet>
        <HeaderTop/>
        <nav aria-label="breadcrumb" className='p-2'>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Helpdesk</li>
          </ol>
        </nav>
        <div className='row'>
            <Link className='col-sm box text-decoration-none' to={"/helpdesk/faqs"}>
              <div>
                <img alt="faqs icon" src={questionicon} height={150}/>
              </div>
              <div className='NavLinkStyle '>
                Frequently asked questions
              </div>
            </Link>
            <Link className='col-sm box text-decoration-none' to={"/helpdesk/knowledge-base"}>
              <div>
                <img src={exploreicon} alt="helping with product illustration" height={150}/>
              </div>
              <div className='NavLinkStyle '>
              Knowledge base
              </div>
            </Link>
            <Link className='col-sm box text-decoration-none' to={"/helpdesk/feedback"}>
              <div>
                <img src={feedbackicon} alt="Feedback illustration" height={150}/>
              </div>
              <div className='NavLinkStyle '>
                Feedback
              </div>
            </Link>
        </div>
        <div className='hh1 vw-100 txt-align-center'>
            <h1>Introducing Cora</h1>
        </div>
        <div className='hh1content p-4'>
                <div>
                    <p>Meet Cora, your digital assistant. Available 24/7 to support you with questions about day-to-day banking. Get an instant answer and be shown how to do things like make a payment, manage direct debits and find recent transactions.</p><br />
                    <a className='natwest-button max-w-fit' href='#'>Learn more about Cora</a>
                </div>
                <div >
                    <img src="https://platinmods.com/attachments/temp-number-v1-8-0-mod_sanet-st-144x144-png-png.442911/" alt="phone with message illustration" />
                </div>
        </div>
        <div className='m-4'>
          <h2 className='prim-colr'>Need more help?</h2>
          <label>Type your question here. Search results will open in new tab.</label>
          <div className='input-group w-100 mb-4'>
            <input className='form-control' type='text' aria-describedby="basic-addon1"/>
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">🔍</span>
            </div>
          </div>
        </div>
        <SimpleForm />
        <Footer/>
    </div>
  )
}
