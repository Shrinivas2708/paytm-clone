const db = require("mongoose")

db.connect('mongodb+srv://ssherikar2005:shrinivas%40123@cluster0.u4yupz4.mongodb.net/paytm')

const UserSchema = new db.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,

})
const accountSchema = new db.Schema({
    // accountNumber:String,    
    balance:Number,
    userId: { type: db.Schema.Types.ObjectId, ref: 'Users' }
})
const User = db.model("Users",UserSchema)
const Accounts = db.model("Accounts",accountSchema)
module.exports = {
    User,
    Accounts
}