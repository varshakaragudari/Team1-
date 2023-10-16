import { Helmet } from "react-helmet";
import '../css/PageNotFound.css'
import Footer from "../components/Footer";
import HeaderTop from "../components/HeaderTop";

export default function PageNotFound() {
  return (
    <>
      <Helmet>
          <title>Page not found</title>
      </Helmet>
      <div style={{overflow: "auto"}}>
        <HeaderTop/>
        <div className="d-flex flex-column bg-white pb-5 full-area">
            <div className="header-area">
              <div className="header-content">
                <h1 className="header-text-style">Page not found</h1>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="m-4">
                <p className="txt-align-center">Sorry, the page you requested could not be found.</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <a className="natwest-button" href="/">Home</a>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <a className="text-decoration-none prim-colr" href="/helpdesk">Help</a>
            </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}