import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Routes ,Link, NavLink} from 'react-router-dom';
import '../css/HelpProduct.css';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function HelpProduct() {
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
    <>
    <Helmet>
          <title>Knowledge base - Help with your product</title>
    </Helmet>
    <HeaderTop/>
    <nav aria-label="breadcrumb" className='p-2'>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
            <li className="breadcrumb-item"><a href="/helpdesk" className='prim-colr'>Helpdesk</a></li>
            <li className="breadcrumb-item active" aria-current="page">Knowledge Base</li>
          </ol>
    </nav>
    <div className='Container p-2' id="hwp">
        <div className='div1'>
            <h1>Help with your product</h1>
            <hr/>
            <Row className='roww1'>
                <Col xs={12} sm={6}>
                    <h5><button onClick={toggleVisibility1}>Learn about savings</button></h5>
                    <h5><button onClick={toggleVisibility2}>Learn about difference between savings and investments</button></h5>
                    <h5><button onClick={toggleVisibility3}>Learn about round-up savings</button></h5>
                    <h5><button onClick={toggleVisibility4}>Learn about how round-up savings work</button></h5>
                    <h5><button onClick={toggleVisibility5}>Learn about Pros and Cons of round-up savings</button></h5>
                    
                </Col>
            </Row>
            <hr/>
        </div>
        <div className='qwert'> 
            {isVisible1 ? <h1 className='qwertHeading'>Learn about savings</h1>:<div></div>}
            {isVisible1 ? <div className='qwertAnswer'>
              
              Savings are the money left after your bills have been paid, or from an unexpected windfall. There are lots of places you can put your money to get it earning interest: bank savings accounts, ISAs, or you could invest it.<br />

Savings accounts offer higher interest rates than standard bank accounts. The amount of interest you can earn depends on the account you choose and whether you need instant access to your cash or not. 
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible2 ? <h1 className='qwertHeading'>Learn about difference between savings and investments</h1>:<div></div>}
            {isVisible2 ? <div className='qwertAnswer'>
              Investing is when you buy assets that could increase (appreciate) in value over time. Generally speaking, these vary from tangible assets like houses or jewellery, to financial ones like shares in companies or government/company bonds.<br/>

Investing could be right for you if you have:<br/>

1.long-term goals, <br/>
2.can set money aside for 5+ years,<br />
3.no large debts.<br />
Investing is designed for the long term so if you can't put money away for 5+ years and/or need instant access to money, then a savings account may be best for you. <br/>




The value of investments can fall as well as rise, and you may not get back the full amount you invest. Eligibility criteria, fees and charges apply.
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible3 ? <h1 className='qwertHeading'>Learn about round-up savings</h1>:<div></div>}
            {isVisible3 ? <div className='qwertAnswer'>
            Round-ups are an automatic savings tool that rounds up purchase prices to the nearest dollar. The difference between that somewhat higher figure and the actual price then gets deposited into a savings or investment account.<br/>

One of the key benefits of this savings technique is that it’s effortless. The money accrues without your doing any calculations or transfers. It’s akin to the saving technique in which people pay cash for purchases using bills and accumulate change. That loose change eventually gets deposited into a savings account. Round-ups accomplishes the same goal, but there’s no lugging coin jars involved.
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible4 ? <h1 className='qwertHeading'>Learn about how round-up savings work</h1>:<div></div>}
            {isVisible4 ? <div className='qwertAnswer'>
            Need a real-world example of how round-up savings works? Say you stop at your local coffee shop for a latte to go. It costs $4.65. With a round-up, the price is rounded up to $5, with $4.65 going to the merchant and 35 cents to the account you have designated.<br />

Now, 35 cents might not sound like much, but think of how many times you swipe or tap that card. It’s not uncommon for people to make 30 transactions per week and save more than $10 per week with round-ups. That would be in excess of $520 a year, not including the power of compound interest which can boost the amount higher still.<br />

With some providers, these small amounts of change accrue and then are deposited into the user’s account in a lump sum once they hit a certain dollar-amount threshold or a specific time period has passed. <br />

With others, the funds may be deposited as soon as the transaction settles. <br />
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible5 ? <h1 className='qwertHeading'>Learn about Pros and Cons of round-up savings</h1>:<div></div>}
            {isVisible5 ? <div className='qwertAnswer'>
           <b> Pros of Round-Up Savings are:</b><br />

1.  <b>Round-ups are a positive step in financial selfcare.</b> One reason round-ups can be a useful savings tool is they help someone pay themselves with each transaction. Kind of like tipping oneself, round-ups pay the saver a little something extra on their purchases, making everyday spending a little more rewarding. <br/>

2.  <b>Round-ups are automatic.</b> Part of why saving can feel painful is that it requires the saver to make difficult decisions on a regular basis. Once round-ups are set up, no conscious sacrifices are required. You don’t have to engage in any potentially painful decisions about, say, how to save money on streaming services or your utility bill.<br/>

Automating personal finances can be a helpful tactic to encourage healthy habits, and round-ups can be a valuable part of this seamless approach to personal finances.<br />

3.  <b> Round-ups show visible progress on your savings goals.</b> For those who are already putting money into savings on a regular basis, taking advantage of round-up features can help to grow that money more rapidly, putting savings goals within even closer reach. For those who aren’t currently saving, seeing round-ups grow as you swipe or tap your debit card can be an encouraging experience. <br />

4. <b> Round-ups may help counter savings procrastination.</b> While some people save early and often, others may put it off. There are lots of reasons for procrastinating on starting a savings plan and surely many other tempting ways to spend your cash. Round-ups can help motivate savings procrastinators by demonstrating the effects of putting money away on a regular basis. <br />
<b>Cons of Round-Up Savings are:</b><br />
While round-ups work well for many people, there are some downsides to consider as well.<br />

1.<b>  Round-ups may come with fees.</b> When opting into a round-up service, review the fees. Saving $5 a week seems great, but if fees are going to cost you $2, is that worth it?<br />

2.<b>   Round-ups could throw off a careful budget.</b> If you are on a very tight budget, rounding up could tip things out of balance. Also, people who often have a low balance in their checking account could overdraw their account due to the automatic round-ups fee being debited. That, in turn, can lead to overdraft or NSF (non-sufficient funds) fees. Review program requirements for round-ups and your bank accounts’ guidelines before opting into anything.<br />
                
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible6 ? <h1 className='qwertHeading'>Learn about </h1>:<div></div>}
            {isVisible6 ? <div className='qwertAnswer'>
                
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible7 ? <h1 className='qwertHeading'>Learn about </h1>:<div></div>}
            {isVisible7 ? <div className='qwertAnswer'>
                
                </div>:<div></div>}

        </div>
        <div className='qwert'> 
        {isVisible8 ? <h1 className='qwertHeading'>Learn about </h1>:<div></div>}
            {isVisible8 ? <div className='qwertAnswer'>
                
                </div>:<div></div>}

        </div>
    </div>
    <Footer/>
    </>
  )
}
