// backend/routes/user.js
const jwts = []
const express = require('express');
const z = require("zod")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddlewares")
const {signupSchema,signinSchema ,updateSchema} = require( "./zodSchemas")
const {User,Accounts} = require("../db")
const jwt = require("jsonwebtoken")
const secret = require("../config")
router.post("/signup", async (req,res)=>{
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        res.json({msg:"Incorrect inputs"})
        return
    }
    const user = await User.findOne({
        username: req.body.username
    })
    if(user){
        res.json({
            message: "Email already taken"
        })
        return
    }
    const dbUser = await User.create(req.body)
    const token = jwt.sign({
        userId:dbUser._id
    },secret)
    await Accounts.create({
        userId:dbUser._id,
        balance: 1 + Math.random() * 1000
    })
    res.json({msg:"User created successfully",
        token: token
    })

})
router.post("/signin", async (req,res)=>{
    const {success} = signinSchema.safeParse(req.body)
    if(!success){
        res.json({msg:"Incorrect inputs"})
        return
    }
    const user = await User.findOne({
        username: req.body.username,
        password:req.body.password
    })
    if(!user){
        res.json({msg:"Error while logging in "})
        return
    }
    const token = jwt.sign({
        userId:user._id
    },secret)
    jwts.push(token)
    console.log(jwts)
    res.json({token:token})
})
router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body)
    if (!success){
        res.status(411).json({
            msg:"Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},req.body);
    res.json({msg:"User information updated successfully"})

})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
// console.log(users)
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;