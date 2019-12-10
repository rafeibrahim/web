'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth.js');
const pool = require('../database/db');
const promisePool = pool.promise();

//disabled route because we donot want to send all users back to client.
// router.get('/', async (req, res) => {
//     try {
//         const [rows] = await promisePool.query('SELECT * FROM web_user');
//         console.log([rows]);
//          res.json([rows]);
//       } catch (e) {
//         console.log('error', e.message);
//         res.json({error: 'error in database query'});
//       }   
// });
  
// router.get('/:id', (req, res) => {
//     res.send(`request received for user with id: ${req.params.id}`);
// });
  
 router.post('/register', async (req, res) => {
     console.log(req.body);
     const salt = bcrypt.genSaltSync(12);
     const hash = bcrypt.hashSync(req.body.user_password, salt);
     //console.log(hash);
     console.log([req.body.user_name, req.body.user_email, req.body.user_address, hash]);
     try{   
            //check if email is already present in database. email has to be unique for signing up --rafei
            const [users] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', [req.body.user_email]); 
            if(users.length !== 0){
                throw Error('email already exist :(');
            }
                const [rows] = await promisePool.execute('INSERT INTO web_user (user_name, user_email, user_address, user_password) VALUES (?, ?, ?, ? );', [req.body.user_name, req.body.user_email, req.body.user_address, hash]);
                //const [rows] = await promisePool.execute('INSERT INTO  wop_user (name, email, password) VALUES (?, ?, ?);', params);
                console.log([rows]);
                console.log(rows.insertId);
                const [userArray] = await promisePool.execute('SELECT * FROM web_user WHERE user_id = ?;', [rows.insertId]); 
                console.log(userArray[0]);
                console.log(userArray[0].user_email);
                console.log(userArray[0].user_id);
                
                //creating json token for user who is signing up.
                const token = jwt.sign({user_email: userArray[0].user_email}, 'webproject', {expiresIn: '24h'});
                console.log(token);
                //Not saving token now.... 
                // const [tokenRows] = await promisePool.execute('INSERT INTO web_token (token_user_fk, token_content) VALUES (?, ?);', [userArray[0].user_id, token]);
                // console.log(tokenRows[0]);
                userArray[0].token = token;
                //removing password from userObject returned to client. 
                delete userArray[0].user_password;


                res.send(userArray[0]);
        }catch(e){
                console.log(e.message);
                res.status(400).send({error: e.message});
                //return {error: 'error in database query'};
            }
 });

 router.post('/login', async (req, res) => {
    console.log(req.body);
    // const salt = bcrypt.genSaltSync(12);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const [userArray] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', [req.body.user_email]);
        console.log(userArray);
        console.log(userArray[0]);
        if(userArray.length === 0){
            throw Error('wrong username or pasword');
        }

        if(!bcrypt.compareSync(req.body.user_password, userArray[0].user_password)){
            throw Error('wrong username or password');
        };
        console.log('testing user login path');
        console.log(userArray[0].user_email);
        const token = generateAuthToken(userArray[0].user_email);
        console.log(token);
        //Not saving toke to database anylonger...
        userArray[0].token = token;
        delete userArray[0].user_password;
        res.send(userArray[0]);

    }catch(e){
        console.log(e.message);
        res.status(400).send({error: e.message});
    };
});  


router.get('/me', auth, userController.userGet);


//route not checking whether car already present in favourities. In the front end we are only giving add-fav option
//to user if the car is not already in their favourities. However for future dev this feature must be added to backend so that it checks 
//user favourities before inserting new values.
router.put('/meAddFav', auth, userController.userAddFav);


router.delete('/meRemoveFav/:id', auth, userController.userRemoveFav);

router.patch('/me', auth,  async (req, res) => {
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
        console.log(user_id);

        if(req.body.user_name){
            const[userRows]= await promisePool.execute('UPDATE web_user SET user_name = ? WHERE user_id = ?;', [req.body.user_name, user_id]);
        }

        if(req.body.user_address){
            const[userRows]= await promisePool.execute('UPDATE web_user SET user_address = ? WHERE user_id = ?;', [req.body.user_address, user_id]);
        }

        if(req.body.user_password){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(req.body.user_password, salt);
            const[userRows]= await promisePool.execute('UPDATE web_user SET user_password = ? WHERE user_id = ?;', [hash, user_id]);
        }

        const[userRows] = await promisePool.execute('SELECT * FROM web_user WHERE user_id = ?;', [user_id]);
        console.log(userRows[0]);
        res.send(userRows[0]);
    }catch(e){
        res.status(400).send({error: e.message});
    }
});

router.delete('/me', auth, async(req, res) => {
    try{
    console.log(req.user);
    //Must also delete all cars associated with this user from web_car.
    //to be implemented yet after car routes have been created. 
    //then we have to delete saved tokens from web_token for the user.
    const [tokenRows] = await promisePool.execute('DELETE FROM web_token WHERE token_user_fk = ?;', [req.user.user_id]);
    //then finally we remove user from web_user
    const [userRows] = await promisePool.execute('DELETE FROM web_user WHERE user_id = ?;', [req.user.user_id]);
    res.send(req.user);
    }catch(e){
        res.status(500).send();
    }

});
  
 const generateAuthToken = (user_email) => {
    const token = jwt.sign({user_email}, 'webproject', {expiresIn: '24h'});
    return token;
 }

  module.exports = router;
