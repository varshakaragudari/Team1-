import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Payment from "../images/Pay.png"
import "../css/Dashboard.css"
import NatWestlogo from "../images/image.png";
import "../css/Saving.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance, faArrowsToEye, faEye, faEyeSlash, faGraduationCap, faHeart, faHeartPulse, faHome, faMobile, faPlane, faPlaneDeparture, faUserCircle } from '@fortawesome/free-solid-svg-icons';  
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import savingicon from '../images/saving.svg';
import axios from 'axios';
function SavingDash2() {
  var myModal = document.getElementById('myModal')
  var myInput = document.getElementById('myInput')
  const [CurrentAmt,setCurrentAmt] = useState(0);
  const [SavingAmt,setSavingAmt]= useState(2000);
  const [SavingPercent,setSavingPercent]= useState(50);
;  const [AccountNo, setAccountNo] = useState('')
  const [icon, setIcon] = useState(faEyeSlash);
  const [SavingAccountNo, setSavingAccountNo] = useState('');
  const [Savingicon, setSavingIcon] = useState(faEyeSlash);
  const [GoalLabel, setGoalLabel] = useState("");
  const [GoalAmt, setGoalAmt] = useState(0);
  const [goal,setGoal] = useState();
  const [username,setUsername] = useState("User")
  const [style,setStyle] = useState("");
  const [allGoals, setAllGoals] = useState([]);
  const [gain,setGain] = useState(4);
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  const [userId,setUserId]=useState("")
let Curr;
let numm;
let Save;
let SaveNumm;



  const handleSavingToggle=()=>{
   
    if(SavingAccountNo!==Save.accountNumber){
      setSavingIcon(faEye)
    setSavingAccountNo(  SavingAccountNo/10000000000+"**** ****"+ SavingAccountNo%1000000000000);
  }
    else{
      setSavingIcon(faEyeSlash)
       setSavingAccountNo(Save.accountNumber);
    }
  }
  const handleToggle = () => {
    //console.log("Hi toggle")
    if(AccountNo==="1223 **** **** **34"){
      setIcon(faEye)
    setAccountNo(numm);
  }
    else{
      setIcon(faEyeSlash)
      setAccountNo("1223 **** **** **34")
    }
  }
  let handleLabelChange=(e)=>{
  setGoalLabel(e.target.value);
  console.log(GoalLabel)
  }
  let handleAmtChange=(e)=>{
    setGoalAmt(e.target.value);
    console.log(GoalAmt);
    
  
  }
  let HandleGoal=(Val)=>{
    //document.getElementsByClassName("goalBody").style.backgroundColor="grey";
    
    setStyle("hoverStyle");
    console.log(Val);
    setGoal(Val);
  }
  let AddGoal=()=>{
    console.log("hi");
    console.log(GoalLabel + GoalAmt + goal);
    //setNames(current => [...current, 'Carl']);
    let x = (SavingAmt/GoalAmt)*100 ;
      if(x>100){
        x=100;
      }
      console.log(GoalAmt+"  " +x);
      setSavingPercent(x);
    setAllGoals((prev)=>[...prev, {goalName:goal,GoalLabel:GoalLabel,GoalAmt:GoalAmt, goalPercent:x}])
    console.log(style);
    console.log(allGoals);
    
    
  }
    let timeNow = new Date().getHours();
    const [greeting, setGreeting] = useState("Good Morning");
    
  async function getAllData() {
    let response = await axios.get("http://localhost:8999/accounts/getCurrrent/userId/"+userData.userId);
    let SavingResponse = await axios.get("http://localhost:8999/accounts/getSaving/userId/"+userData.userId);
    Curr = await response.data;
    Save = await SavingResponse.data;
  
  let name = await Curr.accountHolderName;

  let amtt = await Curr.balance;
 numm = await Curr.accountNumber;
 let amtt2= await Save.balance;
 SaveNumm = await Save.accountNumber;
 let gain1 = (4*amtt2)/100;
setGain(gain1);
 setUsername(name);
  setCurrentAmt(amtt);
  setAccountNo(numm);
  setSavingAccountNo(SaveNumm);
  setSavingAmt(amtt2);
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

    useEffect(()=>{
      getAllData();
    },[])

    return(
        <>
        <Helmet>
            <title>Payment - NatWest Online Banking</title>
        </Helmet>
        <HeaderTop/>
        <div className="row">
            <div className="col-lg-2 p-0 m-0">
                <Sidebar currentPage="Dashboard"/>
            </div>
            <div className='col-lg-10 m-0 p-4'>
              <nav aria-label="breadcrumb" className='p-2'>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                  <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dasboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Saving Account</li>
                </ol>
              </nav>
              <div class='Greeting align-top' >
                <h1 style={{color:"#646068"}} class="align-top mt-3">{greeting},  {userData.firstName}</h1>
              </div>
              <div className='row'>
                <div className='col-md-9 p-2'>
                  <div className='acc d-flex flex-wrap'>
                    <div className='col-md col-sm CurrentAcc shadow-sm bg-body rounded'>
                      <div class="Account-info">
                        <h5 class="Account-Heading">Saving Account</h5>
                        <p class="fw-bold"> <span class="flex justify-around items-center" >
                        <FontAwesomeIcon icon={Savingicon} /></span> {SavingAccountNo}</p>
                        <p class="Saving-AccBalance">You saved: <span style={{color:"green"}}>£{SavingAmt}</span></p>
                        <a title='Switch to current' href='/banking/payment/withdraw-money' className="text-decoration-none natwest-button max-w-fit">Withdraw Amount</a>
                      </div>
                    </div>
                    <div className='col-md col-sm SavingAcc shadow-sm bg-body rounded'>
                      <div class="Account-info">
                        <h5 class="Account-Heading">Current Account</h5>
                        < p class="fw-bold">  <span class="flex justify-around items-center">
                        <FontAwesomeIcon icon={icon} /></span>  {AccountNo}</p>
                        <p class="Saving-AccBalance">Balance: <span style={{color:"green"}}>£{CurrentAmt}</span></p>
                        <Link to="/banking" className="text-decoration-none natwest-button max-w-fit">Switch to Current</Link>
                      </div>
                    </div>
                  
                  </div>
                  <div class="Saving-summary max-w-fit">
                    <div class="mx-auto">
                      <div class="row">
                        <div class="Saving-Body m-3 shadow bg-body rounded max-w-fit mt-4">
                          <div>
                            <div class="Content row p-4" >
                              <h3>Account Summary</h3>
                              <div className="summary-box col-md-3 justify-content-center d-flex align-items-center p-2 bg-light rounded" >
                                  <div>
                                    <h5> Total Saving</h5>
                                  
                                    <h5 style={{color:"green",fontWeight:"bolder"}}>£{SavingAmt}</h5>
                                  </div>
                              </div>
                              <div className="summary-box col-md-3   justify-content-center d-flex align-items-center p-2 bg-light rounded" >
                                  <div>
                                    <h5 className='Account-Heading'> Total Interest Earning</h5>
                                    <h5 style={{color:"green",fontWeight:"bolder"}}>£{gain}</h5>
                                  </div>
                              </div>
                              {/* <div className="summary-box col-md-3 justify-content-center d-flex align-items-center p-2 bg-light rounded" >
                                  <div>
                                    <h5 className='Account-Heading'> Withdrawn</h5>
                                    <h5 style={{color:"red",fontWeight:"bolder"}}>0</h5>
                                  </div>
                              </div> */}
                              <div class="Saving-Button d-flex flex-row flex-wrap">
                                <a href="/banking/payment/withdraw-money" className='text-decoration-none natwest-button max-w-fit m-4'>Withdraw Amount</a>
                                
                                <a href="/banking/payment/deposit-money" className='text-decoration-none natwest-button max-w-fit m-4'>Add Amount</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div class=" Goals mt-5">
                      <h3>Your goals</h3>
                      <div class="Current-goal">
                        <div className='my-2'>
                        <p style={{marginBottom:'0rem'}}>Swiss Trip</p>
                      <div class="progress">
                    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "50%"}}>50%</div>
                  </div>
                  </div>
                  <div className='my-3'>
                  <p style={{marginBottom:'0rem'}}>Dream House</p>
                      <div class="progress">
                    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>20%</div>
                  </div>
                  </div>
                  {
                    allGoals.map(temp=>{
                        return(
                          <>
                          <div className='pt-3 my-3'>
                          <p className="label" style={{marginBottom:'0rem'}}>{temp.goalName} {temp.GoalLabel}</p>
                      <div class="progress">
                    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: temp.goalPercent+"%"}}>{temp.goalPercent}%</div>
                  </div>
                  </div>
                  </>
                    )
                    })
                  }
                  <div class="Add-goal mt-4 mx-auto">
                  <a title='Add a goal' href='#' class="text-decoration-none natwest-button max-w-fit" data-toggle="modal" data-target="#exampleModal">Add a goal</a>
                    


                  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Choose goal</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-2">
                        <div class="row">
                          <div className=" col d-flex flex-wrap" onClick={()=>HandleGoal("Trip")}>
                    <div className='goalBody px-4 '><FontAwesomeIcon icon={faPlaneDeparture} value='Trip' name='Goal' />
                          <p class="ps-2 pt-3">Trip</p>
                          </div>
                          </div>
                          <div class=" col  d-flex flex-wrap" onClick={()=>HandleGoal("Health")}>
                          <div  className='goalBody px-4' > <FontAwesomeIcon icon={faHeart} value='Health' name='Goal' />
                          <p class="ps-2 pt-3">Health</p>
                          </div>
                          </div>
                          <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Home")}>
                          <div  className='goalBody px-4' > <FontAwesomeIcon icon={faHome} />
                          <p class="ps-2 pt-3">House</p>
                          </div>
                          </div>
                          </div>
                          <div class="row">
                          <div class="col d-flex flex-wrap"onClick={()=>HandleGoal("Education")}>
                            <div  className='goalBody px-4' > <FontAwesomeIcon icon={faGraduationCap} />
                          <p class="ps-2 pt-3">Tuition</p>
                          </div>
                          </div>
                          <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Gadget")}>
                          <div  className='goalBody px-4'  > <FontAwesomeIcon icon={faMobile} />
                          <p class="ps-2 pt-3">Gadget</p>
                          </div>
                          </div>
                          <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Personal")}>
                          <div  className='goalBody px-4' > <FontAwesomeIcon icon={faUserCircle} />
                          <p class="ps-2 pt-3">Personal</p>
                          </div>
                          
                          </div>
                        </div>
                      
                        </div>
                        <div class="mb-3 px-2">
                              <label for="recipient-name" class="col-form-label">Enter label for goal</label>
                              <input type="text" class="form-control" id="goal-name" onChange={handleLabelChange}/>
                            </div>
                            <div class="mb-3 px-2">
                              <label for="recipient-name" class="col-form-label">Enter saving target</label>
                              <input type="number" class="form-control" id="goal-amount" onChange={handleAmtChange}/>
                            </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={AddGoal}>Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>


                  </div> 
                </div>
                <div className='col-md-3 p-2'>
                  <div className=''>
                    <div class="fancyImg d-flex flex-column p-2">
                        <h2 class="fw-bold txt-align-center">Save while you spend!</h2>
                        <img src={savingicon} height={200}/>

                        <a title='Know more' href='#' class="promotion-link mx-auto ">
                        <span class="promotion-Btn p-2">Know more</span>
                        </a>
                        <br/>
                    </div>
                  </div>
                </div>
              </div>
              <br/><br/>
              <OneLineFooter/>
            </div>
        </div>
        
        </>
    )
}

export default SavingDash2
