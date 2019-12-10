'use strict';
const serverUrl = 'https://localhost:8000'; // change url when uploading to server
const localUrl = 'http://127.0.0.1:5500/public/';
const ownCarUl = document.querySelector('#own-car-ul');
const favCarUl = document.querySelector('#fav-car-ul');
const eventP = document.querySelector('#event-p');
const homeBtn = document.querySelector('#home-btn');
const addCarBtn = document.querySelector('#add-car-btn');

homeBtn.addEventListener('click', () => {
  window.location.href = localUrl;
});

addCarBtn.addEventListener('click', () => {
   window.location.href = localUrl + 'car-add.html';
});

//create car cards
const createCarCards = (cars) => {
    // clear ul
    ownCarUl.innerHTML = '';
    cars.forEach((car) => {
      // create li with DOM methods
      const img = document.createElement('img');
      const profileImageObject = car.images.find(image => image.image_profile === 1);
      img.src = serverUrl + '/uploads/' + profileImageObject.image_filename;
      img.alt = car.car_model;
      img.classList.add('car-img-resp');

      const figure = document.createElement('figure').appendChild(img);
      figure.classList.add('car-fig');
  
      const h2 = document.createElement('h2');
      h2.innerHTML = `${car.make_name} ${car.car_model}`;
  
      const p1 = document.createElement('p');
      p1.innerHTML = `Engine ${car.car_engine}`+ 'L ' + car.fuel_type;
  
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
            console.log('detailsButton clicked')
            console.log(car.car_id);
            const redirectURL = localUrl +  'car.html?id=' + car.car_id;
            window.location.href = redirectURL;
        });      
  
      const li = document.createElement('li');
      li.classList.add('light-border', 'car-li');
  
      li.appendChild(h2);
      li.appendChild(figure);
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(p3);
      li.appendChild(p4);
      li.appendChild(detailsButton);
      ownCarUl.appendChild(li);
    });
  };

  //create cat cards
const createFavCarCards = (cars) => {
  // clear ul
  favCarUl.innerHTML = '';
  cars.forEach((car) => {
    // create li with DOM methods
    const img = document.createElement('img');
    const profileImageObject = car.images.find(image => image.image_profile === 1);
    img.src = serverUrl + '/uploads/' + profileImageObject.image_filename;
    img.alt = car.car_model;
    img.classList.add('car-img-resp');

    const figure = document.createElement('figure').appendChild(img);
    figure.classList.add('car-fig');

    const h2 = document.createElement('h2');
    h2.innerHTML = `${car.make_name} ${car.car_model}`;

    const p1 = document.createElement('p');
    p1.innerHTML = `Engine ${car.car_engine}`+ 'L ' + car.fuel_type;

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
          console.log('detailsButton clicked')
          console.log(car.car_id);
          const redirectURL = localUrl +  'car.html?id=' + car.car_id;
          window.location.href = redirectURL;
      });      

    const li = document.createElement('li');
    li.classList.add('light-border', 'car-li');

    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(detailsButton);
    favCarUl.appendChild(li);
  });
};

const getFavCarByCarId = async (carIdArray) => {
  const carArray = [];
  for(const carIdObject of carIdArray){
    console.log(carIdObject);
    try {
        const response = await fetch(serverUrl + '/car/' + carIdObject.fav_car_fk);
        console.log(response);
        const car = await response.json();
        console.log(car);
        carArray.push(car);
        console.log('favcarArray', carArray);
      }
      catch (e) {
        console.log(e.message);
      }

  }
  console.log('favCarArray', carArray);
  createFavCarCards(carArray);   
};
  
  const getCarByCarId = async (carIdArray) => {
    const carArray = [];
    for(const carIdObject of carIdArray){
      console.log(carIdObject);
      try {
          const response = await fetch(serverUrl + '/car/' + carIdObject.car_id);
          console.log(response);
          const car = await response.json();
          console.log(car);
          carArray.push(car);
          console.log('carArray', carArray);
        }
        catch (e) {
          console.log(e.message);
        }

    }
    console.log('carArray', carArray);
    createCarCards(carArray);   
  };

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
        eventP.innerHTML = 'Welcome to CARAPP.';
      } else {
        eventP.innerHTML = `HI! ${json.user_name} WELCOME TO YOUR OWN PAGE`;
        eventP.style.backgroundColor = '#436b43';
        //calling function to get all cars of current user with their ids and then create car cards
        getCarByCarId(json.user_cars);
        console.log('json.user_fav_cars', json.user_fav_cars)
        //calling function to get favcars of user and then create car cards
        getFavCarByCarId(json.user_fav_cars);
        const currentUrl = window.location;
        const currentUrlObject = new URL(currentUrl);

        if(currentUrlObject.searchParams.has('createAd')){
          if(currentUrlObject.searchParams.get('createAd') == 'true'){
               eventP.innerHTML = `ADD CREATED`;
               eventP.style.backgroundColor = '#436b43';
            }else{
             eventP.innerHTML = `ADD CREATION FAILED`;
             eventP.style.backgroundColor = '#436b43';
           }
          }
        }
      }catch(e){
      console.log(e.message);
    }

  };
  checkLogStatus();
