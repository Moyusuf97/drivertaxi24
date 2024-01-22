import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FormInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    carModel: '',
    licenseImage: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "licenseImage") {
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

    // This should be the UID from the authentication state
    // Assuming you store the authenticated user's UID in local storage/session storage
    const uid = localStorage.getItem('userUID'); 

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('carModel', formData.carModel);
    formDataToSend.append('licenseImage', formData.licenseImage);
    formDataToSend.append('uid', uid); // Append UID to the form data

    fetch('http://localhost:3500/api/drivers/details', {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.json())
    .then(data => {
      console.log('Driver details updated:', data);
      navigate('/dash'); // Redirect to dashboard or confirmation page
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="form-info-container">
      <h2>Driver Additional Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label>Car Model:</label>
          <input 
            type="text" 
            name="carModel" 
            value={formData.carModel}
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label>Driver's License Image:</label>
          <input 
            type="file" 
            name="licenseImage" 
            onChange={handleChange} 
            required
          />
        </div>
        <button type="submit">Submit Information</button>
      </form>
    </div>
  );
};

export default FormInfo;
