const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

const userData = require('./user.json');
const driverData = require('./driver.json');
const headquartersData = require('./headquarters.json');

function calculateDistance(location1, location2) {
    const str1 = String(location1);
    const str2 = String(location2);
  
    return Math.abs(str1.charCodeAt(0) - str2.charCodeAt(0));
  }
  
  
  

app.post('/request-ride', (req, res) => {
  const userRequest = req.body;

  const availableDrivers = headquartersData.map.cars.filter((car) => car.isAvailable);

  if (availableDrivers.length > 0) {
    const selectedDriver = availableDrivers.reduce((prev, curr) => {
      const prevDistance = calculateDistance(prev.location, userRequest.location);
      const currDistance = calculateDistance(curr.location, userRequest.location);

   
      if (prevDistance < currDistance) {
        return prev;
      } else if (currDistance < prevDistance) {
        return curr;
      } else {
        return prev.carNumber < curr.carNumber ? prev : curr;
      }
    });

    selectedDriver.isAvailable = false;

    res.json({
      message: 'Driver assigned successfully',
      driver: selectedDriver,
    });
  } else {
    res.json({
      message: 'No available drivers at the moment',
    });
  }
});

app.get('/drivers', (req, res) => {
  res.json(driverData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
