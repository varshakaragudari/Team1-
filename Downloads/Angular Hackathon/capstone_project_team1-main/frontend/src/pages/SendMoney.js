import { Helmet } from "react-helmet";
import Sidebar from "../components/Sidebar";
import HeaderTop from "../components/HeaderTop";
import backicon from '../images/Icons/Champion_ChevronLeft_32x32.png'
import OneLineFooter from "../components/OneLineFooter";

export default function SendMoney() {
    return (
        <>
            <Helmet>
                <title>Send money to another account - NatWest Online Banking</title>
            </Helmet>
            <HeaderTop/>
            <div className="row">
                <div className="col-lg-2 p-0 m-0">
                    <Sidebar currentPage="Make Payment"/>
                </div>
                <div className="col-lg-10 m-0 p-0">
                    <div className="d-flex flex-row">
                        <div className="p-4">
                            <div className="d-flex justify-content-start align-items-center">
                                <a href="/banking/payment"><img src={backicon} alt="back-arrow-icon"/></a>
                                <h1 className="header-text-style">Send money</h1>
                            </div>
                            <h3>Payment from</h3>
                            <div style={{backgroundColor: "white", height: "200px", width: "300px", padding: "1rem", borderRadius: "35px", margin: "1rem"}}>
                                    <div className='d-flex align-content-between flex-column'>
                                        <div>
                                            <h4 className="p-0 m-0">Current Account</h4>
                                            <p style={{color: "#429448"}}><sub>default</sub></p>
                                            <h3 style={{fontWeight: "600"}}>£2980.58</h3>
                                        </div>
                                        <p style={{textAlign: "center"}}>31926819 | 60-16-13</p>
                                    </div>
                            </div>
                            <h3>Payment to</h3>

                            <div style={{maxWidth: "750px"}}>
                                <div class="form-group">
                                    <label for="accountNum">Account Number</label>
                                    <input type="number" class="form-control mb-1" id="accountNum" maxLength="8" placeholder="Enter account number"/>
                                    <small id="accountNum" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group">
                                    <label for="sortCode">Sort code</label>
                                    <input type="number" class="form-control mb-1" id="sortCode" maxLength="8" placeholder="Enter sort code"/>
                                    <small id="sortCode" class="form-text text-muted"></small>
                                </div>
                                <div class="form-group">
                                    <label for="reference">Reference</label>
                                    <input type="text" class="form-control mb-1" id="reference" placeholder="Enter reference"/>
                                    <small id="reference" class="form-text text-muted"></small>
                                </div>
                                <button className="btn btn-primary rounded-pill prim-colr-btn">Save receiver</button>
                            </div>
                            <div style={{backgroundColor: "white", width: "300px", padding: "0.8rem", borderRadius: "15px", marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                                <div>
                                    <h4 className="p-0 m-0">Gucci Retail</h4>
                                    <p>Current Account<br/><sub>Shopping payment</sub></p>
                                </div>
                                <p style={{textAlign: "center"}}>31926819 | 60-16-13</p>
                            </div>
                            <h3>Payment amount</h3>
                            <div style={{maxWidth: "750px"}}>
                                <div class="form-group">
                                    <label for="amount">Amount</label>
                                    <input type="number" class="form-control mb-1" id="amount" maxLength="8" placeholder="Enter amount to send"/>
                                    <small id="amount" class="form-text text-muted"></small>
                                </div>
                                <button className="btn btn-primary rounded-pill prim-colr-btn">Review payment</button>
                            </div>
                            <div style={{backgroundColor: "white", width: "300px", padding: "0.8rem", borderRadius: "15px", marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                                <h3 style={{fontWeight: "600"}}>£2980.58</h3>
                            </div>
                            <p><sub>Current account balance after transfer: £2879.58</sub><br/><sub>Round up extra deposit to savings account: £0.78</sub></p>
                            <button className="btn btn-primary rounded-pill prim-colr-btn">Make payment</button>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <OneLineFooter/>
                </div>
            </div>
        
        </>
    )
}