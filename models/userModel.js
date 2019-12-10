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
}

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
}

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
}


module.exports = {
    getUser,
    favAddCar,
    favRemoveCar
}