import React,{useState} from 'react'
import '../css/Faqs.css';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function Faqs() {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [isVisible5, setIsVisible5] = useState(false);
    const [isVisible6, setIsVisible6] = useState(false);
    const [isVisible7, setIsVisible7] = useState(false);
    const [isVisible8, setIsVisible8] = useState(false);
    const [isVisible9, setIsVisible9] = useState(false);
    const [isVisible10, setIsVisible10] = useState(false);

  // Step 3: Create a function to toggle the state variable
  const toggleVisibility1 = () => {
    setIsVisible1(!isVisible1);
  };
  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };
  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };
  const toggleVisibility4 = () => {
    setIsVisible4(!isVisible4);
  };
  const toggleVisibility5 = () => {
    setIsVisible5(!isVisible5);
  };
  const toggleVisibility6 = () => {
    setIsVisible6(!isVisible6);
  };
  const toggleVisibility7 = () => {
    setIsVisible7(!isVisible7);
  };
  const toggleVisibility8 = () => {
    setIsVisible8(!isVisible8);
  };
  const toggleVisibility9 = () => {
    setIsVisible9(!isVisible9);
  };
  const toggleVisibility10 = () => {
    setIsVisible10(!isVisible10);
  };
  return (
    <div className='Container' id="faqs">
      <Helmet>
            <title>Frequently asked questions - Helpdesk</title>
      </Helmet>
        <HeaderTop/>
        <nav aria-label="breadcrumb" className='p-2'>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
            <li className="breadcrumb-item"><a href="/helpdesk" className='prim-colr'>Helpdesk</a></li>
            <li className="breadcrumb-item active" aria-current="page">FAQs</li>
          </ol>
        </nav>
        <div>
            <Row className='roww2 p-0 m-0'>
                <Col xs={12} sm={8} className='coll2'>
                    <h1>Frequently asked questions</h1>
                </Col>
                <Col xs={12} sm={4} className='coll2'>
                    <img src="https://play-lh.googleusercontent.com/rNr-LoIOHWwdaGMWMi0O2CBAkUjoOrottVLiqew5lb87P2yH1VMsM_qVyYnb0ISw0or9" alt="question mark illustration" />
                </Col>
            </Row>
        </div>
        <div className='abcde'>
            <Row style={{paddingLeft:'0px',paddingRight:'0px'}}>
                <Col xs={12} sm={8}>
            <Row className='roww3'>
                <Col xs={12} sm={3}>
                </Col>
                <Col xs={12} sm={9}>
                    
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility2}>+</button>
                                <div>Which accounts can I use Round Ups with?</div>
                                </div>
                        </span>
                        
                        {isVisible2 && <p className='ans'>All our instant access savings accounts are eligible for Rounds Ups, except for Instant Access ISAs. </p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility3}>+</button>
                                <div>How do Round Up alerts work?</div>
                                </div>
                        </span>
                        
                        {isVisible3 && <p className='ans'>If you save more than £1.49 with Round Ups in any week, we'll automatically send you an alert in the app to tell you what the total amount of your Round Ups was for that week. You might be surprised by how much you've saved. </p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility4}>+</button>
                                <div>Can I change my Round Ups alerts setting?</div>
                                </div>
                        </span>
                        
                        {isVisible4 && <p className='ans'>You can turn Round Up alerts off or back on again whenever you want. Just open the app, go to 'my profile', tap 'settings', choose 'notification settings' and 'savings'. Then tap to choose what suits you. </p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility5}>+</button>
                                <div>What is regular saving?</div>
                                </div>
                        </span>
                        
                        {isVisible5 && <p className='ans'>This just means you’re consistently saving money every week, month, or year – whichever you’re able to stick to. Saving regularly helps you stay on track with reaching whatever financial goals you have (like buying a car, or going on holiday).

Plus, saving your money often means you have some funds for unexpected costs (like losing your job, or replacing the boiler).</p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility6}>+</button>
                                <div>Why a savings account?</div>
                                </div>
                        </span>
                        
                        {isVisible6 && <p className='ans'>Most savings accounts can grow you money without you having to do anything (aside from depositing your money). This is called earning interest – hiding money under your mattress can't do this (yet).

It’s also a good idea to keep your savings separate from the current account you use day-to-day. This is so you don’t accidentally spend the money you want to save (which happens to best of us).</p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility7}>+</button>
                                <div>How much can you save?</div>
                                </div>
                        </span>
                        
                        {isVisible7 && <p className='ans'>Work out what you can realistically save each month. Take a look at your bank statements to see if there’s anything you could be spending less on, like takeaways or that daily coffee habit. </p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility8}>+</button>
                                <div>How much do you need?</div>
                                </div>
                        </span>
                        
                        {isVisible8 && <p className='ans'>We’re all aiming at something different, but do your research and work out exactly how much you need to reach your goal.</p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility9}>+</button>
                                <div>Are my savings secure?</div>
                                </div>
                        </span>
                        
                        {isVisible9 && <p className='ans'>In short, yes. Your eligible deposits with NatWest are protected up to a total of £85,000 by the Financial Services Compensation Scheme (FSCS).

We’re regulated by the Prudential Regulation Authority and authorised by the Financial Conduct Authority. We know your money matters and maintain the same high standards as any bank or building society to keep it secure.</p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility10}>+</button>
                                <div>How do I earn interest on my savings?</div>
                                </div>
                        </span>
                        
                        {isVisible10 && <p className='ans'>All our savings accounts pay interest directly into the account, unless specified otherwise. We calculate interest daily for all accounts. Head to our website and find the page for the account you want to apply for. You can then see when we pay interest on that account. This can differ between accounts.</p>}
                    </div>
                    <div>
                        <span className='qs'>
                                <div className='container'> 
                                <button onClick={toggleVisibility1}>+</button>
                                <div>How do I make a complaint?</div>
                                </div>
                        </span>
                        
                        {isVisible1 && <p className='ans'> We recognise that complaints are an opportunity for us to learn from our mistakes and influence change within our business. We deal with all complaints fairly and with integrity, and all our businesses have rigorous standards and timescales to resolve customer concerns.<br/>
                        Please fill out your complaint, which is present inside the feedback form.</p>}
                    </div>
                </Col>
            </Row></Col>
            <Col xs={12} sm={4}></Col>
            </Row>
        </div>
        <br/>

        <br/>
        <Footer/>
    </div>
  )
}
