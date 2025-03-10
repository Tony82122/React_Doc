import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hello')
        .then(response => response.json())
        .then(data => {
          setMessage(data.message);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setMessage('Error connecting to backend');
          setLoading(false);
        });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {loading ? 'Loading...' : message}
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;