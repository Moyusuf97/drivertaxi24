// Import Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseadmin.json');

// Function to initialize Firebase Admin
function initializeFirebaseAdmin() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://fir-realtime-339a1-default-rtdb.europe-west1.firebasedatabase.app/'
    });
}

// Export the function
module.exports = initializeFirebaseAdmin;


