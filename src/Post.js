import React, { useEffect, useState } from 'react';
import './post.css';

const Post = () => {
  const [showfulladdress, setshowfulladdress] = useState(false);
  const [updateddata, setUpdatedData] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const existingData = JSON.parse(localStorage.getItem('formdata')) || [];
    setUpdatedData(existingData);
  }, []);
  const toggleaddress = () => {
    setshowfulladdress(!showfulladdress);
  };

  return (
    <div className='card-container'>
      {updateddata.map((item, index) => (
        <div className='card' key={index}>
          <div className='card-image'>
         < img src={item.profileImage} alt="Profile Preview" />
          </div>
          <div className='card-content'>
            <div>
              <h2>{item.name}</h2>
              <p>Date of Birth: {item.dob}</p>
              <p>Number: {item.number}</p>
              <p>Email: {item.email}</p>
              <p>Gender: {item.gender}</p>
            </div>
            <div>
              {showfulladdress ? (
                <p onClick={toggleaddress}>Address: {item.address}</p>
              ) : (
                <p onClick={toggleaddress} className='truncated-address'>
                  Address: {item.address.length > 20 ? `${item.address.slice(0, 20)}...` : item.address}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
