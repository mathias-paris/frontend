// App.js
import React, { useState } from 'react';
import TimeSheet from './components/TimeSheet';
import Login from './components/Login'; // Import the Login component

const App = () => {
  console.log('Console says hi!')
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [accessToken, setAccessToken] = useState(null); // State to store access token

  const handleCreateEntry = newEntry => {
    setTimeSheetData([...timeSheetData, { id: timeSheetData.length + 1, ...newEntry }]);
  };

  const handleLogin = token => {
    console.log(token);
    setAccessToken(token); // Set the access token
  };

  return (
    <div className="App">
      <h1>My Time Sheet Application</h1>
      {/* Render TimeSheet component if access token is set, otherwise render Login component */}
      {accessToken ? (
        <TimeSheet data={timeSheetData} onCreateEntry={handleCreateEntry} accessToken={accessToken} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;