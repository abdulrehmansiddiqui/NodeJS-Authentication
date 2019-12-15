const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { jwtkey } = require('../key')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    //authorization === Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGY2NWViMjE5MWVkOTBhZDBkMDE4NDEiLCJpYXQiOjE1NzY0MjcxODZ9.2gVmIRjwHSU_-4T77NrurlpeTx6me_Jzgqq7skJZY9w

    if (!authorization) {
        return res.status(401).send({ error: "you must be login" })
    }

    //space is important in Bearer 
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwtkey, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "if token is worn" })
        }
        const { userId } = payload
        const user = await User.findById(userId)
        req.user = user;
        next();
    })
}