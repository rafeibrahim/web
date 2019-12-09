
'use strict';
const serverUrl = 'https://localhost:8000'; // change url when uploading to server
const localUrl = 'http://127.0.0.1:5500/public/';

const updateForm = document.querySelector('#update-form');

const eventP = document.querySelector('#event-p');
console.log(eventP);

const homeBtn = document.querySelector('#home-btn');

homeBtn.addEventListener('click', () => {
  console.log('home btn clicked');
  window.location.href = localUrl;
})

// login
updateForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(updateForm);
    const token = window.localStorage.getItem('token');

    const fetchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    };
    
    const response = await fetch(serverUrl + '/user/me', fetchOptions);
    const json = await response.json();
    if (json.error) {
      eventP.innerHTML = 'Update unsuccessful :( Please try again';
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#d84e4e';

    } else {
      eventP.innerHTML = 'Signup successful :) Redirecting to home page...'
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#436b43';
      window.location.href = localUrl;
    }
  });