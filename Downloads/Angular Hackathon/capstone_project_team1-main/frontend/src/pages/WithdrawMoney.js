import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Sidebar from "../components/Sidebar";
import OneLineFooter from "../components/OneLineFooter";
import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { Row ,Col, Modal, Button} from "react-bootstrap";

export default function WithdrawMoney() {
  const [currentAccounts, setCurrentAccounts] = useState({});
  const [savingsAccounts, setSavingsAccounts] = useState({});
  const [selectedCurrentAccount, setSelectedCurrentAccount] = useState("");
  const [selectedSavingsAccount, setSelectedSavingsAccount] = useState("");
  const [amountToWithdraw, setAmountToWithdraw] = useState("");
  const [userId, setUserId] = useState(JSON.parse(sessionStorage.getItem("userdata")).userId);
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [successAlert,setsuccessAlert] = useState("none");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleCloseDialog = () => {
        setShowDialog(false);
  }

  // Function to fetch account data
  const fetchAccounts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8999/accounts/getCurrrent/userId/${userId}`);
      const currentAccountsData = response.data;
      setCurrentAccounts(currentAccountsData);

      const response2 = await axios.get(`http://localhost:8999/accounts/getSaving/userId/${userId}`);
      const savingsAccountsData = response2.data;
      setSavingsAccounts(savingsAccountsData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Fetch accounts data when the component mounts
  useEffect(() => {
    // axios
    //   .get("YOUR_USER_API_ENDPOINT_HERE")
    //   .then((response) => {
    //     const userData = response.data; // Assuming user details are in response.data
    //     const userUserId = userData.userId; // Extract userId from user data
    //     setUserId(userUserId); // Set the userId state
    //     fetchAccounts(userUserId); // Fetch accounts using the retrieved userId
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user details:", error);
    //   });
    //const userId = "sarath15102001"; // Replace with the actual user ID
    fetchAccounts(userData.userId);
  }, []);
  const transferBetweenAccountsFromCurrentToSaving = async () => {
    try {
      const currentAccountNumber = selectedCurrentAccount; // Replace with the selected current account number
      const amountToTransfer = parseFloat(amountToWithdraw);
      const savingAccountNumber = selectedSavingsAccount; // Replace with the selected savings account number
  
      if (isNaN(amountToTransfer)) {
        // Handle invalid input (e.g., show an error message)
        console.error("Invalid amount to withdraw");
        // alert("Invalid amount to withdraw");
        setDialogMessage("invalid amount to withdraw");
        setShowDialog(true);
        return;
      }
  
  
      const response = await axios.get(
        `http://localhost:8999/accounts/withdrawl/${currentAccountNumber}/${amountToTransfer}/${savingAccountNumber}`
      ).then(async data=> {
        console.log(data);
        if(data.status===200){
          console.log("Transfer successful");
          // alert("Transfer successful");
          setDialogMessage("Balance added to savings account: £"+amountToTransfer);
        setShowDialog(true);
        }
        else{
          console.log("failed transaction");
          setDialogMessage("transaction failed");
        setShowDialog(true);
        }
        
        if (data.data) {
          const txndata= {
            "timestamp": Date.now().toString(),
            "roundUp": 0,
            "status": "SUCCESS",
            "amountTransferred": amountToTransfer,
            "receiverAccountNumber": savingAccountNumber,
            "receiverName": "Self",
            "accountNumber": currentAccountNumber,
            "type": "current",
            "remarks": "withdrawn",
            "transactionFee": 0,
            "userId": userData.userId
          }
          await axios.post("http://localhost:8020/transaction/transactions", txndata)
          .then(async data2=> {
            console.log(data2);
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
                  setsuccessAlert("block")
              });
            }
            
          })
        }
      
      });
  
    
    } catch (error) {
      console.error("Error transferring money:", error);
      // alert("Error transferring money");
      setDialogMessage("error transferring money");
        setShowDialog(true);
    }
  };
  const handleWithdrawClickCTS = () => {
    transferBetweenAccountsFromCurrentToSaving();

    setSelectedCurrentAccount("");
  setSelectedSavingsAccount("");
  setAmountToWithdraw("");
    // You can add additional logic or validation here if needed
  };
  const transferBetweenAccountsFromSavingToCurrent = async () => {
    try {
      const currentAccountNumber = selectedCurrentAccount; // Replace with the selected current account number
      const amountToTransfer = parseFloat(amountToWithdraw);
      const savingAccountNumber = selectedSavingsAccount; // Replace with the selected savings account number
  
      if (isNaN(amountToTransfer)) {
        // Handle invalid input (e.g., show an error message)
        console.error("Invalid amount to withdraw");
        // alert("Invalid amount to withdraw");
        setDialogMessage("invalid amount to withdraw");
        setShowDialog(true);
        return;
      }
  
  
      const response = await axios.get(
        `http://localhost:8999/accounts/withdrawlSTC/${savingAccountNumber}/${amountToTransfer}/${currentAccountNumber}`
      ).then(async data=> {
        console.log(data);
        if(data.status===200){
          console.log("Transfer successful");
          // alert("Transfer successful");
          setDialogMessage("Balance added to current account: £"+amountToTransfer);
        setShowDialog(true);
        }
        else{
          console.log("failed transaction");
          setDialogMessage("transaction failed");
        setShowDialog(true);
        }
        
        if (data.data) {
          const txndata= {
            "timestamp": Date.now().toString(),
            "roundUp": 0,
            "status": "SUCCESS",
            "amountTransferred": amountToTransfer,
            "receiverAccountNumber": currentAccountNumber,
            "receiverName": "Self",
            "accountNumber": savingAccountNumber,
            "type": "saving",
            "remarks": "withdrawn",
            "transactionFee": 0,
            "userId": userData.userId
          }
          await axios.post("http://localhost:8020/transaction/transactions", txndata)
          .then(async data2=> {
            console.log(data2);
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
                  setsuccessAlert("block")
              });
            }
            
          })
        }
      
      });
  
    
    } catch (error) {
      console.error("Error transferring money:", error);
      // alert("Error transferring money");
      setDialogMessage("error transferring money");
        setShowDialog(true);
    }
  };
  

  const handleWithdrawClickSTC = () => {
    transferBetweenAccountsFromSavingToCurrent();

    setSelectedCurrentAccount("");
  setSelectedSavingsAccount("");
  setAmountToWithdraw("");
    // You can add additional logic or validation here if needed
  };

  
  
  
  
  
  









  return (
    <>
      <Helmet>
            <title>Withdraw Money - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="Withdraw Money"/>
            </div>
            <div className="col-lg-10 m-0 p-0">
              <nav aria-label="breadcrumb" className='p-2'>
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/banking/payment" className='prim-colr'>Payment</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Withdraw Money</li>
                </ol>
              </nav>
              <div className="max-width-1">
                <div className="p-4">
                  <h1 className="prim-colr">Withdraw Money</h1>
                  
                  
                    <div className="abc">
                  <label>Select a Savings Account:</label><br />
                  <select
                      className="form-control"
                      name="selectedSavingsAccount"
                      value={selectedSavingsAccount}
                      onChange={(e) => setSelectedSavingsAccount(e.target.value)}
                    >
                      <option value="">Please Select</option>
                      {savingsAccounts && (
                        <option value={savingsAccounts.accountNumber}>
                          {savingsAccounts.accountHolderName}-{savingsAccounts.accountNumber}
                        </option>
                      )}
                    </select>
                  <br />

                    <label>How much you want to withdraw?</label><br/>
                    <input className="form-control" type="number" placeholder="Enter amount" value={amountToWithdraw}
                    onChange={(e) => setAmountToWithdraw(e.target.value)}/>
                    <br/>
                    <label>Select a Current Account:</label><br />
                  <select
                    className="form-control"
                    name="selectedCurrentAccount"
                    value={selectedCurrentAccount}
                    onChange={(e) => setSelectedCurrentAccount(e.target.value)}
                  >
                    <option value="">Please Select</option>
                    {currentAccounts && (
                      <option value={currentAccounts.accountNumber}>
                        {currentAccounts.accountHolderName}-{currentAccounts.accountNumber}
                      </option>
                    )}
                  </select>
                    <br />
                    <button className="natwest-button" onClick={handleWithdrawClickSTC}>Withdraw</button>
                    <LoginDialog show={showDialog} handleClose={handleCloseDialog} message={dialogMessage} />
                  </div>
                    
                    
                    <div className="abc">
                  <label>Select a Current Account:</label><br />
                  <select
                    className="form-control"
                    name="selectedCurrentAccount"
                    value={selectedCurrentAccount}
                    onChange={(e) => setSelectedCurrentAccount(e.target.value)}
                  >
                    <option value="">Please Select</option>
                    {currentAccounts && (
                      <option value={currentAccounts.accountNumber}>
                        {currentAccounts.accountHolderName}-{currentAccounts.accountNumber}
                      </option>
                    )}
                  </select>
                  <br />

                    <label>How much you want to withdraw?</label><br/>
                    <input className="form-control" type="number" placeholder="Enter amount" value={amountToWithdraw}
                    onChange={(e) => setAmountToWithdraw(e.target.value)}/>
                    <br/>
                    <label>Select a Savings Account:</label><br />
                    <select
                      className="form-control"
                      name="selectedSavingsAccount"
                      value={selectedSavingsAccount}
                      onChange={(e) => setSelectedSavingsAccount(e.target.value)}
                    >
                      <option value="">Please Select</option>
                      {savingsAccounts && (
                        <option value={savingsAccounts.accountNumber}>
                          {savingsAccounts.accountHolderName}-{savingsAccounts.accountNumber}
                        </option>
                      )}
                    </select>
                    <br />
                    <button className="natwest-button" onClick={handleWithdrawClickCTS}>Withdraw</button>
                    <LoginDialog show={showDialog} handleClose={handleCloseDialog} message={dialogMessage} />
                  </div>
                  
                  
                  
                  
                </div>
              </div>
              <OneLineFooter/>
            </div>
        </div>
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