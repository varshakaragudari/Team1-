import { useEffect, useState } from "react";

export default function Greeting() {
    let timeNow = new Date().getHours();
    const [greeting, setGreeting] = useState("Good Morning");
    const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
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
    <>{greeting}, {userData.firstName}</>
  )
}