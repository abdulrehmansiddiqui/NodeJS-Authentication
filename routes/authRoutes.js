const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { jwtkey } = require('../key')
const router = express.Router();
const User = mongoose.model('User')

const requireToken = require('../middleware/requireToken')

router.get('/verify', requireToken, (req, res) => {
    res.send("your email is " + req.user.email + req.user.password)
})

router.post('/signup', async (req, res) => {
    // console.log(req.body)

    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.send({ token: token })

    } catch (err) {
        res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ error: "must Prive email or password " })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(422).send({ error: "must Prive email or password " })
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtkey)
        res.send({ token: token })
    } catch (err) {
        return res.status(422).send({ error: "must Prive email or password " })
    }
})


module.exports = router




