const {tierCosts, installCosts} = require('./agents');

//validate parameters
function validateParameters(apartments, floors, tier) {
  //ensure apartments and floors are numbers
  if (!apartments || !floors || !tier) {
    return {error: 'please enter in the field'};
  }
  
  //ensure apartments and floors are integers
  const apartmentsNum = parseInt(apartments);
  const floorsNum = parseInt(floors);
  
  if (isNaN(apartmentsNum) || isNaN(floorsNum)) {
    return {error: 'please enter a number in the field'};
  }
  
  //ensure apartments and floors are > 0
  if (apartmentsNum <= 0 || floorsNum <= 0) {
    return {error: 'Number values cannot be negative'};
  }
  
  //ensure tier is one of the three options
  if (tier !== 'standard' && tier !== 'premium' && tier !== 'excelium') {
    return {error: 'Please select a correct tier'};
  }
  
  return null;
}

//calculate residential
function calculateResidential(apartments, floors, tier) {
  const elevators = Math.ceil(apartments / (floors * 6)) * Math.ceil(floors / 20);
  const cost = elevators * tierCosts[tier] + (elevators * installCosts[tier]);

  return {elevators, cost};
}

module.exports = { validateParameters, calculateResidential };
