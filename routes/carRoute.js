'use strict';

const express = require('express');
const router = express.Router();
//const multer = require('multer');
//const upload = multer({dest: './uploads/'});
const carController = require('../controllers/carController');
const pool = require('../database/db');
const promisePool = pool.promise();


//path created for returning all cars in database.
router.get('/', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM web_car`');
        console.log([rows]);
         res.json([rows]);
      } catch (e) {
        console.log('error', e.message);
        res.json({error: 'error in database query'});
      }   
    //res.send('request received for returning all cars');
});

//path created for returning car with given id
router.get('/:id', (req, res) => {
    res.send(`request received for car with id: ${req.params.id}`);
});
  
//router.post('/', upload.single('car'), carController.upload_car);


 //router.put('/', carController.car_update_get);
  
 //router.delete('/:id', catController.cat_delete);

  module.exports = router;

 