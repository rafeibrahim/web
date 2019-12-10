'use strict'
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCars = async () => {
    try{
        //Extracting fields which are required by front end. 
        const [carRows] = await promisePool.query(`
        SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_price, web_car.car_reg_date, web_car.car_inspection_date, web_car.car_ad_date_time, web_car.car_location, 
        web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
        web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address
        FROM web_car 
        LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
        LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
        LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
        LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
        `);
        console.log(carRows);
        for(const car of carRows){
          const [imageRows] = await promisePool.query(`
          SELECT web_image.image_filename FROM web_image WHERE web_image.image_car_fk = ? && web_image.image_profile = 1 
          `, [car.car_id]);
          car.car_profile_image = imageRows[0];

          var d = new Date(car.car_reg_date);
          car.car_reg_date = (d.getMonth() + 1).toString() + '-' + d.getFullYear().toString();
        };
        console.log(carRows);
         return carRows;

    }catch(e){
        console.log('error', e.message);
        return ({error: 'operation unsuccessful'});
    }
}

const adTimeSortAllCars = async () => {
  try{
    //Extracting fields which are required by front end. 
    const [carRows] = await promisePool.query(`
    SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_price, web_car.car_reg_date, web_car.car_inspection_date, web_car.car_ad_date_time, web_car.car_location, 
    web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
    web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address
    FROM web_car 
    LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
    LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
    LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
    LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
    ORDER BY web_car.car_ad_date_time
    `);
    console.log(carRows);
    for(const car of carRows){
      const [imageRows] = await promisePool.query(`
      SELECT web_image.image_filename FROM web_image WHERE web_image.image_car_fk = ? && web_image.image_profile = 1 
      `, [car.car_id]);
      car.car_profile_image = imageRows[0];

      var d = new Date(car.car_reg_date);
      car.car_reg_date = (d.getMonth() + 1).toString() + '-' + d.getFullYear().toString();
    };
    console.log(carRows);
     return carRows;

    }catch(e){
        console.log('error', e.message);
        return ({error: 'operation unsuccessful'});
    }
}

const carAgeSortAllCars = async () => {
  try{
    //Extracting fields which are required by front end. 
    const [carRows] = await promisePool.query(`
    SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_price, web_car.car_reg_date, web_car.car_inspection_date, web_car.car_ad_date_time, web_car.car_location, 
    web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
    web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address
    FROM web_car 
    LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
    LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
    LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
    LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
    ORDER BY web_car.car_reg_date
    `);
    console.log(carRows);
    for(const car of carRows){
      const [imageRows] = await promisePool.query(`
      SELECT web_image.image_filename FROM web_image WHERE web_image.image_car_fk = ? && web_image.image_profile = 1 
      `, [car.car_id]);
      car.car_profile_image = imageRows[0];

      var d = new Date(car.car_reg_date);
      car.car_reg_date = (d.getMonth() + 1).toString() + '-' + d.getFullYear().toString();
    };
    console.log(carRows);
     return carRows;

    }catch(e){
        console.log('error', e.message);
        return ({error: 'operation unsuccessful'});
    }
}

const getCar = async (params) => {
    try{
        const [carRowsForID] = await promisePool.query(`
        SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_price, web_car.car_reg_date, web_car.car_inspection_date, web_car.car_ad_date_time, web_car.car_location, 
        web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
        web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address
        FROM web_car 
        LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
        LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
        LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
        LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
        WHERE web_car.car_id = ?;
      `, params);

      
      if(carRowsForID.length === 0){
        throw Error('car with this id not found!');
      }

      //getting images saved for this car from web_image table.
      //using function from carModel
      const imageRowsForID = await getCarImages(params);

      carRowsForID[0].images = imageRowsForID;
      
      //changing formats of dates to return
      const regDate = new Date(carRowsForID[0].car_reg_date);
      carRowsForID[0].car_reg_date = (regDate.getMonth() + 1).toString() + '-' + regDate.getFullYear().toString();

      const inspectDate = new Date(carRowsForID[0].car_inspection_date);
      carRowsForID[0].car_inspection_date = inspectDate.getDate().toString() + '-' + (inspectDate.getMonth() + 1).toString() + '-' + inspectDate.getFullYear().toString();

      const adDate = new Date(carRowsForID[0].car_ad_date_time);
      carRowsForID[0].car_ad_date_time = adDate.getDate().toString() + '-' + (adDate.getMonth() + 1).toString() + '-' + adDate.getFullYear().toString();

      //returning modified object
      return carRowsForID[0];

    }catch(e){
        console.log('error', e.message);
        return ({error: 'operation unsuccessful'});
    }
}


const getModelsCar = async() => {
  try{
    const [makeRows] = await promisePool.query(`SELECT * FROM web_make;`);
    return makeRows;
  }catch(e){
    console.log('error', e.message);
    return ({error: 'Bad Request'});
  }
}

const getFuelsCar = async() => {
  try{
    const [fuelRows] = await promisePool.query(`SELECT * FROM web_fuel;`);
    return fuelRows;
  }catch(e){
    console.log('error', e.message);
    return ({error: 'Bad Request'});
  }
}

const getGearboxesCar = async() => {
  try{
    const [gearboxRows] = await promisePool.query(`SELECT * FROM web_gearbox;`);
    console.log(gearboxRows);
    return gearboxRows;
  }catch(e){
    console.log('error', e.message);
    return ({error: 'Bad Request'});
  }
}

const getCarByRegNo = async(params) => {
  try{
    const[cars] = await promisePool.query(`SELECT * FROM web_car WHERE car_reg = ?`, params);
    return cars;
  }catch(e){
    console.log('error', e.message);
    throw Error('function getCarByRegNo in carMoel: ' + e.message);
  }
}

const addCar = async(params) => {
  try{
    const [carRows] = await promisePool.query(`INSERT INTO web_car (car_reg, car_model, car_price, car_location, car_mileage, car_engine, car_reg_date, car_inspection_date, car_ad_date_time, car_make_fk, car_fuel_fk, car_gearbox_fk, car_user_fk) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, params);
      return carRows;
  }catch(e){
    console.log('error', e.message);
    throw Error('function addCar in carModel: ' + e.message);
  }
}

const addCarImage = async(params) => {
  try{
    const [imageRows] = await promisePool.query(`
    INSERT INTO web_image (image_car_fk, image_filename)
    VALUES (?, ?);
    `, params);
    return imageRows;
  }catch(e){
    console.log('error', e.message);
    throw Error('function addCarImage in carModel: ' + e.message);
  }
}

const addCarProfileImage = async(params) => {
  console.log(params);
  try{
    const [profileImageRow] = await promisePool.query(`
    INSERT INTO web_image (image_car_fk, image_filename, image_profile)
    VALUES (?, ?, ?);
    `, params);
    return profileImageRow;
  }catch(e){
    console.log('error', e.message);
    throw Error('function addCarImage in carModel: ' + e.message);
  }
}

const getCarImages = async(params) => {
  console.log('getCarImages running');
  try{
    const [imageRowsForID] = await promisePool.query(`
      SELECT * FROM web_image WHERE image_car_fk = ?;
      `, params);
      console.log(imageRowsForID);
      return imageRowsForID;

  }catch(e){
    console.log('error', e.message);
    throw Error('function getCarImages in carModel: ' + e.message);
  }
}

const deleteCar = async (params) => {
  console.log('deleteCar function running')
  console.log(params);
  try{
    //first we will remove deleted car saved as favourities. 
    const [favRowsForCarID] = await promisePool.query(`
    DELETE FROM web_fav WHERE fav_car_fk = ?;
    `, params);
    console.log(favRowsForCarID);

    //second we will remove all images saved for the car.
    const [imageRowsForCarID] = await promisePool.query(`
    DELETE FROM web_image WHERE image_car_fk = ?;
    `, params);
    console.log(imageRowsForCarID);

    //third we will remove the car it self
    const [carRowsForID] = await promisePool.query(`
    DELETE FROM web_car WHERE car_id = ?;
    `, params);

    console.log(carRowsForID);
    return carRowsForID
  }catch(e){
    console.log('error', e.message);
    return ({error: 'operation unsuccessful'});
  }
}




module.exports = {
    getAllCars,
    getCar,
    getModelsCar,
    getFuelsCar,
    getGearboxesCar,
    getCarByRegNo,
    addCar,
    addCarImage,
    addCarProfileImage,
    getCarImages,
    deleteCar,
    adTimeSortAllCars,
    carAgeSortAllCars
}