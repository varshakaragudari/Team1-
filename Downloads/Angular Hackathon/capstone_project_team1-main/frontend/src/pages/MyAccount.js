import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Sidebar from "../components/Sidebar";
import OneLineFooter from "../components/OneLineFooter";
import MessageBox from "../components/MessageBox";
import '../css/MessageBox.css';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


export default function MyAccount() {
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [userId,setUserId]=useState("")
  const [CurrentAmt,setCurrentAmt] = useState(0);
  const [SavingAmt,setSavingAmt]= useState(0);
  const time = new Date().getHours() + ":" + new Date().getMinutes();
  var today = new Date();
  
  let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  async function getAllOtherData() {
    setUserId(userData.userId);
    console.log(userData.userId);
    console.log(userId);
    let response = await axios.get("http://localhost:8999/accounts/getCurrrent/userId/"+userData.userId);
    let SavingResponse =  await axios.get("http://localhost:8999/accounts/getSaving/userId/"+userData.userId);
    let Curr,Save;
    
    Curr = await response.data;
    Save = await SavingResponse.data;
    let amtt = await Curr.balance;
  // numm =  await Curr.accountNumber;
  let amtt2= await Save.balance;
  setCurrentAmt(amtt);
  setSavingAmt(amtt2);
  }
  function navigateNotLoggedIn() {
    console.log(userData);
    
    if (userData !=null) 
     {
      
      getAllOtherData(); 
    }
  }

  useEffect(()=>{
    navigateNotLoggedIn(); 
  },[userData]);
  
  return (
    <>
        <Helmet>
              <title>My Profile - NatWest Online Banking</title>
        </Helmet>
        <HeaderTop/>
        <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="My Profile"/>
            </div>
            <div className="col-lg-10 m-0 p-4">
              <nav aria-label="breadcrumb" className='p-2'>
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">My Profile</li>
                </ol>
              </nav>
              <h1 className="prim-colr">My Profile</h1>
              <p><a href="/banking/my-account/activity" className="prim-colr">View all activity</a></p>
              <MessageBox message="A good tidy up of your payees can stop you from sending money to out of date details." header="Did you know?"/>
              <br/>
              <div>
                <h2 className="prim-colr h2-regular">Accounts</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Account number</th>
                      <th scope="col">Type</th>
                      <th scope="col">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{userData.accounts[1].accountNumber}</td>
                      <td>Current</td>
                      <td>£{CurrentAmt}</td>
                    </tr>
                    <tr>
                      <td>{userData.accounts[0].accountNumber}</td>
                      <td>Savings</td>
                      <td>£{SavingAmt}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="prim-colr h2-regular">Personal details</h2>
                <div className="messagebox p-2">
                  <p>Name<br/><strong> {userData.firstName} {userData.lastName}</strong></p>
                  <p>Date of Birth<br/><strong>{userData.dob}</strong></p>
                  <p>Address<br/><strong> {userData.address}</strong></p>
                  <p>City<br/><strong> {userData.city}</strong></p>
                  <p>Country<br/><strong>{userData.country}</strong></p>
                  <p>Phone<br/><strong>{userData.phoneNumber}</strong></p>
                  <p>Email<br/><strong>{userData.email}</strong></p>
                  <p>Bio<br/><strong>Hi, I am {userData.firstName} with Current({userData.accounts[1].accountNumber}) and Saving Accounts({userData.accounts[0].accountNumber}).</strong></p>
                </div>
              </div>
              <br/>
              <a href="/banking/my-account/edit-profile" className="natwest-button text-decoration-none max-w-fit">Edit profile</a><br/>
              <a href="/banking/my-account/feedback" className="natwest-button text-decoration-none max-w-fit">Feedback</a>
              
              <br/><br/><OneLineFooter/>
            </div>
        </div>
        
    </>
  )
}