const express = require('express');
const app = express();
const {validateParameters} = require('./calculations');
const {calculateResidential} = require('./calculations');



const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;

// agents.js
const agents = require('./agents');

//residential calculation
app.get('/calc-residential', (req,res) => {
  const { apartments, floors, tier } = req.query;
 
const validationError = validateParameters(apartments, floors, tier);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  //calculate number of elevators required and total cost
  const result = calculateResidential(apartments, floors, tier);

  res.json(result);
});

//Create a route that returns list of emails in agents.js
app.get('/agents',(req,res) => {
  const results = [];

  agents.forEach(agent => {results.push({email: agent.email})});

  res.send(results);
  });



//route that accepts a region as a query parameter, get average rating and fee for agents in a specific region
//http://localhost:3000/region-avg?region=east

app.get('/region-avg', (req, res) => {
  const region = req.query.region;
  const regionAgents = [];
  
  agents.forEach(agent => {
    if (agent.region === region) {
      regionAgents.push(agent);
    }
  });
 
  if (regionAgents.length === 0) {
    res.status(404).send(`No agents found in region: ${region}`);
    return;
  }

  const ratingSum = regionAgents.reduce((sum, agent) => sum + Number(agent.rating), 0);
  const feeSum = regionAgents.reduce((sum, agent) => sum + Number(agent.fee), 0);
  const avgRating = ratingSum / regionAgents.length;
  const avgFee = feeSum / regionAgents.length;

  const response = {
    region: region,
    averageRating: avgRating.toFixed(2),
    averageFee: avgFee.toFixed(2)
  };
  res.json(response);
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


