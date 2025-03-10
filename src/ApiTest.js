import React, { useState, useEffect } from 'react';

function ApiTest() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>API Test</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <p>Message from API: {message}</p>
      )}
    </div>
  );
}

export default ApiTest;