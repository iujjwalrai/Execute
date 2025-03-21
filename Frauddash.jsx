import { useState } from "react";

const TransactionTable = () => {
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    payerId: "",
    payeeId: "",
    transactionId: "",
  });

  const transactions = [
    {
      id: "TXN-10235489",
      date: "2023-09-15 09:23:15",
      amount: "$1,250.00",
      payer: "PAY001",
      payee: "PAYEE003",
      channel: "Mobile",
      mode: "Credit Card",
      
      fraudPredicted: "Yes",
      fraudReported: "Yes",
    },
    {
      id: "TXN-10235490",
      date: "2023-09-15 10:45:22",
      amount: "$750.00",
      payer: "PAY003",
      payee: "PAYEE001",
      channel: "Web",
      mode: "Debit Card",
      
      fraudPredicted: "No",
      fraudReported: "No",
    },
    {
      id: "TXN-10235491",
      date: "2023-09-15 12:30:45",
      amount: "$2,500.00",
      payer: "PAY002",
      payee: "PAYEE004",
      channel: "ATM",
      mode: "Cash",
      
      fraudPredicted: "Yes",
      fraudReported: "No",
    },
  ];

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  return (
    <div className="page-section h-full py-6 px-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transaction Data
        </h2>
        <p className="text-gray-600">
          View and analyze raw transaction data with fraud prediction and
          reporting information.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                id="dateFrom"
                className="w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
              <input
                type="date"
                id="dateTo"
                className="w-full rounded-md border px-3 py-2 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          {["PayerId", "PayeeId", "TransactionId"].map((filter) => (
            <div key={filter}>
              <label
                htmlFor={filter}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {filter.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                id={filter}
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder={`Enter ${filter}`}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Reset
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {[
                  "Transaction ID",
                  "Date & Time",
                  "Amount",
                  "Payer ID",
                  "Payee ID",
                  "Channel",
                  "Payment Mode",
                  
                  "Fraud Predicted ",
                  "Fraud Sent",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {txn.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {txn.payer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {txn.payee}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {txn.channel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{txn.mode}</td>
                  
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        txn.fraudPredicted === "Yes"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {txn.fraudPredicted}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        txn.fraudReported === "Yes"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {txn.fraudReported}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">42</span> results
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
