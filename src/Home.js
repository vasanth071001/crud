import React, { useState, useEffect } from 'react';
import './home.css'; // Make sure this path is correct
import DOMPurify from 'dompurify';

const Home = ({ handledatasubmit }) => {
  const [formdata, setformdata] = useState({
    name: '',
    countryCode: '', // Add countryCode to formdata state
    number: '',
    dob: '',
    profileImage: null, // Change to profileImage
    email: '', // Add email to formdata state
    address: '', // Add address to formdata state
    gender: 'male', // Add gender to formdata state with a default value
  });
  const [ageerror, setageerror] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [isCountryCodeSelected, setIsCountryCodeSelected] = useState(false);
  const [maxNumberLength, setMaxNumberLength] = useState(10); // Initialize with the default maximum length

  useEffect(() => {
    // Update the maximum length when the country code changes
    if (formdata.countryCode === '+44') {
      setMaxNumberLength(11); // For UK
    } else if (formdata.countryCode === '+91') {
      setMaxNumberLength(10); // For India
    } else if (formdata.countryCode === '+1') {
      setMaxNumberLength(10); // For USA
    }
  }, [formdata.countryCode]);

  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === 'countryCode') {
      // If the user selects a country code, enable the number input field
      setIsCountryCodeSelected(!!value); // Convert to boolean
    }

    // Apply DOMPurify to sanitize the input value
    const sanitizedValue = DOMPurify.sanitize(value);

    if (name === 'countryCode') {
      // If the user changes the country code, clear the number field
      setformdata({
        ...formdata,
        [name]: sanitizedValue,
        number: '', // Clear the number field when changing the country code
      });
    } else if (name === 'number') {
      // Keep the number validation as it is
      const numericValue = sanitizedValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

      if (numericValue.length <= maxNumberLength) {
        setformdata({
          ...formdata,
          [name]: numericValue,
        });
      }
    } else {
      setformdata({
        ...formdata,
        [name]: sanitizedValue,
      });
    }
  };

  const handleimage = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result; // This is the Base64-encoded string
        setformdata({
          ...formdata,
          profileImage: base64String, // Store the Base64 string in formdata
        });
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const resetForm = () => {
    setformdata({
      name: '',
      countryCode: '', // Clear countryCode
      number: '',
      dob: '',
      profileImage: null, // Change to null to clear the image
      email: '', // Clear email field
      address: '', // Clear address field
      gender: 'male',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentdate = new Date();
    const selecteddate = new Date(formdata.dob);
    if (currentdate.getFullYear() - selecteddate.getFullYear() < 18) {
      setageerror('You must be 18 or older to submit this form.');
      return;
    } else {
      setageerror('');
    }

    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailpattern.test(formdata.email)) {
      setemailerror('Please enter a valid email address.');
      return;
    } else {
      setemailerror('');
    }

    handledatasubmit(formdata);
    resetForm(); // Clear the form fields from the App component
  };

  const handleKeyDown = (e) => {
    // Get the key code of the pressed key
    const keyCode = e.keyCode || e.which;

    // Allow only numeric keys (0-9) and certain control keys like Backspace
    if (!(keyCode >= 48 && keyCode <= 57) && keyCode !== 8) {
      e.preventDefault(); // Prevent the key press
    }
  };

  return (
    <div className="centered-form">
      <div className="form-box">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              required
              value={formdata.name}
              onChange={handlechange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Country Code:</label>
            <select
              name="countryCode"
              value={formdata.countryCode}
              onChange={handlechange}
              required
            >
              <option value="">Select Country Code</option>
              <option value="+44">+44 (UK)</option>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              name="number"
              required={isCountryCodeSelected} // Make it required when a country code is selected
              value={formdata.number}
              onChange={handlechange}
              onKeyDown={handleKeyDown} // Allow only numeric input
              maxLength={maxNumberLength} // Set the maximum length dynamically
            />
          </div>

          <div className="form-field">
            <label className="form-label">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              required
              value={formdata.dob}
              onChange={handlechange}
            />
            {ageerror && <p className="error-message">{ageerror}</p>}
          </div>

          <div className="form-field">
            <label className="form-label">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleimage}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formdata.email}
              onChange={handlechange}
            />
            {emailerror && <p className="error-message">{emailerror}</p>}
          </div>

          <div className="form-field">
            <label className="form-label">Address:</label>
            <textarea
              name="address"
              rows="4"
              value={formdata.address}
              onChange={handlechange}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formdata.gender === 'male'}
                  onChange={handlechange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formdata.gender === 'female'}
                  onChange={handlechange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formdata.gender === 'other'}
                  onChange={handlechange}
                />
                Other
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
