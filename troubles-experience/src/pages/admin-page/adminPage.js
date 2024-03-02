import React from "react";
import './adminPage.css';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";


const AdminPage = ({ onFontSizeChange}) => {

    const [reflections, setReflections] = useState([]);

    //ISSUE DATA
    const [name, setName] = useState("");
    const [descriptionOne, setDescriptionOne] = useState("");
    const [descriptionTwo, setDescriptionTwo] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [numberOfOptions, setNumberOfOptions] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionANationalistWeight, setOptionANationalistWeight] = useState(0);
    const [optionANationalistPerspective, setOptionANationalistPerspective] = useState("");
    const [optionAUnionistWeight, setOptionAUnionistWeight] = useState(0);
    const [optionAUnionistPerspective, setOptionAUnionistPerspective] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionBNationalistWeight, setOptionBNationalistWeight] = useState(0);
    const [optionBNationalistPerspective, setOptionBNationalistPerspective] = useState("");
    const [optionBUnionistWeight, setOptionBUnionistWeight] = useState(0);
    const [optionBUnionistPerspective, setOptionBUnionistPerspective] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionCNationalistWeight, setOptionCNationalistWeight] = useState(0);
    const [optionCNationalistPerspective, setOptionCNationalistPerspective] = useState("");
    const [optionCUnionistWeight, setOptionCUnionistWeight] = useState(0);
    const [optionCUnionistPerspective, setOptionCUnionistPerspective] = useState("");

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

const handleSubmit = (e) => {
  e.preventDefault();

  // Prepare the issue data object
  const issueData = {
      name,
      descriptionOne,
      descriptionTwo,
      imageURL,
      numberOfOptions,
      selectedOption,
      optionA,
      optionANationalistWeight,
      optionANationalistPerspective,
      optionAUnionistWeight,
      optionAUnionistPerspective,
      optionB,
      optionBNationalistWeight,
      optionBNationalistPerspective,
      optionBUnionistWeight,
      optionBUnionistPerspective,
      optionC,
      optionCNationalistWeight,
      optionCNationalistPerspective,
      optionCUnionistWeight,
      optionCUnionistPerspective
  };

  // Send the issue data to the backend API
  fetch('http://localhost:4000/addissue', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(issueData)
  })
  .then(response => {
      if (response.ok) {
          console.log("Issue added successfully");
          // Optionally, you can redirect the user to a different page or show a success message
      } else {
          console.error("Failed to add issue");
          // Handle error cases here
      }
  })
  .catch(error => {
      console.error("Error:", error);
      // Handle network errors here
  });
};

  return (
    <div className="background">
      <h1 className="title">ADMIN</h1>

      <h2>Issue Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    value={descriptionOne}
                    onChange={(event) => setDescriptionOne(event.target.value)}
                    placeholder="Description One"
                    required
                />
                <input
                    type="text"
                    value={descriptionTwo}
                    onChange={(event) => setDescriptionTwo(event.target.value)}
                    placeholder="Description Two"
                    required
                />
                <input
                    type="text"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                    placeholder="Image URL"
                    required
                />
                <label>Number Of Options:</label>
                <input
                    type="number"
                    value={numberOfOptions}
                    onChange={(event) => setNumberOfOptions(event.target.value)}
                    placeholder="Number of Options"
                    required
                />
                <input
                    type="text"
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    placeholder="Selected Option"
                    required
                />
                
                {/* Option A */}
                <h3>Option A</h3>
                <input
                    type="text"
                    value={optionA}
                    onChange={(event) => setOptionA(event.target.value)}
                    placeholder="Option A"
                    required
                />
                <label>Option A Nationalist Weight:</label>
                <input
                    type="number"
                    value={optionANationalistWeight}
                    onChange={(event) => setOptionANationalistWeight(event.target.value)}
                    placeholder="Option A Nationalist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionANationalistPerspective}
                    onChange={(event) => setOptionANationalistPerspective(event.target.value)}
                    placeholder="Option A Nationalist Perspective"
                    required
                />
                <label>Option A Unionist Weight:</label>
                <input
                    type="number"
                    value={optionAUnionistWeight}
                    onChange={(event) => setOptionAUnionistWeight(event.target.value)}
                    placeholder="Option A Unionist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionAUnionistPerspective}
                    onChange={(event) => setOptionAUnionistPerspective(event.target.value)}
                    placeholder="Option A Unionist Perspective"
                    required
                />
                
                {/* Option B */}
                <h3>Option B</h3>
                <input
                    type="text"
                    value={optionB}
                    onChange={(event) => setOptionB(event.target.value)}
                    placeholder="Option B"
                    required
                />
                <label>Option B Nationalist Weight:</label>
                <input
                    type="number"
                    value={optionBNationalistWeight}
                    onChange={(event) => setOptionBNationalistWeight(event.target.value)}
                    placeholder="Option B Nationalist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionBNationalistPerspective}
                    onChange={(event) => setOptionBNationalistPerspective(event.target.value)}
                    placeholder="Option B Nationalist Perspective"
                    required
                />
                <label>Option B Unionist Weight:</label>
                <input
                    type="number"
                    value={optionBUnionistWeight}
                    onChange={(event) => setOptionBUnionistWeight(event.target.value)}
                    placeholder="Option B Unionist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionBUnionistPerspective}
                    onChange={(event) => setOptionBUnionistPerspective(event.target.value)}
                    placeholder="Option B Unionist Perspective"
                    required
                />
                
                {/* Option C */}
                <h3>Option C</h3>
                <input
                    type="text"
                    value={optionC}
                    onChange={(event) => setOptionC(event.target.value)}
                    placeholder="Option C"
                    required
                />
                <label>Option C Nationalist Weight:</label>
                <input
                    type="number"
                    value={optionCNationalistWeight}
                    onChange={(event) => setOptionCNationalistWeight(event.target.value)}
                    placeholder="Option C Nationalist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionCNationalistPerspective}
                    onChange={(event) => setOptionCNationalistPerspective(event.target.value)}
                    placeholder="Option C Nationalist Perspective"
                    required
                />
                <label>Option C Unionist Weight:</label>
                <input
                    type="number"
                    value={optionCUnionistWeight}
                    onChange={(event) => setOptionCUnionistWeight(event.target.value)}
                    placeholder="Option C Unionist Weight"
                    required
                />
                <input
                    type="text"
                    value={optionCUnionistPerspective}
                    onChange={(event) => setOptionCUnionistPerspective(event.target.value)}
                    placeholder="Option C Unionist Perspective"
                    required
                />
                
                <button type="submit">Submit</button>
            </form>
      
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
