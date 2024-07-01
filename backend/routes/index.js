const express = require("express")
const router = express.Router()
const userRouter = require("./user")

router.use("/user",userRouter)
module.exports=router


// we had to use this as all request will go through /api/v1/... this
// /api/v1/user
// /api/v1/transaction