# web
Basics of Web Technology Fall 2019
Project Documentation

# Name of Project: carapp
Project Members: Asim Ghani, Kashif Qamar Malik and Rafe Ibrahim

# Project Description
 The Car App is a digital platform to place car adds for purchasing and selling cars.

# Link to final app
https://10.114.32.138/carapp/
Currently branch server3 is running on server.

# Requirements For Deployment:
 1. Create .env file with following content
    DB_HOST=localhost
    DB_USER=<username>
    DB_PASS=<password>
    DB_NAME=web
    SERVER=dev_localhost
  
  2. Create database with name web
  3. Run sql queries in file data-sql-table-creation in your data
  4. Change url in js files in public folder so that pages served can fetch from your server.
  5. Run npm install to install all dependencies. 
  6. Run index.js with node index.js

# Features:

1.	Anonymous users can login to see car ads.
2.	Anonymous users can sort car ads by ad creation time and by car age.
3.	Anonymous users can view details of a car.
4.	Users can sign up to carapp.
5.	Users can login with an existing account.
6.	Users can modify his/her account details.
7.	Users can save other car ads into his/her favourites.
8.	Users can publish his/her own car ad.
9.	Users can publish up to five images for an ad.
10.	Users can delete his/her car ad.
11.	Users can view his/her own car ads and favourites cars on user’s page.
12.	Admin has privileges to delete any car ad.


# Technologies Used:
Front-End: Responsive UI with HTML,CSS and JAVASCRIPT
Back-End: NODE JS Sever (PROXY THROUGH HTTP SERVER)
Database: Relational database on mariaDB server

# rest API Routes
<image src="imgReadMe/car-app-api-routes.PNG" width=800>

# Database Conceptual Model
<image src="imgReadMe/conceptual-model-landscape.jpeg" width=800>

# Database (php designer view)
<image src="imgReadMe/final-mysql-designer-database.PNG" width=800>
  
 # Home Page:
<image src="imgReadMe/car-app-home.PNG" width=800>
  
 # Car Page:
<image src="imgReadMe/car-app-car.PNG" width=800>
  
 # User Page:
<image src="imgReadMe/car-app-user-page.PNG" width=800>
  
 # Signup Page:
 <image src="imgReadMe/car-app-signup.PNG" width=800>
 
 # Login Page
 <image src="imgReadMe/car-app-login.PNG" width=800>
