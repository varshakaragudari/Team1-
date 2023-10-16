import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SavingDash from './components/SavingDash';
import Home from './pages/Home';
import MainPayment from './pages/MainPayment';
import SendMoney from './pages/SendMoney';
import Donate from './pages/Donate';
import HelpProduct from './pages/HelpProduct';
import CoinJar from './pages/CoinJar';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Helmet } from 'react-helmet';
import image from '../src/images/image.png';
import DebitCardPayment from './pages/DebitCardPayment';
import PageNotFound from './pages/PageNotFound';
import FeedbackForm from './pages/Feedback';
import Helpdesk from './pages/Helpdesk';
import EditProfile from './pages/EditProfile';
import Timedout from './pages/Timedout';
import SavingDash2 from './pages/NewSaving';
import Settings from './pages/Settings';
import Notification from './pages/Notification';
import Transaction from './pages/Transaction';
import Dashboard from './pages/Dashboard';
import Faqs from './pages/Faqs';
import Sitemap from './pages/Sitemap';
import Feedback from './pages/Feedback';
import MyAccount from './pages/MyAccount';
import RoundUp from './pages/RoundUp';
import WithdrawMoney from './pages/WithdrawMoney';
import DepositMoney from './pages/DepositMoney';
import FeedbackList from './pages/FeedbackList';
import ScrollToTop from './components/ScrollToTop';
import Activity from './pages/Activity';
import Registration15 from './pages/Registration15';
import Login15 from './pages/Login15';
import ProtectRoute from './components/ProtectRoute';
import ProtectRoute2 from './components/ProtectRoute2';
import { useState } from 'react';
// const Home = React.lazy(() => import('./pages/Home'));
function App() {
  

  const [userData, setUserdata] = useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [getLoggedIn,setGetLoggedIn]=useState(isLoggedIn());
  // JSON.parse(sessionStorage.getItem("userdata"))
  // useEffect(()=> {
  //   setUserdata(JSON.parse(sessionStorage.getItem("userdata")));
  // }, [sessionStorage.getItem("userdata")]);
  
  function isLoggedIn() {
    //setUserdata(JSON.parse(sessionStorage.getItem("userdata")));
    if (userData!=null) return true;
    return false;
  }

  return (
    <>
    <Helmet>
        <title>Round Up Savings App</title>
        <link rel="icon" type="image/png" href={image} sizes="16x16" />
    </Helmet>
    <div className="App">
      
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          {/* Ankit */}
          <Route path="/" element={<Home />}/>
          {/* <Route index element={ <React.Suspense fallback={<Timedout/>}> <Home /> </React.Suspense> } /> */}
          {/* <Route path="/home" element={<Home />}/> */}
          <Route path="/banking/payment" element={<ProtectRoute isLoggedIn={getLoggedIn}><MainPayment /></ProtectRoute>}/>
          <Route path="/banking/payment/send-money" element={<ProtectRoute isLoggedIn={getLoggedIn}><SendMoney /></ProtectRoute>}/>
          <Route path="/banking/payment/withdraw-money" element={<ProtectRoute isLoggedIn={getLoggedIn}><WithdrawMoney /></ProtectRoute>}/>
          <Route path="/banking/payment/deposit-money" element={<ProtectRoute isLoggedIn={getLoggedIn}><DepositMoney /></ProtectRoute>}/>
          <Route path="/banking/payment/pay-using-debit-card" element={<ProtectRoute isLoggedIn={getLoggedIn}><DebitCardPayment /></ProtectRoute>}/>
          <Route path="/banking/tools/round-up" element={<ProtectRoute isLoggedIn={getLoggedIn}><RoundUp /></ProtectRoute>}/>
          <Route path="/banking/my-account/activity" element={<ProtectRoute isLoggedIn={getLoggedIn}><Activity /></ProtectRoute>}/>

          {/* Palak */}
          <Route path='/banking/notifications' element={<ProtectRoute isLoggedIn={getLoggedIn}><Notification /></ProtectRoute>}/>
          <Route path='/banking/transactions' element={<ProtectRoute isLoggedIn={getLoggedIn}><Transaction /></ProtectRoute>}/>
          <Route path="/banking/my-account/edit-profile" element={<ProtectRoute isLoggedIn={getLoggedIn}><EditProfile/></ProtectRoute>}/>
          <Route path='/banking/settings' element={<ProtectRoute isLoggedIn={getLoggedIn}><Settings /></ProtectRoute>}/>
          
          {/* Ishita */}
          <Route path='/banking' element={<ProtectRoute isLoggedIn={getLoggedIn}>
              <Dashboard/>
            </ProtectRoute>}/>
            {/* <Route path='/banking' element={<Dashboard/>}/> */}
          {/* <Route path='/banking/dashboard' element={<Dashboard/>}/> */}
          {/* <Route path='/banking/savingAccount' element={<SavingDash/>}/> */}
          {/* <Route path='/savingAccount2' element={<SavingDash2/>}/> */}
          <Route path='/banking/savingAccount' element={<ProtectRoute isLoggedIn={getLoggedIn}><SavingDash2/></ProtectRoute>}/>
          <Route path='/banking/my-account' element={<ProtectRoute isLoggedIn={getLoggedIn}><MyAccount /></ProtectRoute>}/>
          <Route path="/banking/tools/coin-jar" element={<ProtectRoute isLoggedIn={getLoggedIn}><CoinJar /></ProtectRoute>}/>

          {/* Mahesh */}
          <Route path='/register' element={<ProtectRoute2 isLoggedIn={getLoggedIn}><Registration15/></ProtectRoute2>}/>
          <Route path='/login' element={<ProtectRoute2 isLoggedIn={getLoggedIn}><Login15 /></ProtectRoute2>}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>

          {/* Sarath */}
          <Route path='/timed-out' element={<Timedout/>}/>
          <Route path="/helpdesk" element={<Helpdesk />}/>
          <Route path="/helpdesk/faqs" element={<Faqs />}/>
          <Route path="/helpdesk/feedback" element={<Feedback />}/>
          <Route path="/helpdesk/knowledge-base" element={<HelpProduct />}/>
          <Route path="/banking/my-account/feedback" element={<ProtectRoute isLoggedIn={getLoggedIn}><FeedbackList /></ProtectRoute>}/>

          <Route path='/sitemap' element={<Sitemap/>}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
