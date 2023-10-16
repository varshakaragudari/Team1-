import React, { useState } from 'react'
import '../css/Registration.css'
import OneLineFooter from '../components/OneLineFooter';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

const CustomDateInput = ({ value, onClick }) => (
    <input
        type="text"
        className="form-control"
        placeholder="dd-MM-YYYY"
        value={value}
        onClick={onClick}
        readOnly
    />
);

export default function Registration15() {
    const [selectedForm, setSelectedForm] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [dob, setDOB] = useState('');
    const [dobError, setDOBError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [isForm1Valid, setIsForm1Valid] = useState(false);
    const [nextForm, setNextForm] = useState(true);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isGenerateOtpFormValid, setIsGenerateOtpFormValid] = useState(false);
    const [otp, setOTP] = useState('');
    const [otpError, setOTPError] = useState('');
    const [isOtpFormValid, setIsOtpFormValid] = useState(false);
    const [confirmOTP, setConfirmOTP] = useState('');
    const [isOTPVerified, setIsOTPVerified] = useState(false);
    const [pin, setPIN] = useState('');
    const [confirmPIN, setConfirmPIN] = useState('');
    const [pinError, setPinError] = useState('');
    const [confirmPINError, setConfirmPINError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    // const [message, setMessage] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();
    const handleCloseDialog = () => {
        if(isOTPVerified){
            setShowDialog(false);
        navigate('/login');
        }
        
    };
    const handleCloseDialog2 = () => {
        setShowDialog(false);
    };


    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);

        if (value.length < 2) {
            setFirstNameError('First name must be at least 2 characters');
            setIsForm1Valid(false); // Set form validation to false
        }
        else if (!value.match(/^[A-Za-z\s]*$/)) {
            // Invalid input, display an error message or set an error state
            setFirstNameError('First name can only contain letters and spaces');
            setIsForm1Valid(false);
        } else {
            // Input is valid, clear any previous error message
            setFirstNameError('');
            // Check if all other fields have no errors to set form validation back to true
            if (!lastNameError && !dobError) {
                setIsForm1Valid(true);
            }
        }
    }

    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);

        if (value.length < 2) {
            setLastNameError('Last name must be at least 2 characters');
            setIsForm1Valid(false); // Set form validation to false
        }
        else if (!value.match(/^[A-Za-z\s]*$/)) {
            // Invalid input, set an error message
            setLastNameError('Last name can only contain letters and spaces');
            setIsForm1Valid(false);
        } else {
            // Input is valid, clear any previous error message
            setLastNameError('');
            // Check if all other fields have no errors to set form validation back to true
            if (!firstNameError && !dobError) {
                setIsForm1Valid(true);
            }
        }
    }

    const handleDOB = (event) => {
        const value = event;
        // setDOB(value);
        setDOB(event);

        // // Regular expression for DD-MM-YYYY format
        // const dobPattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

        // if (!value.match(dobPattern)) {
        //     // Invalid input, set an error message
        //     setDOBError('Date of birth must be in DD-MM-YYYY format');
        //     setIsForm1Valid(false);
        // } else {
        //     // Input is valid, clear any previous error message
        //     setDOBError('');
        //     // Check if all other fields have no errors to set form validation back to true
        //     if (!firstNameError && !lastNameError) {
        //         setIsForm1Valid(true);
        //     }
        // }
    }

    const handleNextForm = () => { setNextForm(false); }

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);

        // Regular expression for validating a 10-digit numeric phone number
        const phonePattern = /^[0-9]{10}$/;

        if (!value.match(phonePattern)) {
            setPhoneError('Invalid phone number (must be 10-digit)');
            setIsGenerateOtpFormValid(false);
            setIsPhoneValid(false);
        } else {
            setPhoneError('');
            setIsGenerateOtpFormValid(true);
            setIsPhoneValid(true);
        }
    }

    const handleGenerateOTP = () => {
        // Check if the phone number is valid before generating OTP
        if (isGenerateOtpFormValid) {
            // Generate and send OTP logic here
            const otp = Math.floor(100000 + Math.random() * 900000);
            setConfirmOTP(otp);
            // alert(`Your OTP is: ${otp}`);
            setShowDialog(true);
            setDialogMessage(`Your OTP is: ${otp}`);

            // You can enable the button again after OTP is generated if needed
        } else {
            // Display an error message or prevent OTP generation
        }
    };

    const handleOTPChange = (event) => {
        const value = event.target.value;
        setOTP(value);

        // Regular expression for validating a 6-digit numeric OTP
        const otpPattern = /^[0-9]{6}$/;

        if (!value.match(otpPattern)) {
            setOTPError('Invalid OTP (should be 6 digits)');
            setIsOtpFormValid(false);
        } else {
            setOTPError('');
            setIsOtpFormValid(true); // Check if OTP matches confirmOTP
        }
    }

    const handleVerifyOTP = () => {
        const otpInt = parseInt(otp, 10);
        const confirmOTPInt = parseInt(confirmOTP, 10);

        if (!isNaN(otpInt) && !isNaN(confirmOTPInt) && otpInt === confirmOTPInt) {
            // OTP is verified
            setIsOTPVerified(true);
        } else {
            // OTP is not verified
            setIsOTPVerified(false);
            setOTPError('OTP does not match');
        }
    };

    const handlePINChange = (event) => { setPIN(event.target.value); }
    const handleConfirmPINChange = (event) => { setConfirmPIN(event.target.value); }

    const handlePINBlur = () => {
        const pinPattern = /^\d{4}$/; // Regular expression for a 4-digit PIN
        if (!pinPattern.test(pin)) {
            setPinError('PIN must be a 4-digit number.');
            return false;
        } else {
            setPinError(''); // Clear the error message
            return true;
        }
    };

    const handleConfirmPINBlur = () => {
        if (confirmPIN !== pin) {
            setConfirmPINError('PINs do not match.');
            setIsPINValid(false);
            return false;
        } else {
            setConfirmPINError(''); // Clear the error message
            setIsPINValid(true);
            return true;
        }
    };

    const handlePasswordChange = (event) => { setPassword(event.target.value); }
    const handleConfirmPasswordChange = (event) => { setConfirmPassword(event.target.value); }

    const handlePasswordBlur = () => {
        // Requires at least one letter and one number, and length between 6 and 20 characters
        const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\-]{6,20}$/;
        if (!passwordPattern.test(password)) {
            setPasswordError('Password must be between 6 and 20 characters and contain at least one letter, one special character and one number.');
            return false;
        } else {
            setPasswordError(''); // Clear the error message
            return true;
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
            setIsPasswordValid(false);
            return false;
        } else {
            setConfirmPasswordError(''); // Clear the error message
            setIsPasswordValid(true);
            return true;
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        // Regular expression for validating email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!value.match(emailPattern)) {
            setEmailError('Invalid email address');
            setIsEmailValid(false);
        } else {
            setEmailError('');
            setIsEmailValid(true);
        }
    }

    const handleAddressChange = (event) => { setAddress(event.target.value); }
    const handleCityChange = (event) => { setCity(event.target.value); }
    const handleStateChange = (event) => { setState(event.target.value); }
    const handleCountryChange = (event) => { setCountry(event.target.value); }


    // State variables to track the validity of each input
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isPINValid, setIsPINValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const isRegistrationFormValid = () => {
        return (
            isEmailValid &&
            isPhoneValid &&
            isPINValid &&
            isPasswordValid &&
            isOTPVerified
        );
    };

    const handleRegistration = async () => {
        try {
            const phoneNumberInt = parseInt(phone, 10);

            //const parts = dob.split('-');
            //const day = parseInt(parts[0], 10);
            //const month = parseInt(parts[1], 10) - 1; // Months are 0-based (0 = January, 1 = February, etc.)
            // const year = parseInt(parts[2], 10);

            //const dobTimestamp = new Date(year, month, day).getTime().toString();
            const dobTimestamp = Date.parse(dob).toString();

            const userData = {
                "firstName": firstName,
                "lastName": lastName,
                "dob": dobTimestamp,
                "email": email,
                "address": address,
                "city": city,
                "state": state,
                "country": country,
                "phoneNumber": phoneNumberInt,
                "passwordHash": pin + password
            };

            const response = await axios.post('http://localhost:9092/users/api/users/register', userData);
            console.log(response)

            if (response.status === 201) {
                // Registration successful
                const { message, custId, debitCardNumber, expiry, cvv } = response.data;

                console.log(message);

                // Show an alert with the additional information
                // alert(`Registration Successful!\nCust ID: ${custId}\nDebit Card Number: ${debitCardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`);

                setShowDialog(true);
                setDialogMessage(`Registration Successful!\nCust ID: ${custId}\nDebit Card Number: ${debitCardNumber}\nExpiry: ${expiry}\nCVV: ${cvv}`);

                console.log('User registration successful');
            } else {
                // Handle registration failure
                // alert('User registration failed');
                setShowDialog(true);
                setDialogMessage('User registration failed.');

                console.error('User registration failed');
            }
        } catch (error) {
            // Handle any errors that occur during the registration process

            setShowDialog(true);
            setDialogMessage('Error registering user. Catch block');

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
                                                    required // This attribute makes the field required
                                                    minLength='2' // Minimum length of 2 characters
                                                    maxLength='50' // Maximum length of 50 characters
                                                    pattern='^[A-Za-z\s]*$' // Pattern to allow only letters and spaces
                                                />
                                                {firstNameError && (
                                                    <div className='error-message'>{firstNameError}</div>
                                                )}
                                                <br />
                                                <label className='labelLastName'><b>Last name</b></label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Last Name'
                                                    vlaue={lastName}
                                                    onChange={handleLastName}
                                                    required
                                                    minLength='2'
                                                    maxLength='50'
                                                    pattern='^[A-Za-z\s]*$'
                                                />
                                                {lastNameError && (
                                                    <div className='error-message'>{lastNameError}</div>
                                                )}
                                                <br />

                                                <label className='labelDOB'><b>Date of birth (DD-MM-YYYY)</b></label><br />
                                                {/* <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Enter Date of birth'
                                                    vlaue={dob}
                                                    onChange={handleDOB}
                                                    required
                                                /> */}
                                                <ReactDatePicker customInput={<CustomDateInput />} selected={dob} onChange={handleDOB} dateFormat="dd-MM-yyyy" />

                                                {/* {dobError && (
                                                    <div className='error-message'>{dobError}</div>
                                                )} */}
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
                                <button href='/' className='prim-colr btn'>
                                    <Link className='prim-colr' to={"/login"}>Cancel</Link>
                                </button>
                                <button className='nextButton' disabled={!isForm1Valid} onClick={handleNextForm}>Next</button>
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
                                            required
                                        />
                                        {emailError && (
                                            <div className='error-message'>{emailError}</div>
                                        )}
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
                                                required
                                            />
                                            {phoneError && (
                                                <div className='error-message'>{phoneError}</div>
                                            )}
                                            <button className='nextButton' onClick={handleGenerateOTP} disabled={!isGenerateOtpFormValid}>Generate OTP</button>
                                            
                                        </div>

                                        <div className='inputAndButtonInline'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Enter OTP'
                                                value={otp}
                                                onChange={handleOTPChange}
                                                required
                                            />
                                            {otpError && (
                                                <div className='error-message'>{otpError}</div>
                                            )}
                                            <button className='nextButton' onClick={handleVerifyOTP} disabled={!isOtpFormValid}>Verify</button>
                                        </div>
                                    </div>

                                    <hr />

                                    {isOTPVerified && (<div className='pinPasswordSetup p-2'>
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
                                                required
                                                onBlur={handlePINBlur}
                                            />
                                            {pinError && (
                                                <div className='error-message'>{pinError}</div>
                                            )}
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
                                                required
                                                onBlur={handleConfirmPINBlur}
                                            />
                                            {confirmPINError && (
                                                <div className='error-message'>{confirmPINError}</div>
                                            )}
                                        </div>

                                        <br />
                                        <div className='passwordSetup'>
                                            <label className='labelPasswordSetup'><b>Choose your online banking password</b><br />
                                                <span className='labelPasswordSetup-span'>Password must be between 6 and 20 characters and a combination of letters and numbers (with no space or symbols).</span>
                                            </label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                placeholder='Enter password'
                                                value={password}
                                                onChange={handlePasswordChange}
                                                required
                                                onBlur={handlePasswordBlur}
                                            />
                                            {passwordError && (
                                                <div className='error-message'>{passwordError}</div>
                                            )}
                                        </div>
                                        <br />
                                        <div className='confirmPasswordSetup'>
                                            <label className='labelConfirmPasswordSetup'><b>Confirm your Password</b></label>
                                            <input
                                                type='password'
                                                className='form-control'
                                                placeholder='Confirm password'
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                required
                                                onBlur={handleConfirmPasswordBlur}
                                            />
                                            {confirmPasswordError && (
                                                <div className='error-message'>{confirmPasswordError}</div>
                                            )}
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                            <div className='p-2'>
                                <button className='nextButton' onClick={handleRegistration} disabled={!isRegistrationFormValid()}>Register</button>
                                {
                                    isOTPVerified ? (<RegistrationSuccessDialog
                                        isOpen={showDialog}
                                        message={dialogMessage}
                                        onClose={handleCloseDialog}
                                    />) : (<OtpDialog
                                        isOpen2={showDialog}
                                        message2={dialogMessage}
                                        onClose2={handleCloseDialog2}
                                    />)
                                }
                                
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



export function RegistrationSuccessDialog(props) {
    const { isOpen, message, onClose } = props;

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function OtpDialog(props2) {
    const { isOpen2, message2, onClose2 } = props2;

    return (
        <Modal show={isOpen2} onHide={onClose2}>
            <Modal.Body>
                <p>{message2}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose2}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}