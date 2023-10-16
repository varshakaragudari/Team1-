import React, { useState } from 'react';
import '../css/ForgotPassword.css';
import HeaderTop from '../components/HeaderTop';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const ForgotPassword = () => {
  const [custId, setCustId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');
  const [confirmOtp, setConfirmOtp] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captcha, setCaptcha] = useState('4879');
  const [confirmCaptcha, setConfirmCaptcha] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // Check if the input is empty
    if (value.trim() === '') {
      setPhoneNumberError('Phone number is required');
      setIsValidPhoneNumber(false);
    } else if (!/^\d+$/.test(value)) {
      // Check if the input consists of only numeric characters
      setPhoneNumberError('Phone number must contain only numbers');
      setIsValidPhoneNumber(false);
    } else if (value.length !== 10) {
      // Check if the phone number has a valid length (e.g., 10 digits)
      setPhoneNumberError('Phone number must have 10 digits');
      setIsValidPhoneNumber(false);
    } else {
      setPhoneNumberError('');
      setIsValidPhoneNumber(true);
    }

    setPhoneNumber(value);
  };

  const handleGenerateOTP = async () => {
    // Check if the phone number is valid before generating OTP
    if (isValidPhoneNumber) {
      try {
        const response = await axios.get(`http://localhost:8999/users/api/users/checkPhoneNumber?custId=${custId}&phoneNumber=${phoneNumber}`);
        const isValid = response.data;

        if (isValid) {
          // Generate and send OTP logic here
          const otp = Math.floor(100000 + Math.random() * 900000);
          setOTP(otp);
          setShowDialog(true);
          setDialogMessage(`Your OTP is: ${otp}`);
        } else {
          setShowDialog(true);
          setDialogMessage("The Customer ID and Phone Number doesn't match.");
        }
      } catch (error) {
        setShowDialog(true);
        setDialogMessage("Error generating OTP.");
      }

      // You can enable the button again after OTP is generated if needed
    } else {
      // Display an error message or prevent OTP generation
      setShowDialog(true);
      setDialogMessage("Enter a valid Phone Number.");
    }
  };

  const handleOTPChange = (event) => {
    const value = event.target.value;
    setConfirmOtp(value);

    // Regular expression for validating a 6-digit numeric OTP
    const otpPattern = /^[0-9]{6}$/;

    if (!value.match(otpPattern)) {
      setOTPError('Invalid OTP (should be 6 digits)');
    } else {
      setOTPError('');
    }
  }

  const handleVerifyOTP = () => {
    const otpInt = parseInt(otp, 10);
    const confirmOTPInt = parseInt(confirmOtp, 10);

    if (!isNaN(otpInt) && !isNaN(confirmOTPInt) && otpInt === confirmOTPInt) {
      // OTP is verified
      setIsOTPVerified(true);
      setDisable(false);
    } else {
      // OTP is not verified
      setIsOTPVerified(false);
      setDisable(true);
      setPasswordChanged(false);
    }
  };

  const generateRandomCaptcha = () => {
    // Generate a random 4-digit number as the CAPTCHA.
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(randomCaptcha.toString());
  };

  const handleNewPinChange = (e) => {
    const pinValue = e.target.value;

    // Use a regular expression to validate a 4-digit pin
    if (/^\d{4}$/.test(pinValue)) {
      setNewPin(pinValue);
      setPinError(''); // Clear the error if the pin is valid
    } else {
      setNewPin(pinValue);
      setPinError('Please enter a valid 4-digit PIN.');
    }
  }

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
  };

  const handleNewPasswordBlur = () => {
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,./\\-]{6,20}$/;
    if (!passwordPattern.test(newPassword)) {
      setPassword1Error('Password must be between 6 and 20 characters and contain at least one letter, one special character and one number.');
    } else {
      setPassword1Error(''); // Clear the error message
    }
  };

  const handleReenterPasswordChange = (e) => {
    const reenterPasswordValue = e.target.value;
    setReenterPassword(reenterPasswordValue);

    // Check if the passwords match
    if (newPassword !== reenterPasswordValue) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if newPassword and reenterPassword match.
    if (newPassword !== reenterPassword) {
      // alert('Passwords do not match. Please re-enter your password.');
      setShowDialog(true);
      setDialogMessage('Passwords do not match. Please re-enter your password.');
      return;
    }
    // Check if captcha match.
    if (captcha !== confirmCaptcha) {
      // alert('Captcha do not match');
      setShowDialog(true);
      setDialogMessage('Captcha do not match.');
      return;
    }

    try {
      const custIdString = custId.toString();
      const newPinString = newPin.toString();
      const newPasswordString = newPassword.toString();
      const newPasswordHashString = newPinString + newPasswordString;

      // Send a request to your API to update the password
      const response = await axios.put(`http://localhost:8999/users/api/users/updatePassword?custId=${custIdString}&newPassword=${newPasswordHashString}`);

      if (response.status === 200) {
        // Password changed successfully
        setPasswordChanged(true);
      } else {
        // Handle errors from the API, such as incorrect custId or other issues.
        // alert('Password change failed. Please try again.');
        setShowDialog(true);
        setDialogMessage('Password change failed. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setShowDialog(true);
      setDialogMessage('Password change failed. Please try again. Catch block');
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop />
      <div className="d-flex flex-row">
        <div className='password'>
          <div className="container forgot-password-container p-4 my-5">
            <h2>Forgot Password</h2>
            {!passwordChanged ? (
              <form onSubmit={handleResetPassword}>
                {/* Customer ID */}
                <div className="mb-3">
                  <label htmlFor="custId" className="form-label">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="custId"
                    placeholder="Enter Customer ID"
                    value={custId}
                    onChange={(e) => setCustId(e.target.value)}
                    required
                  />
                </div>
                {/* Verify Phone */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Enter your Phone Number registered with the account
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                  {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
                  <button
                    className='btn btn-danger'
                    onClick={handleGenerateOTP}
                  >
                    Generate OTP
                  </button>
                  <OtpDialog
                    isOpen={showDialog}
                    message={dialogMessage}
                    onClose={handleCloseDialog}
                  />
                </div>
                {/* Verify OTP */}
                <div className="mb-3">
                  <label htmlFor="validOtp" className="form-label">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validOtp"
                    placeholder="Enter OTP"
                    value={confirmOtp}
                    onChange={handleOTPChange}
                    maxLength='6'
                    required
                  />
                  {otpError && <div className="text-danger">{otpError}</div>}
                  <button
                    className='btn btn-success'
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </button>
                  {/* <OtpDialog
                    isOpen={showDialog}
                    message={dialogMessage}
                    onClose={handleCloseDialog}
                  /> */}
                </div>
                {/* Show below only if phone verified */}
                {isOTPVerified && (
                  <div>
                    {/* Pin */}
                    <div className="mb-3">
                      <label htmlFor="newPin" className="form-label">
                        New/Old Pin (It is used with your password during authentication)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="newPin"
                        placeholder="Enter Pin"
                        value={newPin}
                        onChange={handleNewPinChange}
                        maxLength='4'
                        required
                      />
                      {pinError && <div className="error-message">{pinError}</div>}
                    </div>
                    {/* New Password */}
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        maxLength='20'
                        required
                        onBlur={handleNewPasswordBlur}
                      />
                      {password1Error && <div className="error-message">{password1Error}</div>}
                    </div>
                    {/* Confirm New Password */}
                    <div className="mb-3">
                      <label htmlFor="reenterPassword" className="form-label">
                        Re-enter Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="reenterPassword"
                        placeholder="Re-enter new password"
                        value={reenterPassword}
                        maxLength='20'
                        onChange={handleReenterPasswordChange}
                        required
                      />
                      {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    {/* Captcha Verification */}
                    <div className="mb-3">
                      <label htmlFor="captcha" className="form-label">
                        CAPTCHA Verification
                      </label>
                      <div className="captcha-container">
                        <span>{captcha}</span>
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={generateRandomCaptcha}
                        >
                          Refresh
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="captcha"
                        placeholder="Enter the CAPTCHA above"
                        value={confirmCaptcha}
                        onChange={(e) => setConfirmCaptcha(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={disable}>
                  Reset Password
                </button>
                <PasswordChangeSuccessDialog
                  isOpen={showDialog}
                  message={dialogMessage}
                  onClose={handleCloseDialog}
                />
              </form>
            ) : (
              <div className="password-changed-message">
                Your password has been changed successfully!<br />
                <a href="/login" className="btn btn-primary" style={{backgroundColor:"#5e10b1",borderColor:"#5e10b1",color:"#fff",margin:"10px"}}>login</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;




export function PasswordChangeSuccessDialog(props) {
  const { isOpen, message, onClose } = props;

  return (
    <Modal show={isOpen} onHide={onClose} contentLabel="Password Changed">
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

export function OtpDialog(props) {
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