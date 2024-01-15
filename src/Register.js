import React, { useState } from 'react';
import './style/register.css';
import { app } from './firebase-config';// Import your Firebase app
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    driversLicenseNumber: '',
    driversLicensePhoto: null,
    personalPhoto: null
  });
  const navigate = useNavigate();

  // Firestore and Storage references
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "driversLicensePhoto" || name === "personalPhoto") {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadFile = async (file) => {
      if (!file) return null;
      const fileRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      return getDownloadURL(snapshot.ref);
    };

    const driversLicensePhotoUrl = await uploadFile(formData.driversLicensePhoto);
    const personalPhotoUrl = await uploadFile(formData.personalPhoto);

    const docRef = await addDoc(collection(firestore, "users"), {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth,
      driversLicenseNumber: formData.driversLicenseNumber,
      driversLicensePhotoUrl,
      personalPhotoUrl
    });

    console.log('User registered with ID:', docRef.id);
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input 
            type="tel" 
            name="phoneNumber" 
            value={formData.phoneNumber}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dateOfBirth" 
            value={formData.dateOfBirth}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Driver's License Number:</label>
          <input 
            type="text" 
            name="driversLicenseNumber" 
            value={formData.driversLicenseNumber}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Upload Driver's License Photo:</label>
          <input 
            type="file" 
            name="driversLicensePhoto" 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Upload Personal Photo:</label>
          <input 
            type="file" 
            name="personalPhoto" 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
