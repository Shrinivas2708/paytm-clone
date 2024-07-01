const express = require("express")
const authMiddleware = require("../middlewares/authMiddlewares")
const { Accounts } = require("../db")
const { default: mongoose } = require("mongoose")
const router = express.Router()

router.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Accounts.findOne({
        userId:req.userId
    });
    res.json({balance:account.balance})
})
router.post("/transfer",authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    if(amount === "0"){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Amount Should be more than 0"
        });
    }
    // Fetch the accounts within the transaction
    const account = await Accounts.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Accounts.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Accounts.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Accounts.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})
module.exports = router