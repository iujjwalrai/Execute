const Transaction = require("../models/transactionModel");

exports.getTransactions = async (req, res) => {
  try {
    const { dateFrom, dateTo, payerId, payeeId, transactionId } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Add date range filter
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) {
        // Set time to end of day
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        filter.date.$lte = endDate;
      }
    }
    
    // Add other filters if provided
    if (transactionId) filter.transaction_id = new RegExp(transactionId, 'i');
    if (payerId) filter.payer_id = new RegExp(payerId, 'i');
    if (payeeId) filter.payee_id = new RegExp(payeeId, 'i');
    
    // Get total count for pagination
    const totalCount = await Transaction.countDocuments(filter);
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Fetch transactions with pagination
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    
    // Transform data for frontend
    const transformedTransactions = transactions.map(transaction => ({
      id: transaction.transaction_id,
      date: transaction.date.toISOString().replace('T', ' ').substring(0, 19),
      amount: `$${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      payer: transaction.payer_id,
      payee: transaction.payee_id,
      channel: transaction.payment_channel,
      mode: transaction.payment_mode,
      fraudPredicted: transaction.is_fraud ? "Yes" : "No",
      fraudReported: transaction.is_fraud_reported ? "Yes" : "No",
      fraudScore: transaction.fraud_score
    }));
    
    // Return paginated results
    res.status(200).json({
      transactions: transformedTransactions,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

exports.getTransactionStats = async (req, res) => {
  try {
    // Get overall fraud statistics
    const totalTransactions = await Transaction.countDocuments();
    const fraudPredicted = await Transaction.countDocuments({ is_fraud: true });
    const fraudReported = await Transaction.countDocuments({ is_fraud_reported: true });
    
    // Get transaction stats by payment mode
    const paymentModeStats = await Transaction.aggregate([
      {
        $group: {
          _id: "$payment_mode",
          count: { $sum: 1 },
          fraudCount: { 
            $sum: { $cond: [{ $eq: ["$is_fraud", true] }, 1, 0] }
          }
        }
      }
    ]);
    
    // Get transaction stats by channel
    const channelStats = await Transaction.aggregate([
      {
        $group: {
          _id: "$payment_channel",
          count: { $sum: 1 },
          fraudCount: { 
            $sum: { $cond: [{ $eq: ["$is_fraud", true] }, 1, 0] }
          }
        }
      }
    ]);
    
    res.status(200).json({
      overview: {
        totalTransactions,
        fraudPredicted,
        fraudReported,
        fraudPredictionRate: (fraudPredicted / totalTransactions * 100).toFixed(2)
      },
      paymentModeStats,
      channelStats
    });
  } catch (error) {
    console.error("Error fetching transaction stats:", error);
    res.status(500).json({ message: "Failed to fetch transaction statistics", error: error.message });
  }
};