import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar";
import backicon from '../images/Icons/Champion_ChevronLeft_32x32.png'
import ReactCreditCard from "react-credit-cards";
import { useState } from "react";
import 'react-credit-cards/es/styles-compiled.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import successtick from '../images/tickcoin.svg'
import failedcross from '../images/xcircle.svg'
import HeaderTop from "../components/HeaderTop";
import OneLineFooter from "../components/OneLineFooter";
import axios from "axios";
import { useEffect } from "react";

const CustomExpiryInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control"
      placeholder="MM/YY"
      value={value}
      onClick={onClick}
      readOnly
    />
);

export default function DebitCardPayment() {
    const [inCardNum, setInCardNum]=useState("");
    const [inCardExpiry, setInCardExpiry]=useState(null);
    const [inCardCVV, setInCardCVV]=useState("");
    
    const [payAmount, setPayAmount]=useState(null);
    const [otp, setOtp]=useState(null);
    const [debitpin, setDebitpin]=useState(null);
    const [isInvalidCardnum, setIsInvalidCardnum]=useState(null);
    const [isInvalidCardcvv, setIsInvalidCardcvv]=useState(null);
    const [isInvalidCardexpiry, setIsInvalidCardexpiry]=useState(null);
    const [isInvalidotp, setIsInvalidotp]=useState(null);
    const [isInvalidpin, setIsInvalidpin]=useState(null);
    const [receiverAccountNum, setReceiverAccountNum]=useState(null);
    const [receiverMerchantId, setReceiverMerchantId]=useState(null);
    const [verified, setVerified]=useState(false);
    const [validated, setValidated]=useState(false);
    const [authorise, setAuthorise]=useState(false);
    const [amountfilled, setAmountfilled]=useState(false);
    const [isInvalidrecipient, setIsInvalidrecipient]=useState(null);
    const [paymentDone, setPaymentDone]=useState(false);
    const [failed, setFailed]=useState(false);
    const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
    const [transaction, setTransaction]=useState(null);
    const [currentAccounts, setCurrentAccounts] = useState({});
    const [savingsAccounts, setSavingsAccounts] = useState({});
    const [inCardName, setInCardName]=useState(JSON.parse(sessionStorage.getItem("userdata")).firstName+" "+JSON.parse(sessionStorage.getItem("userdata")).lastName);
    const handleDateChange = (date) => {
        setInCardExpiry(date);
    };

    useEffect(()=> {
        getBalance();
    }, []);

    async function getBalance() {
        const response = await axios.get(`http://localhost:8999/accounts/getCurrrent/userId/${userData.userId}`);
        const currentAccountsData = response.data;
        setCurrentAccounts(currentAccountsData);

        const response2 = await axios.get(`http://localhost:8999/accounts/getSaving/userId/${userData.userId}`);
        const savingsAccountsData = response2.data;
        setSavingsAccounts(savingsAccountsData);
    }

    const handleCVVChange = (cvv) => {
        setInCardCVV(cvv.target.value);
    };

    const handleCardNumChange = (num) => {
        setInCardNum(num.target.value.replace(/\s+/g, ''));
    }

    const handleReceiverAccountNumChange = (num) => {
        setReceiverAccountNum(num.target.value);
    }

    const handleReceiverMerchantIdChange = (num) => {
        setReceiverMerchantId(num.target.value);
    }

    function formatAsMMYY(date) {
        if (!date) return '';
    
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
    
        return `${month}/${year}`;
    };

    function verifyCard() {
        setIsInvalidCardnum("is-invalid")
        if(formatAsMMYY(inCardExpiry).toString()==userData.cards[0].expiry.toString() && inCardNum==userData.cards[0].cardNumber && inCardCVV.length==3 && inCardCVV==userData.cards[0].cvv) {
            
            setIsInvalidCardnum("is-valid");
            setIsInvalidCardcvv("is-valid");
            setIsInvalidCardexpiry("is-valid");
            setVerified(true);
        } else {
            if (inCardNum==null || inCardNum.length!=16) {
                setIsInvalidCardnum("is-invalid")
            } else {
                setIsInvalidCardnum("is-valid");
            }

            if (inCardCVV==null || inCardCVV.length!=3) {
                setIsInvalidCardcvv("is-invalid")
            } else {
                setIsInvalidCardcvv("is-valid");
            }

            if (inCardExpiry==null ) {
                setIsInvalidCardexpiry("is-invalid")
            } else {
                setIsInvalidCardexpiry("is-valid");
            }
        }
    }

    function validateReciever() {
        if (receiverMerchantId!=null && receiverMerchantId.length==14) {
            setValidated(true)
            setIsInvalidrecipient("is-valid");
            // axios.get("http://localhost:8040/accounts/getCurrent/account/"+receiverMerchantId).then((data)=> {

            // })
        } else if (receiverAccountNum!=null && receiverAccountNum.length==14) {
            setValidated(true)
            setIsInvalidrecipient("is-valid");
        } else {
            setIsInvalidrecipient("is-invalid");
        }
    }

    const handleOtpChange = (num) =>{
        setOtp(num.target.value)
    }

    const handlePinChange = (num) =>{
        setDebitpin(num.target.value)
    }

    const handlePayAmountChange=(num)=> {
        setPayAmount(num.target.value)
    }

    async function completePayment() {
        if (otp!=null && otp.length==6 && otp=="123456" && debitpin!=null && debitpin.length==4 && debitpin=="1212") {
            setIsInvalidotp("is-valid");
            setIsInvalidpin("is-valid");
            if (parseFloat(payAmount)>=10000) {
                setFailed(true);
                setPaymentDone(true);
            } else {
                const currBal=parseFloat(currentAccounts.balance-Math.ceil(payAmount));
                const savBal=parseFloat(savingsAccounts.balance+(Math.round((Math.ceil(payAmount)-payAmount)*100)/100).toFixed(2));
                console.log(currBal);
                console.log(savBal);
                await axios.put(`http://localhost:8999/accounts/updateCurrentBalance/${userData.userId}/${currBal}`).then(async datax=> {
                    await axios.put(`http://localhost:8999/accounts/updateSavingBalance/${userData.userId}/${savBal}`).then(async data=> {
                        if (data.data) {
                            const txndata= {
                              "timestamp": Date.now().toString(),
                              "roundUp": (Math.round((Math.ceil(payAmount)-payAmount)*100)/100).toFixed(2),
                              "status": "SUCCESS",
                              "amountTransferred": payAmount,
                              "receiverAccountNumber": "38569156431455",
                              "receiverName": "Mr. Charles",
                              "accountNumber": userData.accounts[1].accountNumber,
                              "type": "current",
                              "remarks": "amount transferred through Debit card",
                              "transactionFee": 5,
                              "userId": userData.userId
                            }
                            await axios.post("http://localhost:8020/transaction/transactions", txndata)
                            .then(async data2=> {
                              console.log(data2);
                              setTransaction(data2.data);
                              if (data2.data) {
                                const activitydata = 
                                    {
                                      userId: userData.userId,
                                      type: "Finance",
                                      description: "New transaction performed with txn id "+data2.data.transactionId,
                                      timestamp: Date.now().toString(),
                                      ipAddress: "102.5.15.11"
                                  }
                                await axios.post('http://localhost:8010/activity/new', activitydata).then(data3=> {
                                    console.log(data3);
                                    setFailed(false);
                                    setPaymentDone(true);
                                });
                              }
                              
                            })
                          }  
                    })
                      
                })
                
                
            }
            

        } else {
            if (otp==null || otp.length!=6 || otp!=="123456") {
                setIsInvalidotp("is-invalid");
            }

            if (debitpin==null || debitpin.length!=4 || debitpin!=="1212") {
                setIsInvalidpin("is-invalid");
            }
            
        }
    }

    function enablePayment() {
        setAmountfilled(true);
    }

    function payauthorise() {
        setAuthorise(true);
    }

    function getCurrentDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const currentTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

        return currentTime;
    }

    return (
        <>
            <Helmet>
                <title>Pay using Debit Card</title>
            </Helmet>
            <HeaderTop/>
            <div className="row">
                <div className="col-lg-2 p-0 m-0">
                    <Sidebar currentPage="Make Payment"/>
                </div>
                <div className="col-lg-10 m-0 p-0">
                    <div className="p-4">
                        {
                            !paymentDone && (
                                <>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <a href="/banking/payment" className="m-2"><img src={backicon} alt="back-arrow-icon"/></a>
                                        <h1 className="header-text-style m-2">Pay using Debit card</h1>
                                    </div>
                                    <div className="row mt-4 d-flex align-items-center">
                                        <div className="col-md-4">
                                            <ReactCreditCard
                                                cvc={inCardCVV}
                                                expiry={formatAsMMYY(inCardExpiry)}
                                                name={inCardName}
                                                number={inCardNum}
                                                />
                                        </div>
                                        <div className="col-md-8">
                                            {
                                                !verified &&
                                                (<div>
                                                    <h2 className="h2-regular m-4">Verify your debit card details</h2>
                                                    <div>
                                                        <div class="m-4">
                                                            <label for="cardnumber">Card number</label>
                                                            <input type="text" style={{width:"400px"}} maxLength={19} value={inCardNum.length!=0?inCardNum.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '):inCardNum} className={`form-control ${isInvalidCardnum!=null?isInvalidCardnum:''}`} id="cardnumber" onChange={handleCardNumChange} placeholder="Enter 16-digit card number"/>
                                                            {
                                                                isInvalidCardnum=="is-invalid" && <small className="text-danger">Card number is wrong</small>
                                                            }
                                                            
                                                        </div>
                                                        <div className="row m-2">
                                                            <div className="col">
                                                                <label for="cardexpiry">Valid through</label><br/>
                                                                <ReactDatePicker customInput={<CustomExpiryInput/>} selected={inCardExpiry} onChange={handleDateChange} dateFormat="MM/yy" showMonthYearPicker/>
                                                                <br/>{
                                                                    isInvalidCardexpiry=="is-invalid" && <small className="text-danger">Expiry date invalid</small>
                                                                }
                                                            </div>
                                                            <div className="col">
                                                                <label for="cardcvv">CVV</label>
                                                                <input type="text" style={{width:"200px"}} className={`form-control ${isInvalidCardcvv!=null?isInvalidCardcvv:''}`} maxLength={3} value={inCardCVV}  id="cardcvv" onChange={handleCVVChange} placeholder="CVV"/>
                                                                {
                                                                    isInvalidCardcvv=="is-invalid" && <small className="text-danger">CVV is wrong</small>
                                                                }
                                                            </div>
                                                        </div>
                                                        <button type="button" className="natwest-button m-4" onClick={()=>verifyCard()}>Verify</button>
                                                    
                                                    </div>
                                                </div>)
                                            }

                                            {
                                                verified && (
                                                    <>
                                                        {
                                                            !amountfilled && (
                                                                <div>
                                                                    <h2 className="h2-regular m-4">Receiver details</h2>
                                                                    
                                                                    {
                                                                        !validated && (
                                                                            <div class="m-4">
                                                                                <label for="accountnumber">Account number</label>
                                                                                <input type="text"  maxLength={14} value={receiverAccountNum} className={`form-control ${isInvalidrecipient!=null?isInvalidrecipient:''}`} id="accountnumber" onChange={handleReceiverAccountNumChange} placeholder="Enter valid account number"/>
                                                                                <label>or</label><br/>
                                                                                <label for="merchantId">Wallet/Merchant ID</label>
                                                                                <input type="text" maxLength={14} value={receiverMerchantId} className={`form-control ${isInvalidrecipient!=null?isInvalidrecipient:''}`} id="merchantId" onChange={handleReceiverMerchantIdChange} placeholder="Enter valid merchant id"/>
                                                                                {
                                                                                    isInvalidrecipient=="is-invalid" && <small className="text-danger">Merchant ID/Account no. is invalid</small>
                                                                                }<br/>
                                                                                <button type="button" className="natwest-button mt-4" onClick={()=>validateReciever()}>Validate</button>
                                                                            </div>
                                                                            
                                                                        )
                                                                    }
                                                                    {
                                                                        validated && (
                                                                            <div class="m-4">
                                                                                <p>Receiver Name: <strong>Mr. Charles E. Wington</strong></p>
                                                                                <p>Reciever ID: <strong>{receiverMerchantId?receiverMerchantId:receiverAccountNum}</strong></p>
                                                                                <button type="button" className="natwest-button mt-4" onClick={()=>enablePayment()}>Proceed</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            amountfilled && (
                                                                <div>
                                                                    <h2 className="h2-regular m-4">Amount to pay (upto 2 decimal places)</h2>
                                                                    
                                                                    {
                                                                        !authorise && (
                                                                            <div class="m-4">
                                                                                <p>Receiver Name: <strong>Mr. Charles E. Wington</strong></p>
                                                                                <p>Reciever ID: <strong>{receiverMerchantId?receiverMerchantId:receiverAccountNum}</strong></p>
                                                                                <label for="amount">Amount</label>
                                                                                <input type="number" value={payAmount} className={`form-control`} id="amount" onChange={handlePayAmountChange} placeholder="Enter amount"/>
                                                                                <button type="button" className="natwest-button mt-4" onClick={()=>payauthorise()}>Confirm with OTP</button>
                                                                            </div>
                                                                            
                                                                        )
                                                                    }
                                                                    {
                                                                        authorise && (
                                                                            <div class="m-4">
                                                                                <p>Receiver Name: <strong>Mr. Charles E. Wington</strong></p>
                                                                                <p>Reciever ID: <strong>547894587948778</strong></p>
                                                                                <p>Amount: <strong>£{payAmount}</strong></p>
                                                                                <label for="amount">Enter Debit card Pin</label>
                                                                                <input type="text" maxLength={4} value={debitpin} className={`form-control ${isInvalidpin!=null?isInvalidpin:''}`} id="amount" onChange={handlePinChange} placeholder="Enter 4-digit pin"/>
                                                                                {
                                                                                    isInvalidpin=="is-invalid" && <small className="text-danger">Wrong Pin. try again.</small>
                                                                                }<br/>
                                                                                <label for="amount">One time password(OTP)</label>
                                                                                <input type="text" maxLength={6} value={otp} className={`form-control ${isInvalidotp!=null?isInvalidotp:''}`} id="amount" onChange={handleOtpChange} placeholder="Enter 6-digit otp sent to your phone"/>
                                                                                {
                                                                                    isInvalidotp=="is-invalid" && <small className="text-danger">Wrong OTP. try again.</small>
                                                                                }<br/>
                                                                                <button type="button" className="natwest-button mt-4" onClick={()=>completePayment()}>Pay</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            paymentDone && !failed && transaction && (
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <h2 className="h2-regular m-4">Payment Successful</h2>
                                    <img src={successtick} alt="confirmation tick" height={200}/>
                                    <div className="container card m-2 p-2">
                                        <div className="row">
                                            <div className="col-md">
                                                <small>Transaction Id</small>
                                                <p>{transaction.transactionId}</p>
                                        
                                            </div>  
                                            <div className="col-md">
                                                <small>Paid from</small>
                                                <p>Debit Card {userData.cards[0].cardNumber}</p>       
                                            </div>  
                                        </div>
                                        <div className="row">
                                            <div className="col-md">
                                                <small>Recepient Name</small>
                                                <p>Mr. Charles E. Wington</p>
                                        
                                            </div>  
                                            <div className="col-md">
                                                <small>Recepient ID/Account No.</small>
                                                <p>{receiverMerchantId?receiverMerchantId:receiverAccountNum}</p>       
                                            </div>  
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <small>Date of Payment</small>
                                                <p>{getCurrentDate()}</p>    
                                            </div>
                                            <div className="col">
                                                <small>Time of Payment</small>
                                                <p>{getCurrentTime()}</p>    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <small>Amount Transferred </small>
                                                <p>£{payAmount}</p>    
                                            </div>
                                            <div className="col">
                                                <small>Round ups</small>
                                                <p>£{(Math.ceil(parseFloat(payAmount))-parseFloat(payAmount)).toFixed(2)}</p>    
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/banking" className="natwest-button mt-4">Done</a>
                                </div>
                            )
                        }

                        {
                            paymentDone && failed && (
                                <div className="d-flex justify-content-center align-items-center  flex-column">
                                    <h2 className="h2-regular m-4">Payment failed</h2>
                                    <img src={failedcross} alt="failed cross" height={200}/>
                                    <a href="/banking/payment/pay-using-debit-card" className="natwest-button mt-4">Try again</a>
                                </div>
                            )
                        }
                    </div>
                    <br/>
                    <OneLineFooter/>
                </div>
            </div>
        </>
    )
}