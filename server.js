require('dotenv').config();


const express = require('express');
const User = require('./models/user')
const connectDB = require('./config/mongoose');
const authRoutes = require('./authRoutes');
const checkToken = require('./authMiddleware');
const app = express();




connectDB();


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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
