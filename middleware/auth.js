'use strict'
const jwt = require('jsonwebtoken');

const pool = require('../database/db');
const promisePool = pool.promise();

const auth = async (req, res, next) =>{
    try{
        console.log(req.header);
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, 'webproject');
        console.log(decoded);
        const user_email = decoded.user_email;
        //first we have to get the user with user_email in decoded object.
        const [users] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', [user_email]);
        console.log(users);
        if(users.length == 0){
            throw Error('no user exist with this email');
        }
        const user_id = users[0].user_id;
        const [tokenRows] = await promisePool.execute('SELECT * FROM web_token where token_user_fk = ? && token_content = ?;', [user_id, token]);
        console.log(tokenRows);
        if(tokenRows.length == 0){
            throw Error('token not present in database with this user_id');
        }

        //attaching user found through token to req.user
        req.user = users[0];

        next();

    } catch(e){
        console.log(e.message);
        res.status(401).send({error: 'Please authenticate'});
    }
};

module.exports = auth;