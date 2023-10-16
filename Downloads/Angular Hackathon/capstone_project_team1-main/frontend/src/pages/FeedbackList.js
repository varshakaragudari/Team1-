import React, { Component } from "react";
import axios from "axios";
import "../css/FeedbackList.css";
import { Helmet } from "react-helmet";
import HeaderTop from "../components/HeaderTop";
import Footer from "../components/Footer";
import { Button, Modal } from "react-bootstrap";

class FeedbackList extends Component {
  constructor() {
    super();
    this.state = {
      userId:JSON.parse(sessionStorage.getItem("userdata")).userId,
      feedbackList: [],
      showDialog:false,
      dialogMessage:'',
      handleCloseDialog : () => {
        this.setState({showDialog:false});
    }
       // To store the list of feedbacks
    };
  }

  componentDidMount() {
    // Fetch the feedback data from the server when the component mounts
    // axios.get('YOUR_API_ENDPOINT_HERE')
    //   .then((response) => {
    //     const userData = response.data; // Assuming the user details are in response.data
    //     const userId = userData.userId; // Extract userId from user data
    //     this.setState({ userId });
    //   })
    //   .catch((error) => {
    //     alert("error while getting userId from endpoint")
    //   });
    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    console.log(this.state);
    console.log(userdata);
    this.setState({userId: userdata.userId});
    console.log(this.state);
    this.getFeedbackList();
  }

  getFeedbackList = async () => {

    try {
      console.log(this.state.userId)
      const response = await axios.get('http://localhost:8031/feedback/feedback/userId/'+this.state.userId); // Replace with your server endpoint
      const feedbackList = response.data; // Assuming the server returns an array of feedbacks
      this.setState({ feedbackList });
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = async (feedbackId) => {
    // Send a DELETE request to delete a specific feedback based on its ID
    try {
      await axios.delete(`http://localhost:8031/feedback/feedback/${feedbackId}`); // Replace with your server endpoint
      // After successful deletion, update the feedbackList state to remove the deleted item
      const updatedList = this.state.feedbackList.filter(
        (feedback) => feedback.feedbackId !== feedbackId
      );
      this.setState({ feedbackList: updatedList });
      this.setState({dialogMessage:"Your feedback is deleted."})
      this.setState({showDialog:true});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { feedbackList } = this.state;

    return (
        <>
          <Helmet>
            <title>Feedback - My Account - NatWest Online Banking</title>
          </Helmet>
          <HeaderTop/>
          <nav aria-label="breadcrumb" className='p-4'>
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
              <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
              <li className="breadcrumb-item"><a href="/banking/my-account" className='prim-colr'>My Account</a></li>
              <li className="breadcrumb-item active" aria-current="page">Feedback</li>
            </ol>
          </nav>
          <div className="p-4 vh-100">
            <h2 className="h2list">Feedback list</h2>
            <div className="feedback-list-container">
            
        {feedbackList.map((feedback) => (
          <div className="feedback-list-item" key={feedback.id}>
            <div>
              <strong>Name</strong>
            </div>
            <div>
              {feedback.firstName} {feedback.lastName}
            </div>
            <div>
              <strong>Email</strong>
            </div>
            <div>{feedback.email}</div>
            <div>
              <strong>Type</strong>
            </div>
            <div>{feedback.type}</div>
            <div>
              <strong>Experience</strong>
            </div>
            <div>{feedback.description}</div>
            <button className="deletebutton" onClick={() => this.handleDelete(feedback.feedbackId)}>
            <LoginDialog show={this.state.showDialog} handleClose={this.state.handleCloseDialog} message={this.state.dialogMessage} />
              Delete
            </button>
            
          </div>
        ))}
            </div>
          </div>
          <Footer/>
        </>
        
    );
  }
}

export default FeedbackList;

export function LoginDialog(props) {
  const { show, handleClose, message } = props;

  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Body>
              <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                  Close
              </Button>
          </Modal.Footer>
      </Modal>
  );
}