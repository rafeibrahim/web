
'use strict';
const serverUrl = 'https://localhost:8000'; // change url when uploading to server
const localUrl = 'http://127.0.0.1:5500/public/';

const loginForm = document.querySelector('#login-form');
console.log(loginForm);

const eventP = document.querySelector('#event-p');
console.log(eventP);

const homeBtn = document.querySelector('#home-btn');

homeBtn.addEventListener('click', () => {
  window.location.href = localUrl;
});

// login
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(serverUrl + '/user/login', fetchOptions);
    const json = await response.json();
    if (json.error) {
      eventP.innerHTML = 'Login unsuccessful :( Please try again';
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#d84e4e';
    } else {
      
      eventP.innerHTML = 'Login successful :) Redirecting to home page...'
      eventP.style.color = 'white';
      eventP.style.backgroundColor = '#436b43';
      // save token
      sessionStorage.setItem('token', json.token);
      window.localStorage.setItem('token', json.token);
      console.log(json.token);
      window.location.href = localUrl;
    }
  });