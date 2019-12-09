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
        delete user.user_password;
        return user;
    }catch(e){
        console.log('error', e.message);
        return {error: 'operation unsuccessful'};
    }
}


module.exports = {
    getUser
}