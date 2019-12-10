'use strict';
const serverUrl = 'https://10.114.32.138/carapp'; 
const localUrl = 'https://10.114.32.138/carapp/';


const currentUrl = window.location;
const currentUrlObject = new URL(currentUrl);
const carId = currentUrlObject.searchParams.get('id');

const carCardList = document.querySelector('#car-card-list');
const carDetailsList = document.querySelector('#car-details-list');
const ownerDetailsList = document.querySelector('#owner-details-list');
const homeBtn = document.querySelector('#home-btn');
const editBtn = document.querySelector('#edit-btn');
const delBtn = document.querySelector('#del-btn');
const favBtn = document.querySelector('#fav-btn');

homeBtn.addEventListener('click', () => {
    window.location.href = localUrl;
});

delBtn.addEventListener('click', async () => {
  try{
      const token = window.localStorage.getItem('token');
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      };

      const response = await fetch(serverUrl + '/car/' + carId, fetchOptions);
      const json = await response.json();

      if (json.error) {
        
        // eventP.innerHTML = 'Welcome to CARAPP.';
      } else {
        
        // eventP.innerHTML = `LOGGED IN AS ${json.user_name} WELCOME TO CARAPP`;
        // eventP.style.backgroundColor = '#436b43';
        window.location.href = localUrl + 'userPage.html';
      }
  }catch(e){
    console.log(e.message);
  }  
});

 //click event to log-btn in nav bar. taking action based on btn content.
 favBtn.addEventListener('click', async () => {
   console.log('favbtn clicked');
   console.log(favBtn.innerHTML);
    if(favBtn.innerHTML == 'Add to Fav'){
      console.log('Add to Fav detected');
        //send fetch request to add this car to logged in user favourities
        try {
          const token = window.localStorage.getItem('token');
          const body = {
            carId
          }
          const fetchOptions = {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(body),
          };
          console.log(fetchOptions);
          const response = await fetch(serverUrl + '/user/meAddFav', fetchOptions);
          const json = await response.json();
          if (json.error) {
            console.json(json.error);
            // eventP.innerHTML = 'Welcome to CARAPP.';
          } else {
            // eventP.innerHTML = `LOGGED IN AS ${json.user_name} WELCOME TO CARAPP`;
            // eventP.style.backgroundColor = '#436b43';
            window.location.href = localUrl + 'userPage.html';
          }
        }catch(e){
          console.log(e.message);
        }
    }else{
      //to do if fav-btn is remove-favourities
      try {
        const token = window.localStorage.getItem('token');
        const fetchOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        };
  
        const response = await fetch(serverUrl + '/user/meRemoveFav/' + carId, fetchOptions);
        const json = await response.json();
        if (json.error) {
          console.log(json.error);
          // eventP.innerHTML = 'Welcome to CARAPP.';
        } else {
          // eventP.innerHTML = `LOGGED IN AS ${json.user_name} WELCOME TO CARAPP`;
          // eventP.style.backgroundColor = '#436b43';
          window.location.href = localUrl + 'userPage.html';
        }
      }catch(e){
        console.log(e.message);
      }
    }
});

    
      // example code for PUT request. 
      // modForm.addEventListener('submit', async (evt) => {
      //   evt.preventDefault();
      //   const data = serializeJson(modForm);
      //   const fetchOptions = {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      //     },
      //     body: JSON.stringify(data),
      //   };
      
      //   console.log(fetchOptions);
      //   const response = await fetch(url + '/cat', fetchOptions);
      //   const json = await response.json();
      //   console.log('modify response', json);
      //   getCat();
      // });


const createImageCards = (imageArray) => {
    //clear ul
    carCardList.innerHTML = ''; 
    imageArray.forEach(image => {;
        //create li with DOM methods
        const img = document.createElement('img');
        img.src = serverUrl + '/uploads/' + image.image_filename;
        img.alt = 'car-image';
        img.classList.add('car-img-resp');
    
        const figure = document.createElement('figure').appendChild(img);
        figure.classList.add('car-fig');

        const li = document.createElement('li');
        li.classList.add('light-border', 'car-li');

        li.appendChild(figure);
        carCardList.appendChild(li);
    });
}

const createCarDetails = (car) => {
    //clear ul
    carDetailsList.innerHTML = '';
    const carHeading = document.createElement('h2');
    carHeading.innerHTML = car.make_name + ' ' + car.car_model;
    const subtitleText = document.createElement('p')
    subtitleText.innerHTML = 'Car Details';
    const heading = document.createElement('li');
    heading.appendChild(carHeading);
    heading.appendChild(subtitleText);
    heading.classList.add('item-li');

    //creating li element for left side details
    const yearModel = document.createElement('p')
    yearModel.innerHTML = 'Year Model: ' + car.car_reg_date;
    yearModel.classList.add('item-p');

    const regNo = document.createElement('p')
    regNo.innerHTML = 'Reg. No: ' + car.car_reg;
    regNo.classList.add('item-p');

    const gearbox = document.createElement('p')
    gearbox.innerHTML = 'Gearbox: ' + car.gearbox_type;
    gearbox.classList.add('item-p');

    const engine = document.createElement('p');
    engine.innerHTML = 'Engine: ' + car.car_engine + 'L ' + car.fuel_type;
    engine.classList.add('item-p');

    const details1 = document.createElement('li');
    details1.appendChild(yearModel);
    details1.appendChild(regNo);
    details1.appendChild(gearbox);
    details1.appendChild(engine);
    details1.classList.add('item-details');

    //creating li element for right side details
    const inspectDate = document.createElement('p')
    inspectDate.innerHTML = 'Inspection Date: ' + car.car_inspection_date;
    inspectDate.classList.add('item-p');

    const mileage = document.createElement('p')
    mileage.innerHTML = 'Mileage: ' + car.car_mileage;
    mileage.classList.add('item-p');

    const location = document.createElement('p');
    location.innerHTML = 'Location: ' + car.car_location;
    location.classList.add('item-p');

    const adDate = document.createElement('p')
    adDate.innerHTML = 'Ad posted on: ' + car.car_ad_date_time;
    adDate.classList.add('item-p');

    const details2 = document.createElement('li');
    details2.appendChild(inspectDate);
    details2.appendChild(mileage);
    details2.appendChild(location);
    details2.appendChild(adDate);
    details2.classList.add('item-details');

    carDetailsList.appendChild(heading);
    carDetailsList.appendChild(details1);
    carDetailsList.appendChild(details2);
}

const createOwnerDetails = async (car) => {
       //clear ul
    ownerDetailsList.innerHTML = '';

    const ownerHeading = document.createElement('p')
    ownerHeading.innerHTML = 'Owner Details';
    const heading = document.createElement('li');
    heading.appendChild(ownerHeading);
    heading.classList.add('item-li');

    //creating li element for left side details

    const userName = document.createElement('p')
    userName.innerHTML = 'Name: ' + car.user_name;
    userName.classList.add('item-p');

    const userEmail = document.createElement('p')
    userEmail.innerHTML = 'Email: ' + car.user_email;
    userEmail.classList.add('item-p');

    const details = document.createElement('li');
    details.appendChild(userName);
    details.appendChild(userEmail);
    details.classList.add('item-details');

    ownerDetailsList.appendChild(heading);
    ownerDetailsList.appendChild(details);
}

const getCarById = async (carId) => {
    try{
        const response = await fetch(serverUrl + `/car/${carId}`);
        const jsonResponse = await response.json();
        createImageCards(jsonResponse.images);
        createCarDetails(jsonResponse);
        createOwnerDetails(jsonResponse);
    }catch (e) {
        console.log(e.message);
    }
}

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
      console.log('login response', json);
      if (json.error) {
         favBtn.classList.toggle('hide', true);
         editBtn.classList.toggle('hide', true);
         delBtn.classList.toggle('hide', true);
      } else {

        //logged in user must see the favBtn. content depends on whether this car exists in user's favs or not
        favBtn.classList.toggle('hide', false);
        favBtn.innerHTML = 'Add to Fav';
        console.log(json.user_fav_cars);
        for(const carIdObject of json.user_fav_cars){
          if(carIdObject.fav_car_fk == carId){
              favBtn.innerHTML = 'Remove from Fav';
          }
        }

        editBtn.classList.toggle('hide', true);
        delBtn.classList.toggle('hide', true);
        //if car belongs to logged in user then edit and del btns should be visible.
        for(const carIdObject of json.user_cars){
            if(carIdObject.car_id == carId){
                editBtn.classList.toggle('hide', false);
                delBtn.classList.toggle('hide', false);
                //logged in user must not see favBtn if user owns that car add. 
                favBtn.classList.toggle('hide', true);
                return;
            }
        }

        //check if user is admin then delete button should be visible

        if(json.user_admin === 1){
          delBtn.classList.toggle('hide', false);
        }
        
        
      }
    }catch(e){
      console.log(e.message);
    }
  };

getCarById(carId);
checkLogStatus();

