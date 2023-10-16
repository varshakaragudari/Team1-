import '../css/home.css'
import { Accordion } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import safe from '../images/safe.svg'
import customise from '../images/customise.svg'
import clockDream from '../images/clock-dream.svg'
import withdraw from '../images/withdraw.svg'
import taptopay from '../images/tap-to-pay-iphone-champion-purple.jpg'
import HeaderTop from '../components/HeaderTop'
import { useState } from 'react'

export default function Home() {
    const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  return (
    <>
        <Helmet>
          <title>Save while you spend with round up savings</title>
        </Helmet>
        <HeaderTop/>
        <div>
            <div className='light-purple-bg-container'>
                <div className="d-flex flex-md-row-reverse flex-wrap">
                    <div className="col col-md-4 d-flex flex-row-reverse">
                            <div className='d-flex align-items-right' style={{position: 'relative'}}>
                                <img className='zi-1 header-image' src={require('../images/coin-jar.jpg')} alt='coin jar' height={350}/>
                            </div>
                    </div>
                    <div class="col col-md-8 d-flex flex-column justify-content-center p-4">
                            <h1 className='knile-regular-font top-text zi-1'>Savings while you spend with RoundUp</h1>
                            <div className='d-flex justify-content-start'>
                                {
                                    !userData && <a href="/register" className="natwest-button zi-1">Start savings now</a>
                                }
                                {
                                    userData && <a href="/banking" className="natwest-button zi-1">Open banking dashboard</a>
                                }
                            </div>
                    </div>  
                </div>
            </div>
            <div className='ellipsis-bottom'></div>
            <div className='d-flex justify-content-center container flex-column'>
                <div className='row rounded bg-white m-auto'>
                    <img className='col col-md-5 p-0 m-0 tap-pay-image-banner' src={taptopay} height={250} alt='tap to pay banner'/>
                    <div className='col col-md-7 d-flex flex-column justify-content-center p-4'>
                        <h2 className='h2-regular'>Pay and save penny</h2>
                        <p>Spend using debit card and store nearest round up amount to your instant access savings account.</p>
                        <br/>
                        <div><a href='#' className='natwest-button max-w-fit'>Learn more</a></div>
                    </div>
                </div>
                <br/><br/>
                <h2 className='txt-align-center'>Plan your savings without pressurizing the current balance</h2><br/>
            </div>
            <div className='white-bg-container d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-wrap mw-1024'>
                    <div className='regular-txt-card'>
                        <div className='icon'>
                            <img src={safe} height={150}/>
                        </div>
                        <h3>Boost your savings with penny way of savings</h3>
                        <ul>
                                <li>Control of saving amount</li>
                                <li>Save in flexible amount or amount set by you on each spendings</li>
                        </ul>
                    </div>
                    <div className='regular-txt-card'>
                        <div className='icon'>
                            <img src={customise} height={150} alt="customise icon"/>
                        </div>
                        <h3>Customise the savings plan the way you want</h3>
                        <ul>
                                <li>Easy penny jar setup for your dreams or goals with lock in period</li>
                                <li>Donate to charitable organisations option</li>
                        </ul>
                    </div>
                    <div className='regular-txt-card'>
                        <div className='icon'>
                            <img src={clockDream} height={150} alt='clock icon'/>
                        </div>
                        
                        <h3>Dream planning can be more relaxing</h3>
                        <ul>
                                <li>Automatic deposits of amount in dream plan</li>
                                <li>Get relevant interest per annum</li>
                        </ul>
                    </div>
                    <div className='regular-txt-card'>
                        <div className='icon'>
                            <img src={withdraw} height={150} alt='withdraw icon'/>
                        </div>
                        <h3>Withdraw at anytime you want</h3>
                        <ul>
                            <li>Instant access to the funds</li>
                            <li>No any charges on any 3 daily transactions</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center city-bg'>
                <div className='d-flex justify-content-center align-items-center box-container-rounded'>
                    <div className='d-flex flex-column'>
                        <h2>Sounds good? setup now</h2>
                        <p className='txt-align-center'>No worry if you don't have an account now, open in minutes</p>
                        <div className='d-flex justify-content-center flex-wrap'>
                            <a href="/register" className="natwest-button m-2">Open new account</a>
                            <a href="/login" className="natwest-button m-2">Setup</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center white-bg-container'>
                <div className='d-flex flex-column'>
                    <h2 className='txt-align-center'>Learn about Round Up savings feature</h2><br/>
                    <div className='d-flex justify-content-center'>
                        <a href="helpproduct" className="natwest-button">Learn more</a>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <h2>Latest articles</h2>
                <div class="d-flex justify-content-start flex-wrap article-box">
                    <a className="card m-1 rounded link-body-emphasis text-decoration-none border-0">
                            <img src="https://source.unsplash.com/300x300/?bank,online" alt="bank" height="300"/><br/>
                            <div class="p-2">
                                <h6 class="mb-0">Creating online banking account</h6>
                                <small class="text-body-secondary">4 min read</small><br/>
                            </div>
                    </a>
                    <a className="card m-1 rounded link-body-emphasis text-decoration-none border-0">
                            <img src="https://source.unsplash.com/300x300/?bank,savings" alt="bank" height="300"/><br/>
                            <div class="p-2">
                                <h6 class="mb-0">Opening an instant access savings account</h6>
                                <small class="text-body-secondary">4 min read</small><br/>
                            </div>
                    </a>
                    <a className="card m-1 rounded link-body-emphasis text-decoration-none border-0">
                            <img src="https://source.unsplash.com/300x300/?bank" alt="bank" height="300"/><br/>
                            <div class="p-2">
                                <h6 class="mb-0">Setting up round up feature</h6>
                                <small class="text-body-secondary">4 min read</small><br/>
                            </div>
                    </a>
                    <a className="card m-1 rounded link-body-emphasis text-decoration-none border-0">
                            <img src="https://source.unsplash.com/300x300/?bank,cash" alt="bank" height="300"/><br/>
                            <div class="p-2">
                                <h6 class="mb-0">Coin Jar Features</h6>
                                <small class="text-body-secondary">4 min read</small><br/>
                            </div>
                    </a>
                </div>
            </div>
            <div className='p-4'>
                <h2>Common questions</h2>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Do I need both current and savings account?</Accordion.Header>
                        <Accordion.Body>
                            Yes
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Will I get any interest on that?</Accordion.Header>
                        <Accordion.Body>
                            Yes, 4.0% per annum with terms & conditions apply
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Is there any charges to use round up feature?</Accordion.Header>
                        <Accordion.Body>
                            No
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>What are the extra benefits I can avail?</Accordion.Header>
                        <Accordion.Body>
                            You can withdraw instantly.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <Footer/>
        </div>
    </>
  )
}
