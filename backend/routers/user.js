const { authMiddleware } = require("../middlewares");
const {Users,Accounts} = require('../db')
const express = require("express")
const z = require("zod")

const {JWT_SEC} = require('../config')
const jwt = require("jsonwebtoken");
const { getUser } = require("../getUser");
const userRouter = express.Router()

const signupSchema = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string()
})


userRouter.post('/signup', async (req, res) => {
    const body = req.body
    const { success } = signupSchema.safeParse(body)

    if (!success) {
        res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const userExist = await Users.findOne({
        username: req.body.username
    })

    if (userExist) {
        res.status(411).json({
            msg: "User already exists"
        })

        return
    }

    const user = await Users.create(body)

    const userId = user._id
    // Giving random balance
    await Accounts.create({
        userId:userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({ userId }, JWT_SEC)

    res.json({
        msg: "user created succefully",
        token: token,
        firstName:user.firstname,
        lastName:user.lastname
    })
})


const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
})


userRouter.post('/signin',async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)

    if (!success) {
        res.status(200).json({
            message: "Error while logging in"
        })
    }

    const user = await Users.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SEC)
        res.status(200).json({
            token: token,
            firstName:user.firstname,
            lastName:user.lastname
        })
        return
    }




})

const updateUser = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

userRouter.put('/', authMiddleware, async (req, res) => {


    const { success } = updateUser.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await Users.updateOne({ _id: req.userId },{$set:{password:req.body.password}});


    res.json({
        message: "Updated successfully"
    })

})

userRouter.get("/bulk",authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await Users.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })
    const filteredUsers=users.filter((user)=>{return user._id!=req.userId})
    res.json({
        user: filteredUsers.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = 
    userRouter