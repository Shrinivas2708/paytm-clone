const express = require("express");
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const mainRouter = require("./routes/index")
const accountsRouter = require("./routes/accounts")

app.use("/api/v1",mainRouter)//This means all requests coming to this /api/v1 will go to mainRouter that is routes 
app.use("/api/v1/account",accountsRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
 
})