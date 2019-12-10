'use strict';
const path = require('path');
const date = require('date-and-time');
const express = require('express');
const router = express.Router();
const multer = require('multer');
//file destination should be relative to root...
const upload = multer({dest: './uploads'});
const auth = require('../middleware/auth.js');
const carController = require('../controllers/carController');
const resize = require('../utils/resize.js');
const pool = require('../database/db');
const promisePool = pool.promise();

//path created for returning carmakes options to user
router.get('/make', carController.carModelsGet);

//path created for returning carfuels options to user
router.get('/fuel', carController.carFuelsGet);

//path created for returning cargearboxes options to user
router.get('/gearbox', carController.carGearboxesGet);

//path created for returning all cars in database.
router.get('/', carController.carListGet);

//path created for returning sorted cars
router.get('/sort/:type', carController.carListGetSort);

//path created for returning car with given id
router.get('/:id', carController.carGet);

//path created for deleting car with given id
//currently its not checking whether signed in user is the owner of this car. This is handled by front end
//by only making the delete button visible to user if he/she is owner or admin.
//idea for futher development is that back end must have independent mechanism to check it.
router.delete('/:id', auth, carController.carDelete);

//path created for uploading car
router.post('/', auth, upload.array('photos', 5), carController.uploadCar);


//router.put('/', carController.car_update_get);

  module.exports = router;

 