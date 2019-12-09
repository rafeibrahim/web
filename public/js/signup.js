
'use strict';
const serverUrl = 'https://localhost:8000'; // change url when uploading to server
const localUrl = 'http://127.0.0.1:5500/public/';

const signupForm = document.querySelector('#signup-form');
console.log(signupForm);

const eventP = document.querySelector('#event-p');
console.log(eventP);

const homeBtn = document.querySelector('#home-btn');

homeBtn.addEventListener('click', () => {
  console.log('home btn clicked');
  window.location.href = localUrl;
})

// login
signupForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(signupForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(serverUrl + '/user/register', fetchOptions);
    const json = await response.json();
    console.log('signup response', json);
    if (json.error) {
      eventP.innerHTML = 'Signup unsuccessful :( Please try again';
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#d84e4e';
    } else {
      // save token
      eventP.innerHTML = 'Signup successful :) Redirecting to home page...'
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#436b43';
      window.localStorage.setItem('token', json.token);
      console.log(json.token);
      window.location.href = localUrl;
    }
  });