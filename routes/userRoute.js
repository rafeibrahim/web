'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth.js');

//disabled route because we donot want to send all users back to client.
// router.get('/', async (req, res) => {
//     try {
//         const [rows] = await promisePool.query('SELECT * FROM web_user');
//         console.log([rows]);
//          res.json([rows]);
//       } catch (e) {
//         console.log('error', e.message);
//         res.json({error: 'error in database query'});
//       }   
// });
  
// router.get('/:id', (req, res) => {
//     res.send(`request received for user with id: ${req.params.id}`);
// });

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin);

 //route for reading user profile.
router.get('/me', auth, userController.userGet);


//route not checking whether car already present in favourities. In the front end we are only giving add-fav option
//to user if the car is not already in their favourities. However for future dev this feature must be added to backend so that it checks 
//user favourities before inserting new values.
router.put('/meAddFav', auth, userController.userAddFav);

//route for removing car from user-fav
router.delete('/meRemoveFav/:id', auth, userController.userRemoveFav);

//route for updating user
router.patch('/me', auth, userController.userUpdate);


//delete user route is not implemented yet. Left for future development.
// router.delete('/me', auth, async(req, res) => {
//     try{
//     console.log(req.user);
//     //Must also delete all cars associated with this user from web_car.
//     //to be implemented yet after car routes have been created. 
//     //then we have to delete saved tokens from web_token for the user.
//     const [tokenRows] = await promisePool.execute('DELETE FROM web_token WHERE token_user_fk = ?;', [req.user.user_id]);
//     //then finally we remove user from web_user
//     const [userRows] = await promisePool.execute('DELETE FROM web_user WHERE user_id = ?;', [req.user.user_id]);
//     res.send(req.user);
//     }catch(e){
//         res.status(500).send();
//     }

// });

module.exports = router;
