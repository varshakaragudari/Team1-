import React, { useEffect, useState } from 'react'
import "../css/Dashboard.css";
import axios from 'axios';
import NatWestlogo from "../images/image.png";
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  
import OneLineFooter from '../components/OneLineFooter';
import HeaderTop from '../components/HeaderTop';
import { Helmet } from 'react-helmet';
// import { Helmet } from 'react-helmet';
// import HeaderTop from '../components/HeaderTop';

function Dashboard() {
  const [AccountNo, setAccountNo] = useState();
  const [icon, setIcon] = useState(faEye);
  const [SavingAccountNo, setSavingAccountNo] = useState();
  const [Savingicon, setSavingIcon] = useState(faEye);
  let timeNow = new Date().getHours();
  const [greeting, setGreeting] = useState("Good Morning");
  const [CurrentAmt,setCurrentAmt] = useState(0);
  const [SavingAmt,setSavingAmt]= useState(2000);
  const [username,setUsername] = useState("User");
  const [transactions, setTransactions] = useState([]);
  const [permSaveno, setPermSaveNo] = useState();
  const [permCurrno,setPermCurrNo] = useState();
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  // const [userData, setUserdata]=useState([]);
  const [userId,setUserId]=useState("")
  const [mapLen,setMapLen] = useState(0);
  let Curr;
  let Save,SaveNumm,numm, temptr;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8999/transaction/byUserId/'+userData.userId);
      if (response.ok) {
        const data = await response.json();
  
        // Map the fetched data keys to match your state keys
        const mappedData = data.map((item) => ({
          id: item.transactionId,
          type: item.type, 
          amount: item.amountTransferred, 
          round: item.roundUp, 
          date: (new Date(parseInt(item.timestamp))).toString(), 
          remarks: item.remarks, 
          from: item.receiverName,
          status: item.status,
          number: item.receiverAccountNumber,
          user:item.userId,
          account: item.accountNumber,
        }));
        mappedData.reverse();
        const sizeOfMappedData = mappedData.length;
        if(sizeOfMappedData===0){
          setTransactions(null);
          setMapLen(0);
        }
  
       else if(sizeOfMappedData<=3){
        setMapLen(sizeOfMappedData)
          setTransactions(mappedData)
        }
        else{
          let tran= mappedData.slice(0,3);
          console.log(tran)
        setTransactions(tran);
      setMapLen(sizeOfMappedData);
        }
  
      // setTransactions(mappedData); // Update the state with the mapped data
        // let size = mappedData.size();
        
        
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  async function getAllOtherData() {
    setUserId(userData.userId);
    console.log(userData.userId);
    console.log(userId);
    let response = await axios.get("http://localhost:8999/accounts/getCurrrent/userId/"+userData.userId);
    let SavingResponse =  await axios.get("http://localhost:8999/accounts/getSaving/userId/"+userData.userId);
    
    Curr = await response.data;
    Save = await SavingResponse.data;
    
    //transactions.map((dataa, i)=>{console.log(dataa)})
    console.log(transactions)
  let name = await Curr.accountHolderName;

  let amtt = await Curr.balance;
  numm =  await Curr.accountNumber;
  let amtt2= await Save.balance;
  SaveNumm = await Save.accountNumber;
 
  setUsername(name);
  setCurrentAmt(amtt);
  setAccountNo(numm);
  setSavingAccountNo(SaveNumm);
  setSavingAmt(amtt2);

  setPermCurrNo(numm);
  setPermSaveNo(SaveNumm);
    console.log(Curr)
     if(timeNow>=5 && timeNow<12){
      setGreeting("Good Morning");
      }
      else if(timeNow>=12 && timeNow<18){
        setGreeting("Good Afternoon");
      }
      else{
        setGreeting("Good Evening")
      }
  }

  function navigateNotLoggedIn() {
    console.log(userData);
    
    if (userData !=null) 
     {
      fetchData();
      getAllOtherData(); 
    }
  }

  useEffect(()=>{
    navigateNotLoggedIn(); 
  },[userData]);

  const handleSavingToggle=()=>{
    if(SavingAccountNo===permSaveno)
    { 
      console.log(permSaveno);
      const last2 = SavingAccountNo%100;
      let str = JSON.stringify(SavingAccountNo);
      
      const firstFourDigits = str.slice(0, 4);
      let fin= firstFourDigits+"* *"+last2;
      setSavingAccountNo(fin);
      setSavingIcon(faEyeSlash)
      
    }   
     
        else{
          setSavingIcon(faEye)
           setSavingAccountNo(permSaveno);
        }
  }
  const handleToggle = () => {
    if(AccountNo===permCurrno)
{ 
  console.log(permCurrno);
  const last2 = AccountNo%100;
  let str = JSON.stringify(AccountNo);
  
  const firstFourDigits = str.slice(0, 4);
  let fin= firstFourDigits+"* *"+last2;
  setAccountNo(fin);
  setIcon(faEyeSlash)
  
}   
 
    else{
      setIcon(faEye)
       setAccountNo(permCurrno);
    }
     
        
  }
  return (
    <>
      <Helmet>
            <title>Dashboard - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      {
        userData && <div className="row">
        <div className="col-lg-2 p-0 m-0">
          <Sidebar currentPage="Dashboard"/>
        </div>
        <div className='col-lg-10 m-0 p-4'>
            <nav aria-label="breadcrumb" className='p-2'>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
            <div className='row'>
                  <div className='col-md-9 p-4'>
                    <div class='Greeting align-top' >
                      <h1 style={{color:"#646068"}} class="align-top">{greeting}, {userData.firstName}</h1>
                    </div>
                    <div class="acc d-flex flex-wrap">
                        <div class="col-md col-sm CurrentAcc shadow-sm bg-body rounded" >
                            <div class="Account-info">
                              <h5 class="Account-Heading">{userData.accounts[1].type} Account</h5>
                              < p class="fw-bold"> <span class="flex justify-around items-center" onClick={handleToggle}>
                              <FontAwesomeIcon icon={icon} /></span>  {AccountNo}</p>
                              <p class="Saving-AccBalance">Balance: <span style={{color:"green"}}>£{CurrentAmt}</span></p>
                              <Link to="/banking/payment/deposit-money" className="text-decoration-none natwest-button max-w-fit">Add money</Link>
                          
                            </div>
                        </div>
                        <div className='col-md col-sm SavingAcc shadow-sm bg-body rounded'>
                          <div class="Account-info">
                            <h5 class="Account-Heading">{userData.accounts[0].type} Account</h5>
                            < p class="fw-bold"><span class="flex justify-around items-center" onClick={handleSavingToggle}>
                            <FontAwesomeIcon icon={Savingicon} /></span> {SavingAccountNo}</p>
                            <p class="Saving-AccBalance">You saved: <span style={{color:"green"}}>£{SavingAmt}</span></p>
                            <Link to="/banking/savingAccount" className="text-decoration-none natwest-button max-w-fit">Switch to Saving</Link>
                          
                          </div>
                        </div>
                    </div>
                    <div className="mt-4">
                      <div class="p-2">
                        <div class="row">
                          <div class="Payment-Body p-3 shadow bg-body rounded">

                            <div class="Content row">
                              <h3>Make Payment</h3>
                              <div class=" col-md-3 justify-content-center d-flex align-items-center p-5">
                                <a href='#'>
                                  <img src="https://cdn-icons-png.flaticon.com/512/1529/1529570.png" alt="" />
                                  <p>Medicine</p>
                                </a>
                              </div>
                              <div class=" col-md-3 justify-content-center d-flex align-items-center p-5">
                                <a href='#'>
                                  <img src="https://cdn-icons-png.flaticon.com/512/3161/3161881.png" alt="" />
                                  <p>Food</p>
                                </a>
                              </div>
                              <div class=" col-md-3 justify-content-center d-flex align-items-center p-5">
                                <a href='#'>
                                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-mobile-recharge-1817169-1538037.png" alt="" />
                                  <p>Recharge</p>
                                </a>
                              </div>
                              <div class=" col-md-3 justify-content-center d-flex align-items-center p-5">
                                <a href='#'>
                                  <img src="https://static.vecteezy.com/system/resources/previews/013/192/195/original/simple-flat-lightning-electric-power-icon-energy-and-electricity-symbol-vector.jpg" alt="" />
                                  <p>Electricity Bill</p>
                                </a>
                              </div>
                            </div>
                          
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    {/* <div class="Recent-Transactions">
                        <h3>Recent Transactions</h3>
                        <table class="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">S.no</th>
                              <th scope="col">Transaction Name</th>
                              <th scope="col">Amount saved</th>
                              <th scope="col">Amount deducted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              transactions && transactions.map((dataa, i)=> {
                                <tr>
                                  <td>{dataa.transactionId}</td>
                                  <td>{dataa.type}</td>
                                  <td>{dataa.roundUp}</td>
                                  <td>{dataa.amount}</td>
                                </tr>
                              })
                            }
                          
                          </tbody>
                        </table>
                        <br/><br/>
                    </div> */}
                  </div>
                  <div class="promotion col-md-3 p-4">
                      <img src={NatWestlogo} class='NatwestImg '></img>
                      <h4 class="mx-auto">We've helped 12,234,45 people to achieve their Financial Goals with Round-up saving! It's your turn!</h4>
                      <a title='Increase round up' href='#' class="promotion-link">
                        <span class="promotion-Btn">Increase Round up</span>
                        </a>
                        <a title='Know more' href='#' class="promotion-link">
                        <span class="promotion-Btn">Know more</span>
                        </a>
                  </div>

                  <div className='table-responsive'>
                  <h3>Recent Transactions</h3>

                      <table className="table">
                        <thead>
                          <tr>
                          <th>ID</th>
                          <th>User ID</th>
                          <th>To</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Rounded Coins</th>
                          <th>Date</th>
                          <th>Remarks</th>
                          
                          <th>Action</th>
                          </tr>
                        </thead>
                        
                        {mapLen===0? <h5  >
  No transactions yet!
</h5>:   <tbody>
                          {transactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                              <td>{transaction.id}</td>
                              <td>{transaction.user}</td>
                              <td>{transaction.from}</td>
                              <td>{transaction.type}</td>
                              <td>₤{transaction.amount}</td>
                              <td>₤{transaction.round}</td>
                              <td>{transaction.date}</td>
                              <td>{transaction.remarks}</td>
                              <td>
                               
                              </td>
                            </tr>
                          ))}
                    
                        </tbody>}
                      </table>
                      {/* <div className="pagination d-flex justify-content-center" style={{backgroundColor:"#f6f5f3"}}>
  {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, index) => (
    <button key={index} onClick={() => setPageNumber(index + 1)} style={{backgroundColor:"#5a287d",color:"#f6f6f3"}} className='pagebutton'>
      {index + 1}
    </button>
  ))}
</div> */}
                        </div>
              </div>

              
              <br/><br/>
              <OneLineFooter/>
        </div>
      </div>
      }
      
    </>
  )

}
export default Dashboard