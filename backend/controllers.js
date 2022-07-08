const Wallet = require("./models/wallet");
const Transaction = require("./models/transaction");
const { getAmount } = require("./utils");

// Additional
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json(wallets);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getWalletById = async (req, res) => {
  const { id } = req.params;

  try {
    const wallet = await Wallet.findById(id);
    res.status(200).json(wallet);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.setupWallet = async (req, res) => {
  const { name, balance } = req.body;
  if (balance < 0) {
    return res.status(400).json({ message: "Balance cannot be negative" });
  }

  try {
    const wallet = new Wallet({
      name,
      balance: getAmount(balance) || 0,
    });
    await wallet.save();
    const transact = new Transaction({
      walletId: wallet._id,
      amount: getAmount(balance),
      description: "Initial Wallet setup",
      type: "CREDIT",
      balance: wallet.balance,
    });
    await transact.save();
    res.status(200).json({
      id: wallet._id,
      balance: wallet.balance,
      transactionId: transact._id,
      name: wallet.name,
      date: transact.createdAt,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.transact = async (req, res) => {
  const { walletId } = req.params;
  const { amount, description } = req.body;

  try {
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    if (amount == 0) {
      return res.status(400).json({ message: "Amount cannot be zero" });
    }
    if (amount < 0 && wallet.balance < getAmount(amount)) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    wallet.balance += +parseFloat(amount).toFixed(4);
    await wallet.save();
    const transact = new Transaction({
      walletId: wallet._id,
      amount: getAmount(amount),
      type: amount < 0 ? "DEBIT" : "CREDIT",
      balance: wallet.balance,
      description,
    });
    await transact.save();
    res.status(200).json({
      balance: wallet.balance,
      transactionId: transact._id,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getTransactions = async (req, res) => {
  const { walletId, skip, limit } = req.query;
  try {
    const transactions = await Transaction.find({ walletId })
      .skip(parseInt(skip || 0))
      .limit(parseInt(limit || 200));
    if (!transactions) {
      return res.status(404).json({ message: "No transactions found" });
    }
    res.status(200).json(transactions);
  } catch (err) {
    res.json({ message: err });
  }
};
