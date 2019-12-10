'use strict';
const serverUrl = 'https://localhost:8000'; // change url when uploading to server
const localUrl = 'http://127.0.0.1:5500/public/';
const ul = document.querySelector('#car-card-list');
const main = document.querySelector('main');
const logBtn = document.querySelector('#log-btn');
const accBtn = document.querySelector('#acc-btn');
const signUpBtn = document.querySelector('#signup-btn');
const userPageBtn = document.querySelector('#userPage-btn');
const settingsBtn = document.querySelector('#settings-btn');
const oldAdFirstBtn = document.querySelector('#old-ad-first-btn');
const newAdFirstBtn = document.querySelector('#new-ad-first-btn');
const oldCarFirstBtn = document.querySelector('#old-car-first-btn');
const newCarFirstBtn = document.querySelector('#new-car-first-btn');
const eventP = document.querySelector('#event-p');
let currentUser = undefined;
const homeBtn = document.querySelector('#home-btn');
const loginUrl = 'http://localhost:5500/public/login.html';
const homeUrl = 'http://localhost:5500/public/';
const userPageUrl = 'http://localhost:5500/public/userPage.html';
const signUpUrl = 'http://localhost:5500/public/signup.html';

//adding click event to homBtn in nav bar.
homeBtn.addEventListener('click', () => {
  window.location.href = localUrl;
});

//adding click event to signUpBtn in nav bar.
signUpBtn.addEventListener('click', () => {
  window.location.href = localUrl + '/signup.html';
});

//adding click event to settingsBtn in nav bar
settingsBtn.addEventListener('click', () => {
  window.location.href = localUrl + '/user-settings.html';
});

//SORTING MECHANISMS BELOW

//adding click event to oldAdFirstBtn 
oldAdFirstBtn.addEventListener('click', async() => {
  const cars = await getAllCarBySort('byAdTime');
  console.log(cars);
  createCatCards(cars);
})

//adding click event to newAdFirstBtn 
newAdFirstBtn.addEventListener('click', async() => {
  const cars = await getAllCarBySort('byAdTime');
  //we reverse the received array to get latest ad on top.
  cars.reverse();
  console.log(cars);
  createCatCards(cars);
})

//adding click event to oldCarFirstBtn 
oldCarFirstBtn.addEventListener('click', async() => {
  const cars = await getAllCarBySort('byCarAge');
  console.log(cars);
  createCatCards(cars);
})

//adding click event to newCarFirstBtn 
newCarFirstBtn.addEventListener('click', async() => {
  const cars = await getAllCarBySort('byCarAge');
  //we reverse the received array to get newest car on top.
  cars.reverse();
  console.log(cars);
  createCatCards(cars);
})

//create car cards
const createCatCards = (cars) => {
    // clear ul
    ul.innerHTML = '';
    cars.forEach((car) => {
      // create li with DOM methods
      const img = document.createElement('img');
      img.src = serverUrl + '/uploads/' + car.car_profile_image.image_filename;
      img.alt = car.car_reg;
      img.classList.add('car-img-resp');
  
      const figure = document.createElement('figure').appendChild(img);
      figure.classList.add('car-fig');
  
      const h2 = document.createElement('h2');
      h2.innerHTML = `${car.make_name} ${car.car_model}`;

      const p1 = document.createElement('p');
      p1.innerHTML = `Engine ${car.car_engine}` + 'L ' + car.fuel_type;
  
      const p2 = document.createElement('p');
      p2.innerHTML = `Year model ${car.car_reg_date}`;
  
      const p3 = document.createElement('p');
      p3.innerHTML = `Mileage ${car.car_mileage}`;

      const p4 = document.createElement('p');
      p4.innerHTML = `Price ${car.car_price}`;
  
      const detailsButton = document.createElement('button');
      detailsButton.innerHTML = 'Details';
      detailsButton.classList.add('car-btn');
     
      detailsButton.addEventListener('click', (evt) => {
            const redirectURL = localUrl +  'car.html?id=' + car.car_id;
            window.location.href = redirectURL;
        });

      // const favButton = document.createElement('button');
      // favButton.innerHTML = 'Add to Favourities'; 
      // favButton.classList.add('car-btn');
      
      const li = document.createElement('li');
      li.classList.add('light-border', 'car-li');
  
      li.appendChild(h2);
      li.appendChild(figure);
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(p3);
      li.appendChild(p4);
      li.appendChild(detailsButton);
      // li.appendChild(favButton);
      ul.appendChild(li);
    });
  };

  //getting all cars stored in database
  const getCar = async () => {
    try {
      const response = await fetch(serverUrl + '/car/');
      const cars = await response.json();
      createCatCards(cars);
    }
    catch (e) {
      console.log(e.message);
    }
  };

  //getting all cars sorted by add publish time
  const getAllCarBySort = async (sortType) => {
    try {
      const response = await fetch(serverUrl + '/car/sort/' + sortType);
      const cars = await response.json();
      return cars;
    }
    catch (e) {
      console.log(e.message);
    }
  };




  //click event to log-btn in nav bar. taking action based on btn content.
  logBtn.addEventListener('click', () => {
      if(logBtn.innerHTML === 'LOGOUT'){
          window.localStorage.removeItem('token');
          checkLogStatus();
      }else{
          window.location.href = localUrl + 'login.html';
      }
  });


  userPageBtn.addEventListener('click', () => {
    window.location.href = localUrl + 'userPage.html';
  });

  const checkLogStatus = async () => {
    try{
    const token = window.localStorage.getItem('token');
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      };    
      const response = await fetch(serverUrl + '/user/me', fetchOptions);
      const json = await response.json();
      if (json.error) {
        currentUser = undefined;
        logBtn.innerHTML = 'LOGIN';
        accBtn.classList.toggle('hide', true);
        signUpBtn.classList.toggle('hide', false);
        eventP.innerHTML = 'Welcome to CARAPP.';
      } else {
        currentUser = json;
        logBtn.innerHTML = 'LOGOUT';
        accBtn.classList.toggle('hide', false);
        signUpBtn.classList.toggle('hide', true);
        eventP.innerHTML = `LOGGED IN AS ${json.user_name} WELCOME TO CARAPP`;
        eventP.style.backgroundColor = '#436b43';
      }
    }catch(e){
      currentUser = undefined;
      console.log(e.message);
    }
  };




  checkLogStatus();
  getCar();



  //referencecode
   
      // open large image when clicking image
    //   img.addEventListener('click', () => {
    //     modalImage.src = url + '/uploads/' + car.image_filename;
    //     modalImage.alt = car.car_model;
    //     imageModal.classList.toggle('hide');
    //     try {
    //       const coords = JSON.parse(cat.coords);
    //       // console.log(coords);
    //       addMarker(coords);
    //     }
    //     catch (e) {
    //     }
    //   });