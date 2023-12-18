require('dotenv').config();


const express = require('express');
const admin = require('firebase-admin');
const User = require('./models/user')
const initializeFirebaseAdmin = require('./config/firebasedatabase');
const authRoutes = require('./authRoutes');
const checkToken = require('./authMiddleware');
const app = express();




initializeFirebaseAdmin();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);


app.get('/api/profile', checkToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get('/getUser', async (req, res) => {
  try {
    const snapshot = await admin.database().ref('/user').once('value');
    const userData = snapshot.val();
    res.json(userData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
