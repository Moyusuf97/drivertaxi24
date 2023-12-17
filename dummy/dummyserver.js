const express = require('express');
const app = express();
const port = 4000;
const NodeGeocoder = require('node-geocoder');

app.use(express.json());

const data = require('./data.json');

function calculateDistance(location1, location2) {
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;

  // Check if any of the location properties are undefined
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    throw new Error('Invalid location data');
  }

  // Using Haversine formula to calculate distance between two points on the Earth
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
app.post('/request-ride', (req, res) => {
  console.log('Request Body:', req.body);  // Add this line

  const userRequest = req.body;
  // Check if the location property is present in the user request
  if (!userRequest.location || !userRequest.location.latitude || !userRequest.location.longitude) {
    res.status(400).json({ message: 'Invalid user location data' });
    return;
  }

  const availableDrivers = data.drivers.filter((driver) => driver.isAvailable);

  if (availableDrivers.length > 0) {
    const selectedDriver = availableDrivers.reduce((prev, curr) => {
      // Check if the location property is present in both prev and curr
      if (!prev.location || !prev.location.latitude || !prev.location.longitude ||
          !curr.location || !curr.location.latitude || !curr.location.longitude) {
        throw new Error('Invalid driver location data');
      }

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
  res.json(data.drivers);
});


const options = {
  provider: 'openstreetmap',
};

const geocoder = NodeGeocoder(options);

app.use(cors());

app.get('/reverse-geocode', async (req, res) => {
  const { lat, lon, lang, format, key } = req.query;

  try {
    const result = await geocoder.reverse({ lat, lon, language: lang, format });
    res.json(result);
  } catch (error) {
    console.error('Error making reverse geocoding request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/reverse-geocode', async (req, res) => {
  const { lat, lon, lang, format } = req.body;

  try {
    const result = await geocoder.reverse({ lat, lon, language: lang, format });
    res.json(result);
  } catch (error) {
    console.error('Error making reverse geocoding request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});