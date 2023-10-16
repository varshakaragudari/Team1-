import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Sidebar from "../components/Sidebar";
import OneLineFooter from "../components/OneLineFooter";
import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function DepositMoney() {
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [currAccNum, setCurrAccNum]=useState(null);
  const [amount, setAmount]=useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleCloseDialog = () => {
        setShowDialog(false);
  }

  async function depositMoneytoServer() {
    await axios.put(`http://localhost:8040/accounts/addAmountToCurrentAccount/${currAccNum}/${amount}`).then(async data=> {
      console.log(data);
      

      if (data.data) {
        const txndata= {
          "timestamp": Date.now().toString(),
          "roundUp": (Math.round((Math.ceil(amount)-amount)*100)/100).toFixed(2),
          "status": "SUCCESS",
          "amountTransferred": amount,
          "receiverAccountNumber": currAccNum,
          "receiverName": "Self",
          "accountNumber": currAccNum,
          "type": "current",
          "remarks": "deposited",
          "transactionFee": 5,
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
                // window.alert("Balance added "+amount);
                setDialogMessage("Amount added:  £"+amount);
        setShowDialog(true);
            });
          }
          
        })
      }
    
    })
  }

  return (
    <>
      <Helmet>
            <title>Deposit Money - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="Deposit Money"/>
            </div>
            <div className="col-lg-10 m-0 p-0">
              <nav aria-label="breadcrumb" className='p-4'>
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/banking/payment" className='prim-colr'>Payment</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Deposit Money</li>
                </ol>
              </nav>
              <div className="max-width-1 ">
                <div className="p-4">
                  <h1 className="prim-colr">Deposit Money</h1>
                  <div>
                    <label>In which account you want to deposit</label><br/>
                    <select className="form-control" name="selectedOption" onChange={(e) => setCurrAccNum(e.target.value)}>
                      <option value="">Please Select</option>
                      {
                        userData.accounts.map((acc)=> 
                          <option value={acc.accountNumber}>{acc.type} - {acc.accountNumber}</option>
                        )
                      }
                    </select><br/>
                    <label>How much you want to deposit?</label><br/>
                    <input className="form-control" type="number" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)}/>
                    <br/>
                    <button className="natwest-button" onClick={()=>depositMoneytoServer()}>Deposit</button>
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