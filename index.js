'use strict'
const express = require('express');
require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const carRoute = require('./routes/carRoute.js');


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true}));


if(process.env.SERVER === 'dev_localhost'){
    console.log('local host detected!');
    require('./secure/localhost')(app);
}else{
        require('./secure/server')(app);
        app.listen(3000, () => {
        console.log(`server app start? listening at port `);
        });
}

app.use('/car', carRoute);

app.use('/user', userRoute);

app.use(express.static('public'));




