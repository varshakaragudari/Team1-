import React, { useState,useEffect} from 'react'
import '../css/Registration.css'
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [selectedForm, setSelectedForm] = useState('customerNumber');
    const [customerNumber, setCustomerNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const [currentAccounts, setCurrentAccounts] = useState({});
  const [savingsAccounts, setSavingsAccounts] = useState({});

    const handleRadioChange = (event) => { setSelectedForm(event.target.value); }
    const handleCustomerNumberChange = (event) => { setCustomerNumber(event.target.value); }

    const handleCardNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,16}$/.test(value)) { // Only allow up to 16 digits
            setCardNumber(value);
        }
    }

    const handleContinue = (event) => {
        event.preventDefault();

        // Depending on the selected form, you can access the user input
        if (selectedForm === 'customerNumber') {
            console.log('Customer Number:', customerNumber);
        } else if (selectedForm === 'cardNumber') {
            console.log('Card Number:', cardNumber);
        }

        // After successful submission, show the OTP form
        setShowOTPForm(true);
    }

    // const handleNextClick = () => {
    //     // Handle OTP verification or navigation to the next step
    //     // console.log('Entered OTP:', otp);
    //     // Implement your logic here
    // }

    const handleBackClick = () => {
        setShowOTPForm(false);
    }

    const handlePINChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,4}$/.test(value)) { // Only allow up to 4 digits for PIN
            setPin(value);
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
useEffect(()=>{
handleLogin();
},[])
    const handleLogin = async () => {
        // try {
            const userData = {
                // "custId": customerNumber,
                // "passwordHash": pin + password
                "custId": "sarathnull",
                "passwordHash": "8179Sarath"
            };

            await axios.post('http://localhost:8999/users/api/users/login', userData).then(async (data)=> {
                if (data!=null) {
                    const logintoken=data.data;
                    sessionStorage.setItem("logintoken", logintoken);
                    await axios.get('http://localhost:8999/users/api/users/'+userData.custId, {headers: {Authorization: `Bearer ${logintoken}`}})
                    .then(async data2=> {
                        console.log(data2);
                        if (data2!=null && data2.data) {
                            const response = await axios.get(`http://localhost:8999/accounts/getCurrrent/userId/${data2.data.userId}`);
                            const currentAccountsData = response.data;
                            setCurrentAccounts(currentAccountsData);

                            const response2 = await axios.get(`http://localhost:8999/accounts/getSaving/userId/${data2.data.userId}`);
                            const savingsAccountsData = response2.data;
                            setSavingsAccounts(savingsAccountsData);
                            console.log(response);
                            console.log(response2)
                        
                            if (response.data && response2.data) {
                                userData.accounts[0].accountBalance=savingsAccountsData.balance;
                                userData.accounts[1].accountBalance=currentAccountsData.balance;
                                const activitydata = 
                                        {
                                            userId: data2.data.userId,
                                            type: "Auth",
                                            description: "New login performed",
                                            timestamp: Date.now().toString(),
                                            ipAddress: "102.5.15.11"
                                        }
                                    await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                                        console.log(data3);
                                        sessionStorage.setItem("userdata",JSON.stringify(data2.data));
                                        navigate("/banking");
                                    });
                                
                            }
                        }
                        
                    })
                }
            })
            // console.log(response);

            // if (response.status === 200) {
            //     console.log(response)
            //     // const data = response.data;
            //     setToken(response.data);
            //     alert(token);
            //     // setMessage(data.message);
            // } else {
            //     alert('Login failed');
            // }
        // } 
        // catch (error) {
        //     alert('Login failed');
        //     console.error('Error logging in:', error);
        // }
    }

    return (
        <>
            <Helmet>
                <title>Login to Online Banking - NatWest</title>
            </Helmet>
            <HeaderTop />
            <div className='d-flex justify-content-center p-4'>
                {showOTPForm ? (
                    <div className='main-1'>
                        <div className='mainheading'>
                            <h1 className='h1-regular prim-colr'>Online Banking services</h1>
                        </div>
                        <h3 className='displayCustomerNumber'>Customer number ----------------</h3>
                        <p className='loginRoute'>Not you? <a href='/login' className='prim-colr'>Login here</a></p>
                        <div className='signupbox'>
                            <div className='signupbox-header p-1'>
                                <h2 className='h2-regular'>Log in - Step 2</h2>
                            </div>
                            <div className='loginbodybox p-2'>
                                <div className='pinEntry'>
                                    <h4 className='pinEntry-h2'>Your PIN</h4>
                                    <p className='labelPinEntry'>Enter your PIN</p>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter your PIN'
                                        value={pin}
                                        onChange={handlePINChange}
                                    />
                                </div>
                                <br />
                                <div className='passwordEntry'>
                                    <h4 className='passwordEntry-h2'>Your Password</h4>
                                    <p className='labelPasswordEntry'>Enter your Password</p>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter your Password'
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <p></p>
                                <div>
                                    <a href='/forgot-password' className='prim-colr'>Forgotten your PIN or password?</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between p-2'>
                            <a className='prim-colr' onClick={handleBackClick}>Back</a>
                            <button type='button' className='nextButton' onClick={handleLogin}>Login</button>
                        </div>
                        <p>Have you been asked to download software which allows someone to control your computer? If so, don't login - it's a known scam used by fraudsters.</p>
                    </div>
                ) : (
                    <div className='main-1'>
                        <div className='mainheading'>
                            <h1 className='h1-regular prim-colr'>Online Banking services</h1>
                        </div>
                        <div className='signupbox'>
                            <div className='signupbox-header p-1'>
                                <h2 className='h2-regular'>Log in - Step 1</h2>
                            </div>
                            <div className='loginbodybox p-2'>
                                <div className='LBB1'>
                                    <div className='LBB1-1'>
                                        <span className='LBB1-1-span'>
                                            Choose how you'd like to log in. You can use your customer number or your card number.
                                        </span>
                                    </div>
                                    <div className='LBB1-2'>
                                        <div className='LBB1-2-1-radio'>
                                            <input
                                                className='radioCustomerNumber'
                                                type="radio"
                                                name="formSelection"
                                                value="customerNumber"
                                                checked={selectedForm === 'customerNumber'}
                                                onChange={handleRadioChange}
                                            />
                                            <span className='labelCustomerNumberRadio-span'>
                                                Customer number
                                            </span>
                                        </div>
                                        <div className='LBB1-2-2-customerNumberForm'>
                                            {selectedForm === 'customerNumber' && (
                                                <div className='loginForm1-1'>
                                                    <p className='labelCustomerNumberForm'>
                                                        This is the Customer ID you got when you registered with us.
                                                    </p>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter 10-digit Customer Number"
                                                        value={customerNumber}
                                                        onChange={handleCustomerNumberChange}
                                                    />
                                                    <p></p>
                                                    <a href="#" className='prim-colr'>Forgotten your login details?</a>
                                                </div>
                                            )}
                                        </div>
                                        <div className='LBB1-2-3-radio'>
                                            <input
                                                className='radioCardNumber'
                                                type="radio"
                                                name="formSelection"
                                                value="cardNumber"
                                                checked={selectedForm === 'cardNumber'}
                                                onChange={handleRadioChange}
                                            />
                                            <span className='labelCardNumberRadio-span'>
                                                Card number
                                            </span>
                                        </div>
                                        <div className='LBB1-2-4-CardNumberForm'>
                                            {selectedForm === 'cardNumber' && (
                                                <div className='loginForm1-2'>
                                                    <p className='labelCardNumberForm'>
                                                        The 16 digit card number across the front of your debit or credit card.
                                                    </p>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter 16-digit Card Number"
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                    />
                                                    <p></p>
                                                    <span className='whyUseMyCard'>Why use my card number?</span>
                                                    <p className='whyUseMyCard'>
                                                        <span className='whyUseMyCard-span'>If you've forgotten your customer number, you can enter your debit or credit card number instead - it's just as secure. Please note that we'll never ask you for your full card details to log in.</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className='gap'></p>
                                {/* checkbox Remember me*/}
                                <div className='rememberMe'>
                                    <div className='rememberMe2'>
                                        <div className='rememberMe3'>
                                            <span className='rememberMe3-span1'>
                                                <input className='rememberMeCheckBox' type='checkbox' />
                                                <label className='labelRememberMe'>Remember me.</label>
                                            </span>
                                            <p className='whatDoesThisMean'>
                                                <span className='whatDoesThisMean-span'>
                                                    By enabling the functional cookie and choosing 'Remember me’, your customer number will be saved to your computer or device for future visits. If you use your card number we won’t save this, but we’ll use it to identify your customer number so we can still remember you. We don’t recommend using this if you’re using a public or shared computer.
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='buttonsSignUpContinue'>
                            <div className='continueButton'>
                                <button
                                    type="submit"
                                    className="nextButton"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                            <div className='signUpLink'>
                                <div className='signUpLink1'>
                                    <span className='signUpLink1-span'>Not an online user? </span>
                                    <a href='/register' className='prim-colr'>Sign up here</a>
                                </div>
                            </div>
                        </div>
                        <div className='extraInfo'>
                            <p className='extraInfo-p'>
                                <span className='extraInfo-span'>
                                    Only individuals who have a NatWest account and authorised access to Online Banking should proceed beyond this point. For the security of customers, any unauthorised attempt to access customer bank information will be monitored and may be subject to legal action.
                                </span>
                            </p>
                        </div>

                    </div>
                )}
            </div>
            <br /><br />
            <OneLineFooter />
        </>
    )
}