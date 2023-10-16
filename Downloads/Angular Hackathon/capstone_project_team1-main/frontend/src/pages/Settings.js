import React, { useState } from 'react';
import '../css/Setting.css';
import '../fonts/knile-regular-webfont.woff'
import '../fonts/knile-regularitalic-webfont.woff'
// import '../fonts/RN House Sans W01 Regular.woff'
import '../css/Setting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';


const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleDropdownChange = (event) => {
    // Implement logic based on the selected option
    // For example, you can display different forms or perform actions.
  };

  return (
    <>
      <Helmet>
            <title>Settings - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
        <div className="col-lg-2 p-0 m-0">
            <Sidebar currentPage="Settings"/>
        </div>
        <div className="col-lg-10 m-0 p-0">
          <div className="main-content">
          <div className="light-gray-bg">
            <nav aria-label="breadcrumb" className='p-2'>
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Settings</li>
                        </ol>
            </nav>
            <h2 className="mb-4">Settings 
              {/* <FontAwesomeIcon icon={faCog} className="mr-2" />   */}
            </h2>

            {/* Tab for Modify Transaction Limit */}
            <div
              className={`mb-4 ${selectedTab === 'modifyLimit' ? 'active' : ''}`}
              onClick={() => handleTabClick('modifyLimit')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Modify Transaction Limit</h5>
                  {selectedTab === 'modifyLimit' && (
                    <div>
                      {/* Dropdown for Modify Transaction Limit */}
                      <label>Modify Transaction Limit:</label>
                      <div className="slider-container">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderValue}
                          onChange={handleSliderChange}
                          step="1"
                        />
                        <p>Selected Limit: {sliderValue}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab for Roundup Feature */}
            <div
              className={`mb-4 ${selectedTab === 'roundupFeature' ? 'active' : ''}`}
              onClick={() => handleTabClick('roundupFeature')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Roundup Feature</h5>
                  {selectedTab === 'roundupFeature' && (
                    <div>
                      {/* Dropdown for Roundup Feature */}
                      {/* <select onChange={handleDropdownChange} className="form-select">
                        <option value="">Select an option</option>
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                      </select> */}
                      <p>This feature is enabled by default.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab for Piggy Bank Limit */}


            {/* Link for Edit Profile */}
            <div
              className={`mb-4 ${selectedTab === 'editProfile' ? 'active' : ''}`}
              onClick={() => handleTabClick('editProfile')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Edit Profile</h5>
                  <a href="/banking/my-account/edit-profile" className="btn btn-primary float-right">Edit Profile</a>
                </div>
              </div>
            </div>

            {/* Link for Forgot Password */}
            <div
              className={`mb-4 ${selectedTab === 'forgotPassword' ? 'active' : ''}`}
              onClick={() => handleTabClick('forgotPassword')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Forgot Password</h5>
                  <a href="/forgot-password" className="btn btn-primary">Forgot Password</a>
                </div>
              </div>
            </div>

            {/* Link for Help Desk */}
            <div
              className={`mb-4 ${selectedTab === 'helpDesk' ? 'active' : ''}`}
              onClick={() => handleTabClick('helpDesk')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Help Desk</h5>
                  <a href="/helpdesk" className="btn btn-primary">Help Desk</a>
                </div>
              </div>
            </div>

            {/* Link for view activity */}
            <div
              className={`mb-4 ${selectedTab === 'activity' ? 'active' : ''}`}
              onClick={() => handleTabClick('activity')}
            >
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Activity</h5>
                  <a href="/banking/my-account/activity" className="btn btn-primary">Activity</a>
                </div>
              </div>
            </div>
          </div>
          </div>
          <br/><br/>
          <OneLineFooter/>
        </div>
      </div>
      
    </>
    
  );
};

export default Settings;
