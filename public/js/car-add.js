
'use strict';
const serverUrl = 'https://10.114.32.138/carapp'; 
const localUrl = 'https://10.114.32.138/carapp/';

const adCreateForm = document.querySelector('#ad-create-form');
console.log(adCreateForm);

const eventP = document.querySelector('#event-p');
console.log(eventP);

const homeBtn = document.querySelector('#home-btn');

const token = window.localStorage.getItem('token');

homeBtn.addEventListener('click', () => {
  console.log('home btn clicked');
  window.location.href = localUrl;
});


if(window.localStorage.getItem('create')){
          if(window.localStorage.getItem('create') == 'true'){
          eventP.innerHTML = `ADD CREATED`;
          eventP.style.backgroundColor = '#436b43';
          window.localStorage.removeItem('create');
          window.location.href = localUrl + '/userPage.html';
          }else{
            eventP.innerHTML = `ADD CREATION FAILED`;
          eventP.style.backgroundColor = '#436b43';
          window.localStorage.removeItem('create');
          }
        }

//creating options for make, fuel and gearbox
const createMakeOptions = (makes, fuels, gearboxes) => {
  const makeList = document.querySelector('#select-make');
  const fuelList = document.querySelector('#select-fuel');
  const gearboxList = document.querySelector('#select-gearbox');
    //create make options to <select>
    makeList.innerHTML = '';
    makes.forEach((make) => {
      // create options with DOM methods
      const option = document.createElement('option');
      option.value = make.make_id;
      option.innerHTML = make.make_name;
      option.classList.add('light-border');
      makeList.appendChild(option);
    });

    //create fuel options to <select>
    console.log(fuelList);
    fuelList.innerHTML = '';
    fuels.forEach((fuel) => {
      // create options with DOM methods
      const option = document.createElement('option');
      option.value = fuel.fuel_id;
      option.innerHTML = fuel.fuel_type;
      option.classList.add('light-border');
      fuelList.appendChild(option);
    });

    //create gearbox options to <select>
    gearboxList.innerHTML = '';
    gearboxes.forEach((gearbox) => {
      //create options with DOM methods
      const option = document.createElement('option');
      option.value = gearbox.gearbox_id;
      option.innerHTML = gearbox.gearbox_type;
      option.classList.add('light-border');
      gearboxList.appendChild(option);
    });
 
};

//get options for make, fuel and gearbox
const getOptions = async () => {
  try {
    const makeResponse = await fetch(serverUrl + '/car/make');
    const makes = await makeResponse.json();

    const fuelResponse = await fetch(serverUrl + '/car/fuel');
    const fuels = await fuelResponse.json();

    const gearboxResponse = await fetch(serverUrl + '/car/gearbox');
    const gearboxes = await gearboxResponse.json();

    createMakeOptions(makes, fuels, gearboxes);
  }
  catch (e) {
    console.log(e.message);
  }
};

// adding event listener to adCreateForm. Could not stop it from reloading the page. Storing values in local storage
//to check status of form submission. Value from local storage is removed after first check.
adCreateForm.addEventListener('submit', async (evt) => {
    console.log('function running1');
    evt.preventDefault();
    const fd = new FormData(adCreateForm);
    console.log(fd);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: fd,
    };
    const response = await fetch(serverUrl + '/car/', fetchOptions);
    const json = await response.json();
    
    if (json.error) {
      //in case of error
        window.localStorage.setItem('create', false);       
     } else {
       //in case of success
        window.localStorage.setItem('create', true);      
     } 
    });

  //running this function to get available options for car make, fuel and gearboxes from database.
  getOptions();
