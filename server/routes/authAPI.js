const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")


/*
{
    "email": "m@gmail.com",
    "password": "a123456"
}
*/
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return res.status(404).send({
            message: 'User Not Found'
        })
    }

    if(!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1 day
    })

    res.send({
        message: 'Success'
    })
})

router.get('/user', async (req, res) => {
    try{
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, 'secret')

        if(!claims) {
            return res.status(401).send({
                message: 'Unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    }catch (e) {
        return res.status(401).send({
            message: 'Unauthenticated'
        })
    }
})

router.post('/logout', async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'Success'
    })
})


module.exports = router;