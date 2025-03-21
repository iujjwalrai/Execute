import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransactionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add null check and provide complete default values
  const transactionDetails = location.state?.transactionDetails || {
    transaction_id: 'N/A',
    ip: 'N/A',
    country: 'N/A',
    amount: 0,
    failed_attempts: 0,
    is_fraud: false,
    dateTime: new Date().toLocaleString(),
    status: 'Unknown'
  };

  // Add error state handling
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Transaction Details Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the transaction details you're looking for.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const { transaction_id, ip, country, amount, failed_attempts, is_fraud, dateTime, status } = transactionDetails;

  console.log(is_fraud);
  // Determine status styles
  const getStatusStyles = (status, isFraud) => {
    if (isFraud) {
      return { textColor: 'text-red-700', bgColor: 'bg-red-600' };
    }
    switch(status) {
      case 'Processed':
        return { textColor: 'text-green-700', bgColor: 'bg-green-600' };
      case 'Pending':
        return { textColor: 'text-yellow-700', bgColor: 'bg-yellow-600' };
      case 'Failed':
        return { textColor: 'text-red-700', bgColor: 'bg-red-600' };
      default:
        return { textColor: 'text-green-700', bgColor: 'bg-green-600' };
    }
  };
 
  const statusStyles = getStatusStyles(status, is_fraud);
 
  // Format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div id="root">
      <section id="confirmation-section" className={`bg-white py-12 px-4 sm:px-6 lg:px-8 ${is_fraud ? 'bg-red-50' : ''}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center h-20 w-20 rounded-full ${is_fraud ? 'bg-red-100' : 'bg-green-100'} mb-6`}>
              {is_fraud ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <h1 className={`text-3xl font-bold ${is_fraud ? 'text-red-900' : 'text-gray-900'} sm:text-4xl`}>
              {is_fraud ? 'Transaction Failed' : 'Transaction Confirmed'}
            </h1>
            <p className={`mt-3 text-lg ${is_fraud ? 'text-red-600' : 'text-gray-600'}`}>
              {is_fraud ? 'This transaction has been flagged as fraudulent and reported to SEBI' : 'Your payment has been successfully submitted'}
            </p>
          </div>

          <div className={`bg-white rounded-xl shadow-lg border ${is_fraud ? 'border-red-200' : 'border-gray-200'} overflow-hidden`}>
            {/* Transaction Summary */}
            <div className={`${is_fraud ? 'bg-red-50' : 'bg-gray-50'} p-6 border-b border-gray-200`}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-gray-600">Transaction ID:</div>
                <div className="text-gray-900 font-medium">{transaction_id}</div>
               
                <div className="text-gray-600">Date & Time:</div>
                <div className="text-gray-900 font-medium">{dateTime}</div>
               
                <div className="text-gray-600">Status:</div>
                <div className={`${statusStyles.textColor} font-medium flex items-center`}>
                  <span className={`inline-block w-2 h-2 rounded-full ${statusStyles.bgColor} mr-2`}></span>
                  {is_fraud ? 'Fraudulent' : status}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction Information</h2>
                <div className={`${is_fraud ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} p-4 rounded-md border`}>
                  <div className="text-sm text-gray-900 space-y-2">
                    <p><span className="text-gray-600">IP Address:</span> {ip}</p>
                    <p><span className="text-gray-600">Country:</span> {country}</p>
                    <p><span className="text-gray-600">Amount:</span> {formatCurrency(amount)}</p>
                    <p><span className="text-gray-600">Failed Attempts:</span> {failed_attempts}</p>
                  </div>
                </div>
              </div>

              {is_fraud && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Security Alert</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>This transaction has been flagged as fraudulent and has been reported to SEBI (Securities and Exchange Board of India) for further investigation. Your account may be temporarily restricted for security purposes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleBack}
                  className={`${is_fraud ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionResult;