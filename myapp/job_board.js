// Importing the app class and methods
const express = require('express');

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

// import the api_routes to use them in the app (keep things modular)
const api_versions_index = require('./api/api_versions_index');

// Create an instance of an express app object (calls express class constructor) which will be our main app
const app = express();

// Set the port on which our application will listen
const port = 3000;

// Use the api routes with the app
app.use('/', api_versions_index);

// Test Prisma connection
prisma.$connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('ERROR:', error);
  });

// Set app to listen to port
app.listen(port, () => {
  console.log(`job_board app is listenning on port ${port}`);
})
