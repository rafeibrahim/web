'use strict'

const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const userRegister = async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.user_password, salt);
    try{   
           //check if email is already present in database. email has to be unique for signing up --rafei
           const users = await userModel.findUserByEmail([req.body.user_email]); 
           if(users.length !== 0){
               throw Error('email already exist :(');
           }

            const insertParams = [req.body.user_name, req.body.user_email, req.body.user_address, hash];
            const rows = await userModel.insertUser(insertParams);

            const addedUser = await userModel.findUserById([rows.insertId]);               
            //creating json token for user who is signing up.
            const token = jwt.sign({user_email: addedUser.user_email}, 'webproject', {expiresIn: '24h'});
            addedUser.token = token;
            //removing password from userObject returned to client. 
            delete addedUser.user_password;


               res.send(addedUser);
       }catch(e){
               console.log(e.message);
               res.status(400).send({error: e.message});
       }
};

const userGet = async (req, res) => {
    const user = await userModel.getUser(req.user);
    await res.json(user);   
};

const userAddFav = async(req, res) => {
    console.log('userAddAFav function from user controller');
    console.log(req.body.carId);
    console.log(req.user.user_id);
    const params = [req.body.carId, req.user.user_id];
    const favInsertReturn = await userModel.favAddCar(params);
    await res.json(favInsertReturn);
};

const userRemoveFav = async(req, res) => {
    console.log('userRemoveFav function from user controller');
    console.log(req.params);
    console.log([req.params.id, req.user.user_id]);
    const params = [req.params.id, req.user.user_id];
    const favRemoveReturn = await userModel.favRemoveCar(params);
    await res.json(favRemoveReturn);
};


const userLogin = async(req, res) => {
    console.log('userLogin function running');
    try{
    const params = [req.body.user_email];
    const userRows = await userModel.findUserByEmail(params);
    console.log(userRows);
    if(userRows.length === 0){
        throw Error('wrong username or pasword');
    }

    if(!bcrypt.compareSync(req.body.user_password, userRows[0].user_password)){
        throw Error('wrong username or password');
    };
    console.log('testing user login path');
    console.log(userRows[0].user_email);
    const token = generateAuthToken(userRows[0].user_email);
    console.log(token);
    //Not saving toke to database anylonger...
    userRows[0].token = token;
    delete userRows[0].user_password;
    res.send(userRows[0]); 
    }catch(e){
        console.log('error', e.message);
        res.json({error: 'login unsuccessful'});
    }
};


const userUpdate = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['user_name', 'user_address', 'user_password'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    try{
        if(!isValidOperation){
            throw Error('Invalid updates!');
        }
        const user_id = req.user.user_id;
        if(req.body.user_name){
            const params = [req.body.user_name, user_id];
            console.log(params);
            const rows = await userModel.updateUserNameById(params);
            console.log(rows);
        }

        if(req.body.user_address){
            const params = [req.body.user_address, user_id];
            const rows = await userModel.updateUserAdressById(params);
        }

        if(req.body.user_password){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(req.body.user_password, salt);
            const params = [hash, user_id];
            const rows = await userModel.updateUserPasswordById(params);
        }

        const params = [user_id];
        console.log('params', [params]);
        const user = await userModel.findUserById(params);
        console.log(user);
        res.send(user);
    }catch(e){
        res.status(400).send({error: e.message});
    }
};


//function for generating jwt token.
const generateAuthToken = (user_email) => {
    const token = jwt.sign({user_email}, 'webproject', {expiresIn: '24h'});
    return token;
 }


module.exports = {
    userGet,
    userAddFav,
    userRemoveFav,
    userLogin,
    userUpdate,
    userRegister
}