'use strict'

const userModel = require('../models/userModel');

const userGet = async (req, res) => {
    const user = await userModel.getUser(req.user);
    await res.json(user);   
}

const userAddFav = async(req, res) => {
    console.log('userAddAFav function from user controller');
    console.log(req.body.carId);
    console.log(req.user.user_id);
    const params = [req.body.carId, req.user.user_id];
    const favInsertReturn = await userModel.favAddCar(params);
    await res.json(favInsertReturn);
}

const userRemoveFav = async(req, res) => {
    console.log('userRemoveFav function from user controller');
    console.log(req.params);
    console.log([req.params.id, req.user.user_id]);
    const params = [req.params.id, req.user.user_id];
    const favRemoveReturn = await userModel.favRemoveCar(params);
    await res.json(favRemoveReturn);
}

module.exports = {
    userGet,
    userAddFav,
    userRemoveFav
}