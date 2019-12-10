'use strict'

const pool = require('../database/db');
const promisePool = pool.promise();

const getUser = async (user) => {
    try{
        const [carRowsForUserId] = await promisePool.query(`
        SELECT web_car.car_id 
        FROM web_car 
        WHERE web_car.car_user_fk = ?;        
        `, [user.user_id]); 
        console.log(carRowsForUserId);
        user.user_cars = carRowsForUserId;

        const [favRowsByUserId] = await promisePool.query(`
        SELECT web_fav.fav_car_fk
        FROM web_fav
        WHERE web_fav.fav_user_fk = ?;
        `, [user.user_id]);
        console.log(favRowsByUserId);
        user.user_fav_cars = favRowsByUserId;

        delete user.user_password;
        return user;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
};

//add favourities to logged in user
const favAddCar = async (params) => {
    try{
        const [favRowsByUserId] = await promisePool.query(`
        INSERT INTO web_fav (fav_car_fk, fav_user_fk)
    VALUES (?, ?);        
        `, params); 
        console.log(favRowsByUserId);
        return favRowsByUserId;

    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
};

//remove favourities from loggid in user
const favRemoveCar = async (params) => {
    try{
        const [favRowsByUserId] = await promisePool.query(`
        DELETE FROM web_fav WHERE fav_car_fk = ? && fav_user_fk = ?;        
        `, params); 
        console.log(favRowsByUserId);
        return favRowsByUserId;

    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
};

//select user from web_user table
const findUserByEmail = async (params) => {
    try{
        console.log(params);
        const [userArray] = await promisePool.execute('SELECT * FROM web_user WHERE user_email = ?;', params);
        console.log(userArray);
        return userArray;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
};

//select user from web_user by user_id
const findUserById = async (params) => {
    console.log('function findUserById');
    try{
        const[userRows] = await promisePool.execute('SELECT * FROM web_user WHERE user_id = ?;', params);
        console.log(userRows[0]);
        return (userRows[0]);
        
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
};

const updateUserNameById = async (params) => {
    try{
        const[userRows]= await promisePool.execute('UPDATE web_user SET user_name = ? WHERE user_id = ?;', params);
        console.log(userRows);
        return (userRows);
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'}
    }
};

const updateUserAdressById = async (params) => {
    try{
        const[userRows]= await promisePool.execute('UPDATE web_user SET user_address = ? WHERE user_id = ?;', params);
        console.log(userRows);
        return userRows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'}
    }
};

const updateUserPasswordById = async (params) => {
    try{
        const[userRows]= await promisePool.execute('UPDATE web_user SET user_password = ? WHERE user_id = ?;', params);
        console.log(userRows);
        return userRows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'}
    }
};

const insertUser = async (params) => {
    try{
        const [rows] = await promisePool.execute('INSERT INTO web_user (user_name, user_email, user_address, user_password) VALUES (?, ?, ?, ? );', params);
        console.log([rows]);
        return rows;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'}
    }
};



module.exports = {
    getUser,
    favAddCar,
    favRemoveCar,
    findUserByEmail,
    findUserById,
    updateUserNameById,
    updateUserAdressById,
    updateUserPasswordById,
    insertUser
};