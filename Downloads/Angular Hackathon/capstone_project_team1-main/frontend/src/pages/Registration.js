import React, { useState } from 'react'
import '../css/Registration.css'
import OneLineFooter from '../components/OneLineFooter';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import { Link, useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
const CustomExpiryInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control"
      placeholder="dd/MM/YY"
      value={value}
      onClick={onClick}
      readOnly
    />
);
export default function Registration() {
    const [selectedForm, setSelectedForm] = useState(true);
    const navigate=useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [nextForm, setNextForm] = useState(true);
    const [phone, setPhone] = useState('');
    const [otp, setOTP] = useState('');
    const [pin, setPIN] = useState('');
    const [confirmPIN, setConfirmPIN] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [message, setMessage] = useState('');


    const handleFirstName = (event) => { setFirstName(event.target.value); }
    const handleLastName = (event) => { setLastName(event.target.value); }
    const handleDOB = (event) => { setDOB(event.target.value); }
    const handleNextForm = () => { setNextForm(false); }
    const handlePhoneChange = (event) => { setPhone(event.target.value); }
    const handleOTPChange = (event) => { setOTP(event.target.value); }
    const handlePINChange = (event) => { setPIN(event.target.value); }
    const handleConfirmPINChange = (event) => { setConfirmPIN(event.target.value); }
    const handlePasswordChange = (event) => { setPassword(event.target.value); }
    const handleConfirmPasswordChange = (event) => { setConfirmPassword(event.target.value); }
    const handleEmailChange = (event) => { setEmail(event.target.value); }
    const handleAddressChange = (event) => { setAddress(event.target.value); }
    const handleCityChange = (event) => { setCity(event.target.value); }
    const handleStateChange = (event) => { setState(event.target.value); }
    const handleCountryChange = (event) => { setCountry(event.target.value); }

    function getCurrentTimestamp() {
        return Date.now().toString();
    }

    const handleRegistration = async () => {
        try {
            const phoneNumberInt = parseInt(phone, 10);
            const userData = {
                "firstName": firstName,
                "lastName": lastName,
                "DOB": Date.now().toString(),
                "email": email,
                "address": address,
                "city": city,
                "state": state,
                "country": country,
                "phoneNumber": phoneNumberInt,
                "passwordHash": pin + password
            };

            await axios.post('http://localhost:8999/users/api/users/register', userData).then(async (data)=> {
                console.log(data);
                const registerresponsedata=data.data;
                if (registerresponsedata) {
                    const userlogindata = {"custId": registerresponsedata.custId,"passwordHash": userData.passwordHash}
                    console.log(userlogindata)
                    await axios.post('http://localhost:8999/users/api/users/login',userlogindata).then(async (data2)=> {
                        console.log(data2);
                        if (data2.data) {
                            await axios.get('http://localhost:8999/users/api/users/'+registerresponsedata.custId, {headers: {Authorization: `Bearer ${data2.data}`}})
                            .then(async (data3)=> {
                                console.log(data3);
                                if (data3.data) {
                                    const userdata=data3.data;
                                    sessionStorage.setItem("userdata", JSON.stringify(userdata));
                                    const currAcc = {
                                        "accountNumber":userdata.accounts[1].accountNumber,
                                        "accountHolderName": userdata.firstName+" "+userdata.lastName,
                                        "balance":0,
                                        "walletId":"wal32",
                                        "userId":userdata.userId,
                                        "dateOfJoining":Date.now().toString(),
                                         "custId":userdata.custId
                                    }
                                    const savAcc = {
                                        "accountNumber":userdata.accounts[0].accountNumber,
                                        "accountHolderName": userdata.firstName+" "+userdata.lastName,
                                        "balance":0,
                                        "walletId":"wal32",
                                        "userId":userdata.userId,
                                        "dateOfJoining":Date.now().toString(),
                                        "interestRate": 4,
                                        "custId":userdata.custId
                                    }
                                    await axios.post("http://localhost:8999/accounts/postCurrent", currAcc);
                                    await axios.post("http://localhost:8999/accounts/postSaving", savAcc).then(async data=> {
                                        const activitydata = 
                                        {
                                            userId: userdata.userId,
                                            type: "Auth",
                                            description: "New account created",
                                            timestamp: Date.now().toString(),
                                            ipAddress: "102.5.15.11"
                                        }
                                        await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                                            console.log(data3);
                                            navigate("/banking");
                                        });
                                    })
                                }
                            })
                        }
                    })
                }
                //sessionStorage.setItem("")
            });
            // console.log(response)

            // if (response.status === 201) {
            //     // Registration successful
            //     const { message, custId, debitCardNumber, expiry, cvv } = response.data;

            //     // Set the message state to display in the alert
            //     // setMessage(message);

            //     // Show an alert with the additional information
            //     alert(`Registration Successful!\nCust ID: ${custId}\nDebit Card Number: ${debitCardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`);
            //     console.log('User registration successful');
            // } else {
            //     // Handle registration failure
            //     alert('User registration failed');
            //     console.error('User registration failed');
            // }
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error('Error registering user:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Setup Online Banking - NatWest</title>
            </Helmet>
            <HeaderTop />
            <div className='d-flex justify-content-center p-4'>
                <div className='main-1'>
                    <div className='mainheading'>
                        <h1 className='h1-regular prim-colr'>Setup Online Banking</h1>
                        <p>Setting up Online Banking will only take a few minutes. If we have a mobile number for you, we can set you up for Online Banking more quickly.</p>
                        <p>Before you start, please make sure:</p>
                        <ul>
                            <li>You're aged 11 or over.</li>
                            <li>You have your mobile handy.</li>
                        </ul>
                        {/* <p>If we have your mobile details, we'll send you an activation code to your device. If we don't we'll need to send you one by post which takes a little longer.</p> */}
                        <div><span>Already have an account?</span> <Link className='prim-colr' to={"/login"}>Log in here</Link></div><br />
                    </div>
                    {nextForm ? (
                        <div className="d-flex justify-content-center flex-column w-100">
                            <div className='signupbox'>

                                <div className='signupbodybox'>
                                    {selectedForm && (
                                        <div className='registerForm-1'>
                                            <div className='registerFormHeading'>
                                                <div className='signupbox-header p-1'>
                                                    <h2 className='h2-regular'>Step 1: Personal details</h2>
                                                </div>
                                            </div>
                                            <p className='p-2'>Let's start by getting a few details from you.</p>
                                            <div className='p-2'>
                                                <label className='labelFirstName'><b>First name</b></label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter First Name'
                                                    vlaue={firstName}
                                                    onChange={handleFirstName}
                                                />
                                                <br />
                                                <label className='labelLastName'><b>Last name</b></label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Last Name'
                                                    vlaue={lastName}
                                                    onChange={handleLastName}
                                                />
                                                <br />

                                                <label className='labelDOB'><b>Date of birth</b></label>
                                                {/* <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Date of birth'
                                                    vlaue={dob}
                                                    onChange={handleDOB}
                                                /> */}
                                                <ReactDatePicker customInput={<CustomExpiryInput/>} selected={dob} onChange={(e)=>setDOB(e.target.value)} dateFormat="dd/MM/yy"/>
                                                <br />

                                                <label className='labelAddress'><b>Address</b></label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Address'
                                                    vlaue={address}
                                                    onChange={handleAddressChange}
                                                />
                                                <br />
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter City'
                                                    vlaue={city}
                                                    onChange={handleCityChange}
                                                /><br />
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter State'
                                                    vlaue={state}
                                                    onChange={handleStateChange}
                                                /><br />
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Country'
                                                    vlaue={country}
                                                    onChange={handleCountryChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <br />
                            <div className='d-flex flex-row d-flex justify-content-between w-100'>
                                <button href='/' className='prim-colr btn'>Cancel</button>
                                <button className='nextButton' onClick={handleNextForm}>Next</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='signupbox'>
                                <div className='signupbodybox'>
                                    <div className='signupbox-header p-1'>
                                        <h2 className='h2-regular'>Step 2: Authentication</h2>
                                    </div>
                                    <div className='phoneOTPVerify p-2'>
                                        <label className='labelEmail'><b>Email</b><br />
                                            <span className='labelEmail-span'>Enter your Email</span>
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        <br />

                                        <label className='labelPhoneVerify'><b>Phone No.</b><br />
                                            <span className='labelPhoneVerify-span'>Enter 10 digit phone number</span>
                                        </label>
                                        <div className='inputAndButtonInline'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Enter Mobile Number'
                                                value={phone}
                                                onChange={handlePhoneChange}
                                            />
                                            <button className='nextButton'>Generate OTP</button>
                                        </div>

                                        <div className='inputAndButtonInline'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Enter OTP'
                                                value={otp}
                                                onChange={handleOTPChange}
                                            />
                                            <button className='nextButton'>Verify</button>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='pinPasswordSetup p-2'>
                                        <div className='pinSetup'>
                                            <label className='labelPINSetup'><b>Choose your online banking pin</b><br />
                                                <span className='labelPINSetup-span'>PINS are 4 digits long. It is advised not to set weak pin like numbers in sequence (like 1234) or have numbers that repeat 3 times or more (like 1112).</span>
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Enter pin'
                                                value={pin}
                                                onChange={handlePINChange}
                                            />
                                        </div>
                                        <br />
                                        <div className='confirmPINSetup'>
                                            <label className='labelConfirmPINSetup'><b>Confirm your PIN</b>
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Confirm pin'
                                                value={confirmPIN}
                                                onChange={handleConfirmPINChange}
                                            />
                                        </div>

                                        <br />
                                        <div className='passwordSetup'>
                                            <label className='labelPasswordSetup'><b>Choose your online banking password</b><br />
                                                <span className='labelPasswordSetup-span'>Password must be between 6 and 20 characters and a combination of letters and numbers (with no space or symbols).</span>
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Enter password'
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <br />
                                        <div className='confirmPasswordSetup'>
                                            <label className='labelConfirmPasswordSetup'><b>Confirm your Password</b></label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Confirm password'
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-2'>
                                <button className='nextButton' onClick={handleRegistration}>Register</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <br /><br />
            <OneLineFooter />
        </>
    )
}