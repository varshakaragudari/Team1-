import React, { useState } from 'react';
import '../css/Notification.css'
import Sidebar from '../components/Sidebar';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import backicon from '../images/Icons/Champion_ChevronLeft_32x32.png'
const Notification = () => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const notifications = [
    { type: 'credited', message: 'You have been credited in your savings account', amount: 100, date: '2023-09-21' },
    { type: 'debited', message: 'You have been recently debited from savings account', amount: 50, date: '2023-09-20' },
    { type: 'credited', message: 'You have been credited in your savings account', amount: 100, date: '2023-09-19' },
    { type: 'credited', message: 'You have been credited in your current account', amount: 100, date: '2023-09-18' },
    { type: 'debited', message: 'You have been recently debited from current account', amount: 50, date: '2023-09-17' },
    // Add more notifications as needed
  ];

  const filteredNotifications = activeTab === 'all' ? notifications : notifications.filter((n) => n.type === activeTab);

  return (
    <>
      <Helmet>
        <title>Notifications - Be updated</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
        <div className="col-lg-2 p-0 m-0">
          <Sidebar currentPage="Notifications"/>
        </div>
        <div className="col-lg-10 m-0 p-0">
          <div className='notification'>
            <div className="p-4 notification-bg">
              <div className="d-flex justify-content-start align-items-center mb-2">
                  <a href="/banking" className=""><img src={backicon} alt="back-arrow-icon"/></a>
                  <h1 className="header-text-style">Notification</h1>
              </div>

              {/* Button group for selecting notification type */}
              <div className="btn-group mb-3" role="group" aria-label="Notification Types">
                <button
                  type="button"
                  className={`btn btn-primary ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => handleTabClick('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${activeTab === 'credited' ? 'active' : ''}`}
                  onClick={() => handleTabClick('credited')}
                >
                  Credited
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${activeTab === 'debited' ? 'active' : ''}`}
                  onClick={() => handleTabClick('debited')}
                >
                  Debited
                </button>
              </div>

              {/* Display filtered notifications */}
              <div className="tab-content">
                {filteredNotifications.map((notification, index) => (
                  <div key={index} className={`card mb-2 ${notification.type === 'debited' ? 'text-danger' : 'text-success'}`}>
                    <div className="card-body d-flex justify-content-between">
                      <div className="notification-text">
                        <p className="font-weight-bolder text-black">{notification.message}</p>
                        <p className="text-muted small">{notification.date}</p>
                      </div>
                      <div className="notification-amount">
                        <p className={`font-weight-bolder ${notification.type === 'debited' ? 'text-danger' : 'text-success'}`}>
                          ${notification.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br/>
          <OneLineFooter/>
        </div>
      </div>

    </>
  );
};

export default Notification;





