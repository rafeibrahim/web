'use strict'
const resize = require('../utils/resize.js');
const carModel = require('../models/carModel');
const path = require('path');
const date = require('date-and-time');


const carListGet = async (req, res) => {
    const cars = await carModel.getAllCars();
    await res.json(cars);
};

const carListGetSort = async (req, res) => {
    console.log('carListGet function called');
    console.log('req.params', req.params);
    console.log(req.params.type);
    if(req.params.type === 'byAdTime'){
        const cars = await carModel.adTimeSortAllCars();
        await res.json(cars);
    }else if(req.params.type === 'byCarAge'){
        const cars = await carModel.carAgeSortAllCars();
        await res.json(cars);
    } 
    else{
        res.json({error: 'sort query do not exist'});
    }
};



const carGet = async (req, res) => {
    const params = [req.params.id];
    const car = await carModel.getCar(params);
    await res.json(car);
};

const carDelete = async (req, res) => {
    console.log('carDelete from carController running');
    const params = [req.params.id];
    const car = await carModel.deleteCar(params);
    console.log(car);
    await res.json(car);
};

const carModelsGet = async (req, res) => {
    const carModels = await carModel.getModelsCar();
    await res.json(carModels);
};

const carFuelsGet = async (req, res) => {
    const carFuels = await carModel.getFuelsCar();
    await res.json(carFuels);
};

const carGearboxesGet = async (req, res) => {
    const carGearboxes = await carModel.getGearboxesCar();
    await res.json(carGearboxes);
};

const uploadCar = async(req, res) => {
    console.log('uploadCar running');
    console.log('res.body', req.body);
    try{
        console.log('res.body.user', req.user);
        req.body.user_fk = `${req.user.user_id}`;
        console.log('req.body.user_fk', req.body.user_fk);
        const now = new Date();
        req.body.car_ad_date_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        console.log('req.body.car_ad_date_time', req.body.car_ad_date_time);

        const carRegParams = [req.body.car_reg];
        const carsWithRegNo = await carModel.getCarByRegNo(carRegParams);
        
        console.log(carsWithRegNo);
        //first we have to check whether input reg number exist in database already.
        if(carsWithRegNo.length !== 0){
            throw Error('car with this reg. no. already exists... :(');
        }
        //logging params for carUpload function.
        console.log('car-insert-params', [req.body.car_reg, req.body.car_model, req.body.car_price, req.body.car_location, req.body.car_mileage, req.body.car_engine, req.body.car_reg_date, req.body.car_inspection_date, req.body.car_ad_date_time, req.body.car_make_fk, req.body.car_fuel_fk, req.body.car_gearbox_fk, req.body.user_fk]);
        const carUploadParams = [req.body.car_reg, req.body.car_model, req.body.car_price, req.body.car_location, req.body.car_mileage, req.body.car_engine, req.body.car_reg_date, req.body.car_inspection_date, req.body.car_ad_date_time, req.body.car_make_fk, req.body.car_fuel_fk, req.body.car_gearbox_fk, req.body.user_fk];
        const insertCar = await carModel.addCar(carUploadParams);

        //Profile image determination
        let profileImageFileName = req.files[0].filename;
        console.log('profileImageFileName', profileImageFileName);
        //checking if profile image original name given by user exists in uploaded photos then that photo should be marked as profile image instead of first image uploaded.
        const profileImageByUser = req.body.car_profile_image;
        for(const imageObject of req.files){
          if(profileImageByUser === path.parse(imageObject.originalname).name){
            profileImageFileName = imageObject.filename;
                }
            };
        console.log('profileImageFileName', profileImageFileName);

         //uploading car photos filenames to web_image table.
        for(const photo of req.files){
        //making thumbnails of uploaded photos and saving them in thumbnails directory
        await resize.makeThumbnail(photo.path, ('thumbnails/' + photo.filename), {width: 160, height: 160});
        //first we check if current photo is profile image
        if(photo.filename === profileImageFileName){
          console.log('profile image condition running');
          //saving profile photo to web_image table with profile image attribute of 1
          const carProfileImageParams = [insertCar.insertId, photo.filename, 1];
          const profileImage = await carModel.addCarProfileImage(carProfileImageParams);
          
        }else{
        //saving each photo to web_image table
        const carImageParams = [insertCar.insertId, photo.filename];
        const image = await carModel.addCarImage(carImageParams);
        }
      };
      const insertedCar = await carModel.getCar([insertCar.insertId]);
      res.send(insertedCar);
    }catch(e){
        console.log('error', e.message);
        res.json({error: 'operation unsuccessful'});
    } 
};

module.exports = {
    carListGet,
    carGet,
    carModelsGet,
    carFuelsGet,
    carGearboxesGet,
    uploadCar,
    carDelete,
    carListGetSort
}