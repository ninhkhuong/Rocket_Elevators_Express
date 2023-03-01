const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;

// agents.js
const agents = require('./agents.json');
module.exports = agents;

app.get('/agents',(req,res) => {
  const emails = agents.map(agent => agent.email).join(', ');
  res.send(emails);
});


//Create a route that returns an error code and message
app.get('/error', (req,res) => {
  res.status(500).send('Internal Server Error');
});

app.get('/hello', (req,res)=>{
  res.send(`<h1>Hello</h1>`);
});

app.get('/status', (req,res)=>{
  res.send(`Sever is running on port ${port} in ${environment} mode`);
});



app.listen(port,() =>{
  console.log(`Server is listening on ${port}`);
});


