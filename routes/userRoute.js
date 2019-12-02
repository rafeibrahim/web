'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const pool = require('../database/db');
const promisePool = pool.promise();



router.get('/', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM web_user');
        console.log([rows]);
         res.json([rows]);
      } catch (e) {
        console.log('error', e.message);
        res.json({error: 'error in database query'});
      }   
});
  
router.get('/:id', (req, res) => {
    res.send(`request received for user with id: ${req.params.id}`);
});
  
 router.post('/register', async (req, res) => {
     console.log(req.body);
     const salt = bcrypt.genSaltSync(12);
     const hash = bcrypt.hashSync(req.body.password, salt);
     //console.log(hash);
     console.log([req.body.name, req.body.email, req.body.address, hash]);
     try{   
            //check if email is already present in database. email has to be unique for signing up --rafei
            const [users] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', [req.body.email]); 
            if(users.length !== 0){
                throw Error('email already exist :(');
            }
                const [rows] = await promisePool.execute('INSERT INTO web_user (user_name, user_email, user_address, user_password) VALUES (?, ?, ?, ? );', [req.body.name, req.body.email, req.body.address, hash]);
                //const [rows] = await promisePool.execute('INSERT INTO  wop_user (name, email, password) VALUES (?, ?, ?);', params);
                console.log([rows]);
                console.log(rows.insertId);
                const [userArray] = await promisePool.execute('SELECT * FROM web_user WHERE user_id = ?;', [rows.insertId]); 
                console.log(userArray[0]);
                console.log(userArray[0].user_email);
                console.log(userArray[0].user_id);
                
                //creating json token for user who is signing up.
                const token = jwt.sign({user_email: userArray[0].user_email}, 'web project', {expiresIn: '24h'});
                console.log(token);
                const [tokenRows] = await promisePool.execute('INSERT INTO web_token (token_user_fk, token_content) VALUES (?, ?);', [userArray[0].user_id, token]);
                console.log(tokenRows[0]);
                userArray[0].token = token;


                res.send(userArray[0]);
        }catch(e){
                console.log(e.message);
                res.send({error: e.message});
                //return {error: 'error in database query'};
            }

      //res.send('post request received');
            // try{
            //     const [rows] = await promisePool.execute('INSERT INTO  web_user (user_name, user_email, user_address ,user_password) VALUES (?, ?, ?, ?);', params);
            //     //const [rows] = await promisePool.execute('INSERT INTO  wop_user (name, email, password) VALUES (?, ?, ?);', params);
            //     return rows;
            // }catch(e){
            //     console.log('error', e.message);
            //     return {error: 'error in database query'};
            // }
 });

 router.post('/login', async (req, res) => {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const [userArray] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', [req.body.email]);
        


        bcrypt.compareSync(req.body.password, '$2a$12$Be6gaCpviS3r4oWx1kFYuuWand370CZftnJhQIF6Pj3Gl85dD.Tu.')
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).send();
    };

    // //try{
    //    if(req.body.email  !== 'daisy@metropolia.fi' || !bcrypt.compareSync(req.body.password, '$2a$12$Be6gaCpviS3r4oWx1kFYuuWand370CZftnJhQIF6Pj3Gl85dD.Tu.')){
    //        console.log('login', 'wrong username or password');
    //        return res.send('login failed');
    //    }
    //    res.send('login successful');
    // //}
});  
  
 //router.put('/', (req, res) => {
 //   res.send('put request reached at /user');
 // });
  
 //router.delete('/', (req, res) => {
 //   res.send('delete request reached at /user');
 // });

 const generateAuthToken = (user_email) => {
    const token = jwt.sign({user_email}, 'web project', {expiresIn: '24h'});
    return token;
 }

  module.exports = router;

 