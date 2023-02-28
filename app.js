const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const environment = process.env.ENVIRONMENT || "development";


//Create a route that returns an error code and message
app.get('/error', (req,res) => {
  res.status(500).send('Internal Server Error');
});

//Create a route that returns a message containing the port and environment name from the .env file
app.get('/', (req,res)=>{
  res.send(`Sever is running on port ${port} in ${environment} mode`);
});


app.listen(port,() =>{
  console.log(`Server is listening on ${port}`);
});


