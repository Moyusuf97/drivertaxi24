require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./RealTime-data.json');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-realtime-339a1-default-rtdb.europe-west1.firebasedatabase.app',
});





const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  




// Endpoint to retrieve data
app.get('/getUser', async (req, res) => {
    try {
      const snapshot = await admin.database().ref('/users').once('value');
      const userData = snapshot.val();
      res.json(userData);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Endpoint to register users
app.post('/registerUser', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Implement user registration logic using Firebase Authentication
    // Note: This is a simplified example; make sure to add proper error handling and validation
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Save additional user data to Realtime Database
    await admin.database().ref(`/users/${userRecord.uid}`).set({
      email,
      // Add more user data as needed
    });

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/registerGoogleUser', async (req, res) => {
    try {
      const { idToken } = req.body;
      console.log('Received idToken:', idToken);
  
      // Verify Google ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email } = decodedToken;
  
      // Save additional user data to Realtime Database
      await admin.database().ref(`/users/${uid}`).set({
        email,
        // Add more user data as needed
      });
  
      console.log('User registered successfully');
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});