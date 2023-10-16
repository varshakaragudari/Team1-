import React from 'react';
import '../css/TransactionDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { faDownload } from '@fortawesome/free-solid-svg-icons';


const TransactionDetails = ({ transaction, onClose, showModal }) => {
  const handleDownloadReceipt = () => {
    // alert('Download Receipt logic goes here.');
  };

  const isDebit = transaction.remarks === 'debited';
  const amountColor = isDebit ? 'text-danger' : 'text-success';

  return (
    <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className={`modal-header bg-purple`}>
            <h5 className="modal-title">Transaction Details</h5>
            <div className="close-button-box">
              <button type="button" className="close-button" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} /> {/* Close icon */}
              </button>
            </div>
          </div>
          <div className="modal-body">
          <div className="user-details">
            <h4>User Details</h4>
            <div>
              <p className="d-flex justify-content-between"><span>Transaction Id:</span> <span>{transaction.id}</span> </p>
            </div>
            <div>
              <p  className="d-flex justify-content-between"><span>From Account:</span> <span>{transaction.from} </span> </p>
            </div>
            <div>
              <p className="d-flex justify-content-between"><span>Account Number:</span> <span>{transaction.number} </span> </p>
            </div>
            <div>
              <p className="d-flex justify-content-between">User Id: <span className='ml'>{transaction.user} </span> </p>
            </div>
            <div>
              <p className="d-flex justify-content-between">User Account Number: <span className='ml2'>{transaction.account}</span></p>
            </div>
            <div>
              <p className="d-flex justify-content-between">Date: <span className='ml'> {transaction.date} </span> </p>
            </div>
            <div>
              <p  className="d-flex justify-content-between">Type: <span className='ml1'>{isDebit ? 'Debited' : 'Credited'} </span> </p>
            </div>
            <div>
              <p className="d-flex justify-content-between">Total Amount: <span className={`amount ${amountColor}`}>₤{transaction.amount}</span></p>
            </div>
            <div>
              <p className="d-flex justify-content-between">Rounded total coins: <span className='ml2'>₤ {transaction.round}</span></p>
            </div>
            <div>
              <p className="d-flex justify-content-between">Status: <span className='ml'>{transaction.status}</span></p>
            </div>
            <div>
              <p className="d-flex justify-content-between">Remarks: <span >{transaction.remarks}</span></p>
            </div>
          </div>
            <div className="button-group d-flex justify-content-center">
              <button className="btn btn-primary" onClick={handleDownloadReceipt}>
                <FontAwesomeIcon icon={faDownload} /> Download Receipt
              </button>
              <span className="button-space"></span>
              <button className="btn btn-primary" onClick={handleDownloadReceipt}>
              <FontAwesomeIcon icon={faEnvelope} /> Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
