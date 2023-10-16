import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import { Link } from "react-router-dom";

export default function Sitemap() {
  return (
    <>
      <Helmet>
            <title>Sitemap - List of website internal links</title>
      </Helmet>
      <HeaderTop/>
      <nav aria-label="breadcrumb" className='p-2'>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Sitemap</li>
          </ol>
      </nav>
      <div className="p-4">
        <h1>Sitemap</h1>
        <h2 className="h2-regular">Banking</h2>
        <ul>
          <li>
            <Link to={"/banking"} className="prim-colr">Dashboard</Link>
          </li>
          <li>
            <Link to={"/banking/payment"} className="prim-colr">Payment dashboard</Link>
          </li>
          <li>
            <Link to={"/banking/payment/send-money"} className="prim-colr">Transfer money</Link>
          </li>
          <li>
            <Link to={"/banking/payment/pay-using-debit-card"} className="prim-colr">Pay using debit card</Link>
          </li>
          <li>
            <Link to={"/banking/payment/withdraw-money"} className="prim-colr">Withdraw money</Link>
          </li>
          <li>
            <Link to={"/banking/tools/round-up"} className="prim-colr">Round up</Link>
          </li>
          <li>
            <Link to={"/banking/tools/coin-jar"} className="prim-colr">Coin jar</Link>
          </li>
          <li>
            <Link to={"/banking/notification"} className="prim-colr">Notification</Link>
          </li>
          <li>
            <Link to={"/banking/transaction"} className="prim-colr">Transaction</Link>
          </li>
          <li>
            <Link to={"/banking/settings"} className="prim-colr">Settings</Link>
          </li>
          <li>
            <Link to={"/banking/my-account"} className="prim-colr">My account</Link>
          </li>
          <li>
            <Link to={"/banking/my-account/activity"} className="prim-colr">My account activity</Link>
          </li>
          <li>
            <Link to={"/banking/edit-profile"} className="prim-colr">Edit profile</Link>
          </li>
        </ul>
        <h2 className="h2-regular">Authentication</h2>
        <ul>
          <li>
            <Link to={"/register"} className="prim-colr">Register</Link>
          </li>
          <li>
            <Link to={"/login"} className="prim-colr">Login</Link>
          </li>
          <li>
            <Link to={"/forgot-password"} className="prim-colr">Forgot password</Link>
          </li>
        </ul>
        <h2 className="h2-regular">Helpdesk</h2>
        <ul>
          <li>
            <Link to={"/helpdesk"} className="prim-colr">Helpdesk</Link>
          </li>
          <li>
            <Link to={"/helpdesk/faqs"} className="prim-colr">FAQs</Link>
          </li>
          <li>
            <Link to={"/helpdesk/knowledge-base"} className="prim-colr">Knowledge base</Link>
          </li>
          <li>
            <Link to={"/helpdesk/feedback"} className="prim-colr">Feedback</Link>
          </li>
        </ul>
        <h2 className="h2-regular">Extras</h2>
        <ul>
          <li>
            <Link to={"/timed-out"} className="prim-colr">Timed out</Link>
          </li>
          <li>
            <Link to={"/err"} className="prim-colr">404 Page</Link>
          </li>
        </ul>
      </div>
    </>
  )
}