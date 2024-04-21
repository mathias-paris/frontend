import React, { useState, useEffect } from 'react';
import './TimeSheet.css'; // Import CSS file

const TimeSheet = ({ onCreateEntry }) => {
  console.log('TimeSheet start')
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: '',
    project: '',
    worklog: '',
    duration: ''
  });
  const [data, setData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        console.log('fetchAccessToken START');
        console.log('REACT_TOKEN_URL: '+process.env.REACT_APP_TOKEN_URL);
        const response = await fetch(process.env.REACT_APP_TOKEN_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }
        console.log(response);
        const jsonData = await response.json();
        setAccessToken(jsonData.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BASE_URL, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData); // Log fetched data
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    // Calculate total hours whenever data changes
    const total = data.reduce((acc, entry) => {
      // Parse the duration string to extract hours
      const hours = parseInt(entry.duration.split(' ')[0]); // Assuming duration format is "X hours"
      return acc + hours;
    }, 0);
    setTotalHours(total);
  }, [data]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Pass the new entry to the parent component for handling
    onCreateEntry(newEntry);
    // Clear the form fields after submitting
    setNewEntry({
      date: '',
      project: '',
      worklog: '',
      duration: ''
    });
    // Close the form
    toggleForm();
  };

  return (
    <div className="time-sheet-container">
      {/* Button to toggle form visibility */}
      <button onClick={toggleForm} className="add-entry-button">Add New Entry</button>

      {/* Overlay form */}
      {showForm && (
        <div className="overlay">
          <form onSubmit={handleSubmit} className="new-entry-form">
            {/* Form fields */}
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="project"
              value={newEntry.project}
              onChange={handleChange}
              placeholder="Project"
              required
            />
            <input
              type="text"
              name="worklog"
              value={newEntry.worklog}
              onChange={handleChange}
              placeholder="Worklog"
              required
            />
            <input
              type="text"
              name="duration"
              value={newEntry.duration}
              onChange={handleChange}
              placeholder="Duration (e.g., 3 hours)"
              required
            />
            {/* Submit button */}
            <button type="submit">Add Entry</button>
          </form>
        </div>
      )}

      {/* Table for displaying existing entries */}
      <table className="time-sheet-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th>Worklog</th>
            <th>Duration (hours)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(entry => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.project}</td>
              <td>{entry.worklog}</td>
              <td>{parseInt(entry.duration.split(' ')[0])}</td>
            </tr>
          ))}
        </tbody>
        {/* Total hours row */}
        <tfoot>
          <tr>
            <td colSpan="3">Total Hours</td>
            <td>{totalHours}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default TimeSheet;
