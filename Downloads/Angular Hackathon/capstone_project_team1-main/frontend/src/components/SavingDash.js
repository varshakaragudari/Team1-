
import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Payment from "../images/Pay.png"
import "../css/Dashboard.css"
import NatWestlogo from "../images/image.png";
import "../css/Saving.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance, faArrowsToEye, faEye, faEyeSlash, faGraduationCap, faHeart, faHeartPulse, faHome, faMobile, faPlane, faPlaneDeparture, faUserCircle } from '@fortawesome/free-solid-svg-icons';  
function SavingDash() {
  var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')
const [SavingAmt,setSavingAmt]= useState(2000);
const [SavingPercent,setSavingPercent]= useState(50);
const [AccountNo, setAccountNo] = useState('1223 **** **** **34');
const [icon, setIcon] = useState(faEyeSlash);
const [SavingAccountNo, setSavingAccountNo] = useState('6545 **** **** **12');
const [Savingicon, setSavingIcon] = useState(faEyeSlash);
const [GoalLabel, setGoalLabel] = useState("");
const [GoalAmt, setGoalAmt] = useState(0);
const [goal,setGoal] = useState();

const [style,setStyle] = useState("");
const [allGoals, setAllGoals] = useState([]);

const handleSavingToggle=()=>{
  if(SavingAccountNo==="6545 **** **** **12"){
    setSavingIcon(faEye)
  setSavingAccountNo("6545 1278 3332 9812")
}
  else{
    setSavingIcon(faEyeSlash)
    setSavingAccountNo("6545 **** **** **12")
  }
}
const handleToggle = () => {
  //console.log("Hi toggle")
  if(AccountNo==="1223 **** **** **34"){
    setIcon(faEye)
  setAccountNo("1223 2323 4434 1234")
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
    
    console.log(GoalAmt+"  " +x);
    setSavingPercent(x);
  setAllGoals((prev)=>[...prev, {goalName:goal,GoalLabel:GoalLabel,GoalAmt:GoalAmt, goalPercent:x}])
  console.log(style);
  console.log(allGoals);
  
  
}
    let timeNow = new Date().getHours();
    const [greeting, setGreeting] = useState("Good Morning");
    useEffect(()=>{
       if(timeNow>=5 && timeNow<12){
        setGreeting("Good Morning");
        }
        else if(timeNow>=12 && timeNow<18){
          setGreeting("Good Afternoon");
        }
        else{
          setGreeting("Good Evening")
        }
  
    },[])

  return (
    <>
    <div className='Dashboard-body d-flex flex-row col-sm' >
    <Sidebar/>
    <div className='Main-Content w-100'>
    <div className='d-flex flex-row '>
        <div>
<div class='Greeting align-top' >
<h1 style={{color:"#646068"}} class="align-top mt-3">{greeting}, User</h1>
</div>

<div class="Accounts d-flex flex-row flex-sm-col">
   
    <div className='CurrentAcc shadow-sm bg-body rounded'>
    <div class="Account-info">
        <h5 class="Account-Heading">Saving Account</h5>
       <p class="fw-bold"> <span class="flex justify-around items-center" onClick={handleSavingToggle}>
       <FontAwesomeIcon icon={Savingicon} /></span> {SavingAccountNo}</p>
       <p class="Saving-AccBalance">You saved: <span style={{color:"green"}}>£{SavingAmt}</span></p>
       <a title='Switch to current' href='#' class="Switch-link">
       <span class="Switch-Btn p-2">Withdraw Amount</span>
       </a>
        </div>
    </div>
    <div class="SavingAcc shadow-sm bg-body rounded" >
        <div class="Account-info">
        <h5 class="Account-Heading">Current Account</h5>
        
       < p class="fw-bold">  <span class="flex justify-around items-center" onClick={handleToggle}>
       <FontAwesomeIcon icon={icon} /></span>  {AccountNo}</p>
       
       <p class="Saving-AccBalance">Balance: <span style={{color:"green"}}>£32,123</span></p>
       <Link to="/dashboard" style={{textDecoration:"none"}}><a title='Switch to current' href='#' class="Switch-link">
       <span class="Switch-Btn p-2">Switch to Current </span>
       </a></Link>
       
      
        </div>
    </div>
    </div>
    <div class="Saving-summary">
<div class="container mx-auto">
  <div class="row">
    <div class="Saving-Body col-md-10 p-3 shadow bg-body rounded" style={{marginTop:"6%"}}>
<div>
      <div class="Content row" >
        <h3>Account Summary</h3>
        <div className="summary-box col-md-3   justify-content-center d-flex align-items-center p-2 shadow bg-body rounded" >
            <div>
          <h5 className='Account-Heading'> Total Saving</h5>
          
         <h5 style={{color:"green",fontWeight:"bolder"}}>£{SavingAmt}</h5>
         </div>
        </div>
        <div className="summary-box col-md-3   justify-content-center d-flex align-items-center p-2 shadow bg-body rounded" >
            <div>
            <h5 className='Account-Heading'> Total Gain</h5>
         <h5 style={{color:"green",fontWeight:"bolder"}}>£34</h5>
         </div>
        </div>
        <div className="summary-box col-md-3   justify-content-center d-flex align-items-center p-2 shadow bg-body rounded" >
            <div>
            <h5 className='Account-Heading'> Withdrawn</h5>
         <h5 style={{color:"red",fontWeight:"bolder"}}>£300</h5>
         </div>
        </div>
        <div class=" Saving-Button d-flex flex-row ">
          <Link to="/withdraw">
          <a title='Withdraw Amount' href='#' class="Switch-link p-3 mr-2">
       <span class="Switch-Btn p-2">Withdraw Amount</span>
       </a>
          </Link>
        
      <Link to="/dashboard"> <a title='Increase Round up' href='#' class="Switch-link p-3 mr-2">
       <span class="Switch-Btn p-2">Increase Round up</span>
       </a></Link>
     <Link to="/addAmount">
     <a title='Add amount' href='#' class="Switch-link p-3 mr-2">
       <span class="Switch-Btn p-2">Add Amount</span>
       </a>
     </Link>
    
    

       </div>
      </div>
     </div>
    </div>
    
  </div>
</div>


</div>
    </div>
<div class="fancyImg d-flex flex-column p-3 ">
  <h2 class="fw-bold">Save while you spend!</h2>
    {/* <img src={NatWestlogo} class='NatwestImg '></img>
    <h4 class="mx-auto">We've helped 12,234,45 people to achieve their Financial Goals with Round-up saving! It's your turn!</h4>
    <a title='Increase round up' href='#' class="promotion-link">
       <span class="promotion-Btn">Increase Round up</span>
       </a>
       <a title='Know more' href='#' class="promotion-link">
       <span class="promotion-Btn">Know more</span>
       </a> */}
       <img src={Payment} style={{height:'25rem',width:'25rem'}}></img>

       <a title='Know more' href='#' class="promotion-link mx-auto ">
       <span class="promotion-Btn p-2">Know more</span>
       </a>
</div>
</div>


<div class="Goals">
    <h3>Your goals</h3>
    <div class="Current-goal">
      <p>Swiss Trip</p>
    <div class="progress">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "50%"}}>50%</div>
</div>
<p>Dream House</p>
    <div class="progress">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>20%</div>
</div>
{
   allGoals.map(temp=>{
      return(
        <>
        <p>{temp.goalName} {temp.GoalLabel}</p>
    <div class="progress">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: temp.goalPercent+"%"}}>{temp.goalPercent}%</div>
</div>
</>
   )
   })
}
</div>

<div class="Add-goal mt-4">
<a title='Add a goal' href='#' class="Switch-link p-4 mr-2 " data-toggle="modal" data-target="#exampleModal">
       <span class="Switch-Btn p-2">Add a goal</span>
       </a>
   


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
        <p class="ps-2 pt-2">Trip</p>
        </div>
        </div>
        <div class=" col  d-flex flex-wrap" onClick={()=>HandleGoal("Health")}>
        <div  className='goalBody px-4' > <FontAwesomeIcon icon={faHeart} value='Health' name='Goal' />
        <p class="ps-2 pt-2">Health</p>
        </div>
        </div>
        <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Home")}>
        <div  className='goalBody px-4' > <FontAwesomeIcon icon={faHome} />
        <p class="ps-2 pt-2">House</p>
        </div>
        </div>
        </div>
        <div class="row">
        <div class="col d-flex flex-wrap"onClick={()=>HandleGoal("Education")}>
          <div  className='goalBody px-4' > <FontAwesomeIcon icon={faGraduationCap} />
        <p class="ps-2 pt-2">Education</p>
        </div>
        </div>
        <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Gadget")}>
        <div  className='goalBody px-4'  > <FontAwesomeIcon icon={faMobile} />
        <p class="ps-2 pt-2">Gadget</p>
        </div>
        </div>
        <div class="col  d-flex flex-wrap" onClick={()=>HandleGoal("Personal")}>
        <div  className='goalBody px-4' > <FontAwesomeIcon icon={faUserCircle} />
        <p class="ps-2 pt-2">Personal</p>
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
        <button type="button" class="btn btn-primary" onClick={AddGoal}>Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>

    </>
  )
}

export default SavingDash