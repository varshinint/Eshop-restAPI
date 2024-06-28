const {User} = require('../model/user')

const express = require('express')

const bcrypt = require('bcryptjs')

const router = express.Router()

const jwt = require('jsonwebtoken')

router.get('/', async(req,res)=>{

    const userList = await User.find().select('-passwordHash')
    // front end users do not want to see hashed password. 
    // so select( ) is used
    if(!userList){
       res.status(500).json({success : false})
    }
    res.send(userList)
})

router.get('/:id', async(req,res)=>{
        
    const user = await User.findById(req.params.id).select('-passwordHash')
    
    if(!user)
        return res.status(500).json({message: "The user is not found"})
    else
        return res.status(200).send(user)
          
})

router.post('/', async(req,res)=>{

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        //Encoding the password using bcrypt library
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,

    })
    newUser = await newUser.save()

    if(!newUser)
        return res.status(500).send('New user cannot be created')
    res.send(newUser)
})

router.post('/login', async(req,res)=>{

    const user = await User.findOne({email: req.body.email})

    const secret = process.env.SECRET

    if(!user){
        return res.status(400).send('The user not found')
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({
                userId : user.id,
        },
        secret,
        {expiresIn : '1d'}
    )
// The token is created by the secret key 
    // This how will be the response 
    //{"user": "ranga@gmail.com",
   // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVjMjc5OTY4ZDQyOTg4MTExOWI1YTciLCJpYXQiOjE3MTczMjI1MTh9.jATk0Y9fl5ZzuO-n5x4blpwMwQSWZ8UlBeI5DPFr6eI"
    res.status(200).send({user: user.email, token: token})
    }
    else{
        res.status(500).send('password wrong')
    }
})

router.put('/:id' ,async(req,res)=>{

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            //Encoding the password using bcrypt library
            passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        {new : true}
    )
    if(!updatedUser){
        return res.status(500).send('New user cannot be created')
    }
    res.send(updatedUser)

})

module.exports = router