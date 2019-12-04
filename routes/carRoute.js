'use strict';

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


//path created for returning all cars in database.
router.get('/', async (req, res) => {
    try {
        //Extracting fields which are required by front end. 
        const [rows] = await promisePool.query(`
        SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_year, web_car.car_location, 
        web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
        web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address,
        web_image.image_filename
        FROM web_car 
        LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
        LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
        LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
        LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
        LEFT JOIN web_image ON web_car.car_index_image_fk = web_image.image_id
        ;`);
        console.log([rows]);
         res.json(rows);
      } catch (e) {
        console.log('error', e.message);
        res.json({error: 'error in database query'});
      }   
    //res.send('request received for returning all cars');
});

//path created for returning car with given id
router.get('/:id', async (req, res) => {
    //res.send(`request received for car with id: ${req.params.id}`);
    try{
      const [carRowsForID] = await promisePool.query(`
      SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_year, web_car.car_location, 
      web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
      web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address,
      web_image.image_filename
      FROM web_car 
      LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
      LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
      LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
      LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
      LEFT JOIN web_image ON web_car.car_index_image_fk = web_image.image_id
      WHERE web_car.car_id = ?;
      `, [req.params.id]);

      if(carRowsForID.length === 0){
        throw Error('car with this id not found!');
      }

      //getting images saved for this car from web_image table.
      const [imageRowsForID] = await promisePool.query(`
      SELECT * FROM web_image WHERE image_car_fk = ?;
      `, [req.params.id]);

      //console.log([rows]);
      res.send([carRowsForID[0], imageRowsForID]);

    }catch(e){
      console.log('error', e.message);
      res.status(400).send({error: 'Bad Request'});
    }
});

//createCar endpoint
//reminder: must add auth middleware finally. 
//building this route on assumption that user can select only given options for FK:s in web_car table.
router.post('/', auth, upload.array('photos', 5), async (req, res) => {
    console.log('error logging starts here: ')
    console.log(req.body);
    console.log(req.user);
    console.log(req.files);
    console.log('real function starts from here: ');
    try{
      //first we have to check whether input reg number exist in database already.
      const[cars] = await promisePool.query(`SELECT * FROM web_car WHERE car_reg = ?`, [req.body.car_reg]);
      console.log(cars);
      if(cars.length !== 0){
        throw Error('car with this reg. no. already exists... :(');
      }
      //next step is to add the car to the database.
      const [carRows] = await promisePool.query(`INSERT INTO web_car (car_reg, car_model, car_year, car_price, car_location, car_mileage, car_engine, car_make_fk, car_fuel_fk, car_gearbox_fk, car_user_fk) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.car_reg, req.body.car_model, req.body.car_year, req.body.car_price, req.body.car_location, req.body.car_mileage, req.body.car_engine, req.body.car_make_fk, req.body.car_fuel_fk, req.body.car_gearbox_fk, req.body.car_user_fk]);
      console.log(carRows);
      //first we should save the name of first photo uploaded as index_image_filename
      const index_image_filename = req.files[0].filename;
      //next we should save uploaded car photos filenames to web_image table.
      for(const photo of req.files){
        //making thumbnails of uploaded photos and saving them in thumbnails directory
        await resize.makeThumbnail(photo.path, ('thumbnails/' + photo.filename), {width: 160, height: 160});
        //saving each photo to web_image table
        const [imageRows] = await promisePool.query(`
        INSERT INTO web_image (image_car_fk, image_filename)
        VALUES (?, ?);
        `, [carRows.insertId, photo.filename]);
        if(photo.filename === index_image_filename){
          //saving fk of only index image in web_car
          const [carArray] = await promisePool.query(`
          UPDATE web_car SET car_index_image_fk = ? WHERE car_id = ?;
          `, [imageRows.insertId, carRows.insertId]);
        }
      };
      //getting images saved for this car from web_image table.
      const [imageRowsForID] = await promisePool.query(`
      SELECT * FROM web_image WHERE image_car_fk = ?;
      `, [carRows.insertId]);
      //next we have to grab inserted car from car_id returned from above query and send it to the client.
      const[carRowsForID] = await promisePool.query(`
      SELECT web_car.car_id, web_car.car_reg, web_car.car_model, web_car.car_year, web_car.car_location, 
        web_car.car_mileage, web_car.car_engine, web_make.make_name, web_gearbox.gearbox_type,
        web_fuel.fuel_type, web_user.user_id, web_user.user_name, web_user.user_email, web_user.user_address,
        web_image.image_filename
        FROM web_car 
        LEFT JOIN web_make ON web_car.car_make_fk = web_make.make_id
        LEFT JOIN web_gearbox ON web_car.car_gearbox_fk = web_gearbox.gearbox_id
        LEFT JOIN web_fuel ON web_car.car_fuel_fk = web_fuel.fuel_id
        LEFT JOIN web_user ON web_car.car_user_fk = web_user.user_id
        LEFT JOIN web_image ON web_car.car_index_image_fk = web_image.image_id
        WHERE web_car.car_id = ?;
      `, [carRows.insertId]);
      res.send([carRowsForID[0], imageRowsForID]);
     }catch(e){
       console.log(e.message);
       res.status(400).send();
     }

    //res.send('post request received at /car/');
});

//router.post('/carphotos', upload.single('car'), (req, res) => {
router.post('/carphotos', auth, upload.array('photos', 5), (req, res) => {
  console.log(req.body);
  console.log(req.body.car_reg);
  console.log(req.files);
  res.send('post request received at /carphotos');
});


 //router.put('/', carController.car_update_get);
  
 //router.delete('/:id', catController.cat_delete);

  module.exports = router;

 