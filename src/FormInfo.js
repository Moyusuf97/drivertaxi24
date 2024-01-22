import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const FormInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    carModel: '',
    licenseImage: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

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
    setIsLoading(true); 
    setFeedback(''); 
  
    const uid = localStorage.getItem('userUID'); 
    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('carModel', formData.carModel);
    formDataToSend.append('licenseImage', formData.licenseImage);
    formDataToSend.append('uid', uid); // Append UID to the form data
  
    try {
      const response = await axios.post('http://localhost:3500/api/drivers/details', formDataToSend);
      console.log('Driver details updated:', response.data);
      setFeedback('Driver details updated successfully!'); // Set success message
      navigate('/dash'); // Redirect to dashboard or confirmation page
    } catch (error) {
      console.error('Error:', error);
      setFeedback(error.response?.data?.message || 'Failed to update driver details.'); // Set error message from server if available
    } finally {
      setIsLoading(false); 
    }
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Information'}
        </button>
        {feedback && <p>{feedback}</p>}
      </form>
    </div>
  );
};

export default FormInfo;
