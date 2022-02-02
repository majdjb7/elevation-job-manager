const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Student = require("../models/Student")

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const student = new Student({
        name: req.body.firstName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        cohort: req.body.cohort,
        password: hashedPassword,
    })

    const result = await student.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {
    const student = await Student.findOne({email: req.body.email})

    if(!student) {
        return res.status(404).send({
            message: 'User Not Found'
        })
    }

    if(!await bcrypt.compare(req.body.password, student.password)) {
        return res.status(400).send({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign({_id: student._id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1 day
    })
    res.send({
        message: 'Success',
        studentID: student._id,
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

        const student = await Student.findOne({_id: claims._id})

        const {password, ...data} = await student.toJSON()

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