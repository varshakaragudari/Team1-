import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import OneLineFooter from "../components/OneLineFooter";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function MainPayment() {
    const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  // const [userData, setUserdata]=useState([]);
  const [userId,setUserId]=useState("")
  const [CurrentOne,setCurrentOne] = useState();
  const [Savingone,setSavingOne]= useState();
  const [lastUpdate,setLastUpdate]=useState();
  useEffect(()=>{
    getAllAccountsBalance();

    
  },[])
  async function  getAllAccountsBalance(){
    let response = await axios.get("http://localhost:8999/accounts/getCurrrent/userId/"+userData.userId);
    let SavingResponse =  await axios.get("http://localhost:8999/accounts/getSaving/userId/"+userData.userId);
 let Curr= await response.data;
 let Save= await SavingResponse.data;
 let amtt = await Curr.balance;
  let numm =  await Curr.accountNumber;
  let amtt2= await Save.balance;
  let SaveNumm = await Save.accountNumber;
    setCurrentOne( amtt);
     setSavingOne(amtt2);
     let x=userData.accounts[1];
     setLastUpdate((new Date(parseInt(x.lastUpdate))).toString());
  }
  return (
    <>
        <Helmet>
            <title>Payment - NatWest Online Banking</title>
        </Helmet>
        <HeaderTop/>
        <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="Make Payment"/>
            </div>
            <div className="col-lg-10 m-0 p-0">
                <div>
                    <div className="p-4">
                    <nav aria-label="breadcrumb" className='p-2'>
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Payment</li>
                        </ol>
                    </nav>
                        <h1 className="prim-colr">All accounts</h1>
                        <div class="d-flex justify-content-center flex-wrap">
                            
                               
                                    <div style={{backgroundColor: "white", height: "200px", width: "300px", padding: "1rem", borderRadius: "35px", margin: "1rem"}}>
                                        <div className='d-flex align-content-between flex-column'>
                                            <div>
                                                <h4 className="p-0 m-0">Current Account</h4>
                                                <p style={{color: "#5e10b1"}}><sub>Last update: {lastUpdate}</sub></p>
                                                {/* <h3 style={{fontWeight: "600"}}>£{data.accountBalance}</h3> */}
                                                <h3 style={{fontWeight: "600"}}>£{CurrentOne}</h3>
                                            </div>
                                            <p style={{textAlign: "center"}}>{userData.accounts[1].accountNumber}</p>
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: "white", height: "200px", width: "300px", padding: "1rem", borderRadius: "35px", margin: "1rem"}}>
                                    <div className='d-flex align-content-between flex-column'>
                                        <div>
                                            <h4 className="p-0 m-0">Saving Account</h4>
                                            <p style={{color: "#5e10b1"}}><sub>Last update: {lastUpdate}</sub></p>
                                            {/* <h3 style={{fontWeight: "600"}}>£{data.accountBalance}</h3> */}
                                            <h3 style={{fontWeight: "600"}}>£{Savingone}</h3>
                                        </div>
                                        <p style={{textAlign: "center"}}>{userData.accounts[0].accountNumber}</p>
                                    </div>
                                </div>
                                
                            
                            {/* <div style={{backgroundColor: "white", height: "200px", width: "300px", padding: "1rem", borderRadius: "35px", margin: "1rem"}}>
                                <div className='d-flex align-content-between flex-column'>
                                    <div>
                                        <h4 className="p-0 m-0">Savings Account</h4>
                                        <p style={{color: "#5e10b1"}}><sub>Last update: 05 Oct 2023</sub></p>
                                        <h3 style={{fontWeight: "600"}}>£2980.58</h3>
                                    </div>
                                    <p style={{textAlign: "center"}}>31926819 | 60-16-13</p>
                                </div>
                            </div> */}
                        </div>
                        <h2 className="h2-regular txt-align-center">Payment options</h2>
                        <div class="d-flex justify-content-center flex-wrap">
                            {/* <Link to="/banking/payment/send-money" style={{backgroundColor: "white", height: "180px", width: "180px", padding: "0.8rem", borderRadius: "35px", margin: "1rem", textDecoration: "None"}} className='d-flex justify-content-center align-items-center'>
                                <div className="d-flex flex-column">
                                        <h5 style={{textAlign:"center"}}>Send money</h5>
                                        <p style={{color: "#646068", textAlign:"center"}}>to other accounts</p>
                                </div>
                            </Link> */}
                            <Link to="/banking/payment/pay-using-debit-card"  style={{backgroundColor: "white", height: "180px", width: "180px", padding: "0.8rem", borderRadius: "35px", margin: "1rem", textDecoration: "None"}} className='d-flex justify-content-center align-items-center'>
                                <div className="d-flex flex-column">
                                        <h5 style={{textAlign:"center"}}>Debit Card Payment</h5>
                                        <p style={{color: "#646068", textAlign:"center"}}>for faster payment</p>
                                </div>
                            </Link>
                            <Link to="/banking/payment/withdraw-money"  style={{backgroundColor: "white", height: "180px", width: "180px", padding: "0.8rem", borderRadius: "35px", margin: "1rem", textDecoration: "None"}} className='d-flex justify-content-center align-items-center'>
                                <div className="d-flex flex-column">
                                        <h5 style={{textAlign:"center"}}>Withdraw money</h5>
                                        <p style={{color: "#646068", textAlign:"center"}}>from accounts</p>
                                </div>
                            </Link>
                            <Link to="/banking/payment/deposit-money"  style={{backgroundColor: "white", height: "180px", width: "180px", padding: "0.8rem", borderRadius: "35px", margin: "1rem", textDecoration: "None"}} className='d-flex justify-content-center align-items-center'>
                                <div className="d-flex flex-column">
                                        <h5 style={{textAlign:"center"}}>Deposit Money</h5>
                                        <p style={{color: "#646068", textAlign:"center"}}>at your doorstep</p>
                                </div>
                            </Link>
                            {/* <Link to="/banking/payment" style={{backgroundColor: "white", height: "180px", width: "180px", padding: "0.75rem", borderRadius: "35px", margin: "1rem", textDecoration: "None"}} className='d-flex justify-content-center align-items-center'>
                                <div className="d-flex flex-column">
                                        <h5 style={{textAlign:"center"}}>Payment settings</h5>
                                        <p style={{color: "#646068", textAlign:"center"}}>View and manage</p>
                                </div>
                            </Link> */}
                            
                        </div>
                    </div>
                </div>
                <OneLineFooter/>
            </div>
        </div>
        
   </>
  )
}