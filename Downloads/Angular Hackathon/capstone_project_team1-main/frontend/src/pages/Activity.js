import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Sidebar from "../components/Sidebar";
import OneLineFooter from "../components/OneLineFooter";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Activity() {
    const [activities, setActivities]=useState(null);
    const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));

    // const getActivity = () => {
    //     axios.get('http://localhost:8010/activity/all');
    //     setActivities(data);
    //     console.log(activities);
    // }

    async function fetchActivity() {
        await axios.get('http://localhost:8010/activity/user/'+userData.userId).then((data)=> {
            setActivities(data.data);
            console.log(data.data)
        })
    }

    useEffect(()=> {
        fetchActivity()
    },[]);
    

    return (
        <>
            <Helmet>
                <title>Activity - My Profile - NatWest Online Banking</title>
            </Helmet>
            <HeaderTop/>
            <div className="row">
                <div className="col-lg-2 p-0 m-0">
                    <Sidebar currentPage="Acitivity"/>
                </div>
                <div className="col-lg-10 m-0 p-0">
                    <nav aria-label="breadcrumb" className='p-4'>
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>My Profile</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Activity</li>
                        </ol>
                    </nav>
                    <h1 className="prim-colr px-4">Activity</h1>
                    {
                        activities && activities.length!=0 && (
                            <div className="p-4 table-responsive">
                                <table className="table table-hover ">
                                <thead>
                                    <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Date & Time</th>
                                    <th scope="col">ipAddress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        activities.map((data, i)=> 
                                            <tr>
                                                <td>{data.activityId}</td>
                                                <td>{data.type}</td>
                                                <td>{data.description}</td>
                                                <td>{(new Date(parseInt(data.timestamp))).toString()}</td>
                                                <td>{data.ipAddress}</td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>
                                </table>
                            </div>
                        )
                    }
                    {
                        !activities || activities.length==0 && (
                            <p className="p-4">No any activity</p>
                        )
                    }
                    
                    <OneLineFooter/>
                </div>
            </div>
        </>
    )
}