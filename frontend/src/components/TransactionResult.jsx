import React from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionResult = () => {
  const navigate = useNavigate();
  const transactionDetails = {
    transaction_id: '',
    ip: '',
    country: '',
    amount: 0,
    failed_attempts: 0,
    is_fraud: false,
    dateTime: new Date().toLocaleString(),
    status: 'Processed'
  };

  const { transaction_id, ip, country, amount, failed_attempts, is_fraud, dateTime, status } = transactionDetails;
 
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
      <section id="confirmation-section" className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center h-20 w-20 rounded-full ${is_fraud ? 'bg-red-100' : 'bg-green-100'} mb-6`}>
              {is_fraud ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {is_fraud ? 'Fraudulent Transaction Detected' : 'Transaction Confirmed'}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {is_fraud ? 'This transaction has been flagged as potentially fraudulent' : 'Your payment has been successfully submitted'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Transaction Summary */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
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
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
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
                        <p>This transaction has been flagged as potentially fraudulent. Please contact support if you believe this is an error.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleBack}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
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