'use strict'

const userModel = require('../models/userModel');

const userGet = async (req, res) => {
    const user = await userModel.getUser(req.user);
    await res.json(user);   
}

module.exports = {
    userGet
}