// App.js
import React, { useState } from 'react';
import TimeSheet from './components/TimeSheet';

const App = () => {
  console.log('Console says hi!')
  const [timeSheetData, setTimeSheetData] = useState([]);

  const handleCreateEntry = newEntry => {
    setTimeSheetData([...timeSheetData, { id: timeSheetData.length + 1, ...newEntry }]);
  };

  return (
    <div className="App">
      <h1>My Time Sheet Application</h1>
      {/* Pass handleCreateEntry function to TimeSheet component */}
      <TimeSheet data={timeSheetData} onCreateEntry={handleCreateEntry} />
    </div>
  );
}

export default App;
