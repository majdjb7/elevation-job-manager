const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models/User")

router.post('/register', async (req, res) => {
    console.log("HI")
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




module.exports = router;