import React, { useState } from 'react'
// import '../css/Register.css'
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login15() {
    const [selectedForm, setSelectedForm] = useState('customerNumber');
    const [customerNumber, setCustomerNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isRememberMeVisible, setRememberMeVisible] = useState(false);
    const [isWhyUseMyCardVisible, setWhyUseMyCardVisible] = useState(false);
    const [token, setToken] = useState('');
    const [isCustomerNumberValid, setIsCustomerNumberValid] = useState(false);
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();
    const handleCloseDialog = () => {
        setShowDialog(false);
    }

    const toggleRememberMe = () => {
        setRememberMeVisible(!isRememberMeVisible);
    };

    const toggleWhyUseMyCard = () => {
        setWhyUseMyCardVisible(!isWhyUseMyCardVisible);
    };

    const handleRadioChange = (event) => {
        const val = event.target.value;
        setSelectedForm(val);

        if (val === "customerNumber") {
            setCardNumber('');
            console.log("cust: of cust: ", customerNumber);
            console.log("cust: of card: ", cardNumber);
        } else {
            setCustomerNumber('');
            console.log("card: of cust: ", customerNumber);
            console.log("card: of card: ", cardNumber);
        }
    }

    const handleCustomerNumberChange = (event) => {
        setCustomerNumber(event.target.value);
        setIsCustomerNumberValid(true);
    }

    const handleCardNumberChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,16}$/.test(value)) { // Only allow up to 16 digits
            setCardNumber(value);
        }

        if (/^[0-9]{16}$/.test(value)) {
            setCardNumberError(''); // Clear the error message if the card number is valid
            setIsCardNumberValid(true);
        } else {
            setCardNumberError('Please enter a valid 16-digit card number.');
            setIsCardNumberValid(false);
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

    const handleBackClick = () => {
        setShowOTPForm(false);
    }

    const handlePINChange = (event) => {
        const newPin = event.target.value;
        setPin(newPin);

        // Validate the PIN and set the error message accordingly
        if (/^[0-9]{4}$/.test(newPin)) {
            setPinError(''); // Clear the error message if PIN is valid
            setIsPINValid(true);
        } else {
            setPinError('Please enter a valid 4-digit PIN.');
            setIsPINValid(false);
        }
    }

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Validate the password and set the error message accordingly
        const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\-]{6,20}$/;
        if (passwordPattern.test(newPassword)) {
            setPasswordError(''); // Clear the error message if the password is valid
            setIsPasswordValid(true);
        } else {
            setPasswordError('Password must be between 6 and 20 characters and contain only letters and numbers (no spaces or symbols).');
            setIsPasswordValid(false);
        }
    }

    const [isPINValid, setIsPINValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleLogin = async () => {
        try {
            var userData = null;

            if (cardNumber === '') {
                userData = {
                    "custId": customerNumber,
                    "passwordHash": pin + password
                };
            }
            else {
                userData = {
                    "cardNumber": cardNumber,
                    "passwordHash": pin + password
                };
            }

            const response = await axios.post('http://localhost:8999/users/api/users/login', userData);

            if (response.status === 200) {
                console.log(response.data)
                sessionStorage.setItem("logintoken", response.data.token);
                sessionStorage.setItem("userdata",JSON.stringify(response.data.User));
                await axios.get("http://localhost:8999/accounts/getCurrrent/userId/"+response.data.userId).then(async (data)=> {
                    console.log(data.data);
                    
                    if (data.data!=null && data.data.length!=0) {
                        console.log("not this one")
                        
                        const activitydata = 
                            {
                                userId: response.data.User.userId,
                                type: "Auth",
                                description: "New login performed",
                                timestamp: Date.now().toString(),
                                ipAddress: "102.5.15.11"
                            }
                        await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                            console.log(data3);
                            // setShowDialog(true);
                            // setDialogMessage("Login Success.")
                            navigate("/banking");
                        });
                    } else {
                        console.log("this one")
                        console.log(response.data.User);
                        const currAcc = {
                            "accountNumber":response.data.User.accounts[1].accountNumber,
                            "accountHolderName": response.data.User.firstName+" "+response.data.User.lastName,
                            "balance":0,
                            "walletId":"wal32",
                            "userId":response.data.User.userId,
                            "dateOfJoining":Date.now().toString(),
                             "custId":response.data.User.custId
                        }
                        const savAcc = {
                            "accountNumber":response.data.User.accounts[0].accountNumber,
                            "accountHolderName": response.data.User.firstName+" "+response.data.User.lastName,
                            "balance":0,
                            "walletId":"wal32",
                            "userId":response.data.User.userId,
                            "dateOfJoining":Date.now().toString(),
                            "interestRate": 4,
                            "custId":response.data.User.custId
                        }
                        console.log(currAcc);
                        console.log(savAcc);
                        await axios.post("http://localhost:8999/accounts/postCurrent", currAcc).then(async datad=> {

                        }).catch(async err=> {
                            const activitydata = 
                            {
                                userId: response.data.User.userId,
                                type: "Auth",
                                description: "New login performed",
                                timestamp: Date.now().toString(),
                                ipAddress: "102.5.15.11"
                            }
                            await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                                console.log(data3);
                                // setShowDialog(true);
                                // setDialogMessage("Login Success.")
                                navigate("/banking");
                            });
                        });
                        await axios.post("http://localhost:8999/accounts/postSaving", savAcc).then(async datad=> {
                        console.log(datad)    
                        const activitydata = 
                            {
                                userId: response.data.User.userId,
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
                }).catch(async err=> {
                    // const currAcc = {
                    //     "accountNumber":response.data.accounts[1].accountNumber,
                    //     "accountHolderName": response.data.firstName+" "+response.data.lastName,
                    //     "balance":0,
                    //     "walletId":"wal32",
                    //     "userId":response.data.userId,
                    //     "dateOfJoining":Date.now().toString(),
                    //      "custId":response.data.custId
                    // }
                    // const savAcc = {
                    //     "accountNumber":response.data.accounts[0].accountNumber,
                    //     "accountHolderName": response.data.firstName+" "+response.data.lastName,
                    //     "balance":0,
                    //     "walletId":"wal32",
                    //     "userId":response.data.userId,
                    //     "dateOfJoining":Date.now().toString(),
                    //     "interestRate": 4,
                    //     "custId":response.data.custId
                    // }
                    // await axios.post("http://localhost:8999/accounts/postCurrent", currAcc);
                    // await axios.post("http://localhost:8999/accounts/postSaving", savAcc).then(async datad=> {
                    //     const activitydata = 
                    //     {
                    //         userId: response.data.userId,
                    //         type: "Auth",
                    //         description: "New account created",
                    //         timestamp: Date.now().toString(),
                    //         ipAddress: "102.5.15.11"
                    //     }
                    //     await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                    //         console.log(data3);
                    //         navigate("/banking");
                    //     });
                    // })
                })
                // const jwtToken = response.data.token;
                // setToken(jwtToken);
                // console.log(jwtToken)
                
                // alert(token)
                
            } else {
                setShowDialog(true);
                setDialogMessage('Login failed.')
                // alert('Login failed');
            }
        } catch (error) {
            // alert('Login failed');
            setShowDialog(true);
            setDialogMessage('Login failed. Catch block')
            console.error('Error logging in:', error);
        }
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
                                        required
                                        minLength='4'
                                        maxLength='4'
                                    />
                                    {pinError && (
                                        <div className='error-message'>Please enter a valid 4-digit PIN.</div>
                                    )}
                                </div>
                                <br />
                                <div className='passwordEntry'>
                                    <h4 className='passwordEntry-h2'>Your Password</h4>
                                    <p className='labelPasswordEntry'>Enter your Password</p>
                                    <input
                                        type="password"
                                        className='form-control'
                                        placeholder='Enter your Password'
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength='6'
                                        maxLength='20'
                                    />
                                    {passwordError && (
                                        <div className='error-message'>{passwordError}</div>
                                    )}
                                </div>
                                <p></p>
                                <div>
                                    <a href='/forgot-password' className='prim-colr'>Forgotten your PIN or password?</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between p-2'>
                            <a className='prim-colr' onClick={handleBackClick}>Back</a>
                            <button type='button' className='nextButton' onClick={handleLogin} disabled={!isPINValid || !isPasswordValid}>Login</button>
                            <LoginDialog show={showDialog} handleClose={handleCloseDialog} message={dialogMessage} />
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
                                                Customer ID
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
                                                        placeholder="Enter Customer ID"
                                                        value={customerNumber}
                                                        onChange={handleCustomerNumberChange}
                                                        required
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
                                                        required
                                                        minLength="16"
                                                        maxLength="16"
                                                        pattern="^[0-9]{16}$"
                                                    />
                                                    {cardNumberError && (
                                                        <div className='error-message'>{cardNumberError}</div>
                                                    )}
                                                    <p></p>
                                                    <span className='whyUseMyCard' onClick={toggleWhyUseMyCard}>Why use my card number?</span>
                                                    <p
                                                        className='whyUseMyCard'
                                                        style={{
                                                            display: isWhyUseMyCardVisible ? 'block' : 'none'
                                                        }}
                                                    >
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
                                                <label className='labelRememberMe' onClick={toggleRememberMe}>Remember me.</label>
                                            </span>
                                            <p className='whatDoesThisMean'
                                                style={{
                                                    display: isRememberMeVisible ? 'block' : 'none'
                                                }}>
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
                                    disabled={!isCustomerNumberValid && !isCardNumberValid}
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











export function LoginDialog(props) {
    const { show, handleClose, message } = props;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}