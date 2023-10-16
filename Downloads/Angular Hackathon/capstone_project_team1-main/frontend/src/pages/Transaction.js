import React, { useState } from 'react';
import '../css/Transaction.css';
import TransactionDetails from './TransactionDetails';
import Sidebar from '../components/Sidebar';
import { Helmet } from 'react-helmet';
import HeaderTop from '../components/HeaderTop';
import OneLineFooter from '../components/OneLineFooter';
import Greeting from '../components/Greeting';
import {useEffect} from 'react';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserdata]=useState(JSON.parse(sessionStorage.getItem("userdata")));
  // ... other state variables
  const savingsTotal = transactions
  .filter((transaction) => transaction.type === 'saving')
  .reduce((total, transaction) => total + transaction.amount, 0);

const currentTotal = transactions
  .filter((transaction) => transaction.type === 'current')
  .reduce((total, transaction) => total + transaction.amount, 0);
  const [pageNumber, setPageNumber] = useState(1);
  const transactionsPerPage = 5;
  // Define a function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8999/transaction/byUserId/'+userData.userId);
      if (response.ok) {
        const data = await response.json();
  
        // Map the fetched data keys to match your state keys
        const mappedData = data.map((item) => ({
          id: item.transactionId,
          type: item.type, 
          amount: item.amountTransferred, 
          round: item.roundUp, 
          date: (new Date(parseInt(item.timestamp))).toString(), 
          remarks: item.remarks, 
          from: item.receiverName,
          status: item.status,
          number: item.receiverAccountNumber,
          user:item.userId,
          account: item.accountNumber,
        }));
  mappedData.reverse();
        setTransactions(mappedData); // Update the state with the mapped data
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [transactions]); // The empty array means this effect runs only once, like componentDidMount
  const [activeTab, setActiveTab] = useState('all');
  const loadNextTransactions = () => {
    setPageNumber(pageNumber + 1);
  };
  // Calculate the index range of transactions to display
  const startIndex = (pageNumber - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  // Filter and slice the transactions to display on the current page
  const paginatedTransactions = transactions.slice(startIndex, endIndex);
  // Calculate total amount
  const totalAmount = (Math.round(transactions.reduce((total, transaction) => total + transaction.amount, 0)*100)/100).toFixed(2);

  // Toggle buttons state
  const [showAll, setShowAll] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  // Sort options state
  const [sortOption, setSortOption] = useState('id');
  const [sortOrder, setSortOrder] = useState('ascending');

  // Selected transaction state
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to sort transactions based on the selected sort option
  const sortTransactions = (option) => {
    let sortedTransactions = [...transactions];

    switch (option) {
      case 'date':
        sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount':
        sortedTransactions.sort((a, b) => a.amount - b.amount);
        break;
      case 'alphabetical':
        sortedTransactions.sort((a, b) => a.from.localeCompare(b.from));
        break;
      case 'id':
        sortedTransactions.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }

    if (sortOrder === 'descending') {
      sortedTransactions.reverse();
    }

    return sortedTransactions;
  };
  const handleTabClick = (tab) => {
    switch (tab) {
      case 'All':
        setShowAll(true);
        setShowCurrent(false);
        setShowSavings(false);
        break;
      case 'Current Account':
        setShowAll(false);
        setShowCurrent(true);
        setShowSavings(false);
        break;
      case 'Savings Account':
        setShowAll(false);
        setShowCurrent(false);
        setShowSavings(true);
        break;
      default:
        break;
    }
  };
  // Filter transactions by account type
  const filteredTransactions = () => {
  
    let filtered = [...transactions];
    // Filter transactions based on the selected account type
    if (!showAll) {
      filtered = filtered.filter((transaction) => {
        if (showCurrent && transaction.from === 'Current Account') {
          return true;
        }
        if (showSavings && transaction.from === 'Savings Account') {
          return true;
        }
        return false;
      });
    }
    return sortTransactions(sortOption);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  };
  
 
  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  
  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };

  return (
    <>
      <Helmet>
        <title>Transactions - NatWest Online Banking</title>
      </Helmet>
      <HeaderTop/>
      <div className="row">
        <div className="col-lg-2 p-0 m-0">
          <Sidebar currentPage="Transactions"/>
        </div>
        <div className="col-lg-10 m-0 p-0">
          <div className='transaction'>
            <div className="d-flex flex-row">
              <div className={`modal-overlay ${showModal ? 'd-block' : ''}`} />
                <div className="p-4 w-100">
                  <nav aria-label="breadcrumb" className='p-2'>
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="/" className='prim-colr'>Home</a></li>
                        <li className="breadcrumb-item"><a href="/banking" className='prim-colr'>Dashboard</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Transactions</li>
                    </ol>
                  </nav>
                  <h2 className='msg'><Greeting/></h2>
                  <div className="row">
                    <div className="col-md-8">
                    
                      {/* <button className="btn btn-primary mt-3">Make Payment</button> */}
                      <div className="mt-4">
                        <div className="balance">Total transactions value <span className='amt3'>₤{totalAmount}</span></div><br></br>
                        <div className="fw-bold ">Savings Total: <span className='amt1'>₤{savingsTotal}</span></div>
                        <div className="fw-bold">Current Total: <span className='amt2'>₤{currentTotal}</span></div>
                        {/* <div className="fw-bold">Roundup Total Coins: <span className='amt3'>50</span></div> */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <img src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoicmJzXC9maWxlXC8zcHpmNEF0U24yZkRyN3B3R3NiWS5zdmcifQ:rbs:HXhqUJytNswaHOju9f-vNrVhaebIYOZZeptUVLiqr4I?width=2400" alt="card Icon" height="200px" />
                    </div>
                  </div>
                  <br></br>
                  
                  {/* Transaction boxes in a single table */}
                  <h2 className='his'>Transaction History</h2><br></br> <br></br>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="btn-group mb-3">
                        <button
                          type="button"
                          className={`btn btn-primary ${showAll  ? 'active' : ''}`}
                          // onClick={() => {
                          //   setShowAll(true);
                          //   setShowCurrent(false);
                          //   setShowSavings(false);
                          // }}
                          onClick={() => handleTabClick('All')}
                        >
                          All
                        </button>
                        <button
                          type="button"
                          className={`btn btn-primary ${showCurrent ? 'active' : ''}`}
                          onClick={() => handleTabClick('Current Account')}
                        >
                          Current Account
                        </button>
                        <button
                          type="button"
                          className={`btn btn-primary ${showSavings ? 'active' : ''}`}
                          onClick={() => {
                            setShowAll(false);
                            setShowCurrent(false);
                            setShowSavings(!showSavings);
                          }}
                          // onClick={() => handleTabClick('Savings Account')}
                        >
                          Savings Account
                        </button>
                      </div>
                      </div>
                      <div className='col-md-6'>
                      <div className="btn-group" role="group" aria-label="Sort By">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-primary ${sortOption === 'id' ? 'active' : ''}`}
                  onClick={() => setSortOption('id')}
                >
                  ID
                </button>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'ascending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('date');
                        setSortOrder('ascending');
                      }}
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'descending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('date');
                        setSortOrder('descending');
                      }}
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-primary ${sortOption === 'amount' ? 'active' : ''}`}
                  onClick={() => setSortOption('amount')}
                >
                  Amount
                </button>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'ascending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('amount');
                        setSortOrder('ascending');
                      }}
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'descending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('amount');
                        setSortOrder('descending');
                      }}
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-primary ${sortOption === 'alphabetical' ? 'active' : ''}`}
                  onClick={() => setSortOption('alphabetical')}
                >
                  From
                </button>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'ascending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('alphabetical');
                        setSortOrder('ascending');
                      }}
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'descending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('alphabetical');
                        setSortOrder('descending');
                      }}
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-primary ${sortOption === 'date' ? 'active' : ''}`}
                  onClick={() => setSortOption('date')}
                >
                  Date
                </button>
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'ascending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('id');
                        setSortOrder('ascending');
                      }}
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`dropdown-item ${sortOrder === 'descending' ? 'active' : ''}`}
                      onClick={() => {
                        setSortOption('id');
                        setSortOrder('descending');
                      }}
                    >
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

                      </div>
                      <div className='table-responsive'>
                      <table className="table">
                        <thead>
                          <tr>
                          <th>ID</th>
                          <th>User ID</th>
                          <th>To</th>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Rounded Coins</th>
                          <th>Date</th>
                          <th>Remarks</th>
                          
                          <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedTransactions.map((transaction, index) => (
                            <tr key={transaction.id}>
                              <td>{transaction.id}</td>
                              <td>{transaction.user}</td>
                              <td>{transaction.from}</td>
                              <td>{transaction.type}</td>
                              <td>₤{transaction.amount}</td>
                              <td>₤{transaction.round}</td>
                              <td>{transaction.date}</td>
                              <td>{transaction.remarks}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleRowClick(transaction)}
                                >
                                  View Transaction Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="pagination d-flex justify-content-center" style={{backgroundColor:"#f6f5f3"}}>
  {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, index) => (
    <button key={index} onClick={() => setPageNumber(index + 1)} style={{backgroundColor:"#5a287d",color:"#f6f6f3"}} className='pagebutton'>
      {index + 1}
    </button>
  ))}
</div>
                        </div>
                </div>
                  {/* Transaction details box */}
                  {selectedTransaction && (
                    <TransactionDetails
                      transaction={selectedTransaction}
                      onClose={() => setShowModal(false)}
                      showModal={showModal}
                    />
                  )}
            </div>
          </div>
          <br/><br/>
          <OneLineFooter/>
        </div>
      </div>
      
    </>
  );
};

export default Transaction;




