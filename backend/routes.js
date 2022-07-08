const express = require("express");

const router = express.Router();

const {
  setupWallet,
  getWalletById,
  getAllWallets,
  transact,
  getTransactions,
} = require("./controllers");

router.route("/setup").post(setupWallet);
router.route("/wallets").get(getAllWallets);
router.route("/wallet/:id").get(getWalletById);
router.route("/transact/:walletId").post(transact);
router.route("/transactions").get(getTransactions);

module.exports = router;
