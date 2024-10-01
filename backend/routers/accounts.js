
const express=require('express')
const { authMiddleware } = require('../middlewares')
const { Accounts } = require('../db')
const mongoose = require('mongoose')
const accountsRouter=express.Router()

accountsRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await Accounts.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

accountsRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction()
    const {amount,to}=req.body
    const account=await Accounts.findOne({userId:req.userId})
    if(!account||account.balance<amount){
        try{
            await session.abortTransaction()
            return res.status(401).json({msg:"Insufficient Balance"})
        }
        catch(err){
            return res.json({msg:"Insufficient Balance"})
        }
    }

    const toAccount=await Accounts.findOne({userId:to})

    if (!toAccount){
        await session.abortTransaction()
        return res.status(411).json({msg:"Invalid User"})
    }

    await Accounts.updateOne({userId:req.userId},{
        $inc:{
            balance:-amount
        }
    })

    await Accounts.updateOne({userId:to},{
        $inc:{
            balance:amount
        }
    })
    await session.commitTransaction()
    return res.json({msg:"Transfer successful!!"})

})

module.exports=accountsRouter