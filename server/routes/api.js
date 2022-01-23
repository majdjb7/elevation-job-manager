const express = require("express");
const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.send(transactions);
  } catch (error) {
    res.send(error);
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/transaction/:id", async (req, res) => {
  const transactionID = req.params.id;
  const transaction = await Transaction.findOneAndDelete({
    _id: transactionID,
  });
  res.send(transaction);
});

module.exports = router;
