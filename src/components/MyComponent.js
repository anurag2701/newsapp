import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make the API request inside the useEffect hook
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        console.log(response)
        setData(response.data.data); // Update the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to execute the effect only once

  return (
    <div>
      {/* Render the fetched data */}
      Hello
      {console.log('>>> ', data)}
      {data.length > 0 && data.map(item => (
        <p key={item.first_name}>{item.last_name}</p>
      ))}
    </div>
  );
};

export default MyComponent;