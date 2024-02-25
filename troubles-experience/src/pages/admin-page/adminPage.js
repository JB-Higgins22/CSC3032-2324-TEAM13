import React from "react";
import './adminPage.css';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";


const AdminPage = ({ onFontSizeChange}) => {

    const [reflections, setReflections] = useState([]);

    // Fetch reflections from the server when the component mounts
  useEffect(() => {
    fetchReflections();
  }, []);

// Function to fetch reflections from the server
  const fetchReflections = () => {
    fetch('http://localhost:4000/reflections')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch reflections');
      })
      .then(data => {
        setReflections(data);
      })
      .catch(error => {
        console.error('Error fetching reflections:', error);
      });
  };

  const handleDeleteReflection = (reflectionId) => {
    fetch(`http://localhost:4000/deletereflection/${reflectionId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            setReflections(reflections.filter(reflection => reflection.id !== reflectionId));
        } else {
            console.error("Error deleting reflection:", response.statusText);
        }
    })
    .catch(error => console.error("Error deleting reflection:", error));
};

const handleApproveReflection = (reflection) => {
    // Prepare the reflection data object
    const reflectionData = {
      userName: reflection.username,
      userLocation: reflection.location,
      userReflection: reflection.content
    };

    // POST REQUEST
    fetch('http://localhost:4000/approvereflection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reflectionData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Reflection submitted successfully');
      } else {
        throw new Error('Failed to submit reflection');
      }
    })
    .catch(error => {
      console.error('Error submitting reflection:', error);
    });

    handleDeleteReflection(reflection.id)
}

const handleClearApprovedReflections = () => {
  fetch('http://localhost:4000/removeapprovedreflections', {
      method: 'DELETE',
  })
  .then(response => {
      if (response.ok) {
          console.log('All approved reflections cleared successfully');
      } else {
          console.error('Failed to clear approved reflections');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};

  return (
    <div className="background">
      <h1 className="title">ADMIN</h1>
      <button onClick={(handleClearApprovedReflections)}>Clear Approved Reflections</button>
      <table>
                <thead>
                    <tr>
                        <th>ReflectionID</th>
                        <th>Username</th>
                        <th>Location</th>
                        <th>Content</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {reflections.map(reflection => (
                        <tr key={reflection.id}>
                            <td>{reflection.id}</td>
                            <td>{reflection.username}</td>
                            <td>{reflection.location}</td>
                            <td>{reflection.content}</td>
                            <td><Button onClick={() => handleApproveReflection(reflection)}>Approve</Button></td>
                            <td><Button onClick={() => handleDeleteReflection(reflection.id)}>Reject</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  );
};
export default AdminPage;
