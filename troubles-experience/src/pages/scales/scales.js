import React, { useState, useEffect } from 'react';
import ScalesObject from '../../classes/scales';
import Issue from '../../classes/issue';

import './scales.css';

const Scales = () => {
  const [peaceScales, setPeaceScales] = useState(new ScalesObject([], [], 0, 0));
  const [draggedIssue, setDraggedIssue] = useState(null);

  useEffect(() => {
    initialiseScales();
    initialiseIssues();
  }, []); 

  function resetScales() {
    initialiseScales();
    initialiseIssues();
  }

  function initialiseScales() {
    setPeaceScales(new ScalesObject([], [], 0, 0));
  }

  function initialiseIssues() {
    const decommissioningIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);
    const northSouthCouncilIssue = new Issue('North/South Council', 'North/South Council & blah blah blah', 10);
    const britishIrishCouncilIssue = new Issue('British/Irish Council', 'British/Irish Council & blah blah blah', 10);
    const selfDeterminationIssue = new Issue('The Right to Self-Determination', 'The Right to Self-Determination & blah blah blah', 10);

    setPeaceScales(new ScalesObject([], [northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue, decommissioningIssue], 0, 40));
  }

  function displayIssueInfo(issue) {
    alert(issue.name + '\n' + issue.description);
  }

  const handleDragStart = (issue) => {
    setDraggedIssue(issue);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
  
    if (draggedIssue) {
      const isOnUnionistSide = event.target.className.includes('unionistSide');
      const isOnNationalistSide = event.target.className.includes('nationalistSide');
  
      // Update the scales accordingly
      if (isOnUnionistSide) {
        setPeaceScales((prevScales) => prevScales.placeOnUnionist(draggedIssue));
      } else if (isOnNationalistSide) {
        setPeaceScales((prevScales) => prevScales.placeOnNationalist(draggedIssue));
      }
  
      // Clear the dragged issue state after the drop
      setDraggedIssue(null);
    }
  };

  // const handleDrop = (event) => {
  //   event.preventDefault();
  
  //   if (draggedIssue) {
  //     // Get the mouse position relative to the drop zone
  //     const { clientX, clientY } = event;
  
  //     // Get the drop zone's bounding box
  //     const dropZoneRect = event.target.getBoundingClientRect();
  
  //     // Calculate the horizontal midpoint of the drop zone
  //     const dropZoneMidpointX = dropZoneRect.left + dropZoneRect.width / 2;
  
  //     // Determine if the drop occurred on the Unionist or Nationalist side
  //     const isOnUnionistSide = clientX < dropZoneMidpointX;
  
  //     // Update the scales accordingly
  //     if (isOnUnionistSide) {
  //       setPeaceScales((prevScales) => prevScales.placeOnUnionist(draggedIssue));
  //     } else {
  //       setPeaceScales((prevScales) => prevScales.placeOnNationalist(draggedIssue));
  //     }
  
  //     // Clear the dragged issue state after the drop
  //     setDraggedIssue(null);
  //   }
  // };

  return (
    <div>
      <h1>Scales</h1>
      <div>
        <button onClick={resetScales.bind(this)}>Reset Scales</button>
      </div>
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <div className = 'unionistSide'>
          <h2>Unionist Side</h2>
          <h4>{peaceScales.getUnionistWeight()}</h4>
          {peaceScales.getUnionistIssues().map((issue) => (
            <div
              className = 'unionistIssue'
              onClick={displayIssueInfo.bind(this, issue)}
              key={issue.id}
              draggable
              onDragStart={() => handleDragStart(issue)}
              style={{ marginBottom: '10px', cursor: 'move' }}
            >
              {issue.name}
            </div>
          ))}
        </div>
        <div className = 'nationalistSide'>
          <h2>Nationalist Side </h2>
          <h4>{peaceScales.getNationalistWeight()}</h4>
          {peaceScales.getNationalistIssues().map((issue) => (
            <div
              className = 'nationalistIssue'
              onClick={displayIssueInfo.bind(this, issue)}
              key={issue.id}
              draggable
              onDragStart={() => handleDragStart(issue)}
              style={{ marginBottom: '10px', cursor: 'move' }}
            >
              {issue.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scales;


// import React, { useState, useEffect } from 'react';
// import ScalesObject from '../../classes/scales';
// import Issue from '../../classes/issue';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './scales.css'

// var Issues = [];

// const Scales = () => {
//   const [peaceScales, setPeaceScales] = useState(null);
//   const unionistIssues = peaceScales?.getUnionistIssues();
//   const nationalistIssues = peaceScales?.getNationalistIssues();

//   useEffect(() => {
//     initialiseScales();
//     initialiseIssues();
//   }, []); // The empty dependency array ensures the effect runs only once on mount

//   function initialiseScales() {
//     const initialisationIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);
//     setPeaceScales(new ScalesObject([], [], 0, 0));
//   }

//   function initialiseIssues() {
//     const decommissioningIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);
//     const northSouthCouncilIssue = new Issue('North/South Council', 'North/South Council & blah blah blah', 10);
//     const britishIrishCouncilIssue = new Issue('British/Irish Council', 'British/Irish Council & blah blah blah', 10);
//     const selfDeterminationIssue = new Issue(
//       'The Right to Self-Determination',
//       'The Right to Self-Determination & blah blah blah',
//       10
//     );

//     Issues = [decommissioningIssue, northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue];
//   }

//   return (
//     <div>
// <h1>Scales</h1>
// <table>
//   <tbody>
//     <tr>
//       <th>Unionist Side</th>
//       <th>|</th>
//       <th>Nationalist Side</th>
//     </tr>
//     <tr>
//       <td>{peaceScales?.unionistWeight}</td>
//       <td>|</td>
//       <td>{peaceScales?.nationalistWeight}</td>
//     </tr>
//   </tbody>
// </table>

// <ul>
//   {Issues.map((issue) => (
//     <button key={issue.id} onClick={() => setPeaceScales(prevScales => prevScales.placeOnUnionist(issue))}>
//       {issue.name}
//     </button>
//   ))}
// </ul>

// <ul>
//   {Issues.map((issue) => (
//     <button key={issue.id} onClick={() => setPeaceScales(prevScales => prevScales.placeOnNationalist(issue))}>
//       {issue.name}
//     </button>
//   ))}
// </ul>
// </div>
//   );
// };

// export default Scales;

{/* <div class="parent">
<h1>Scales</h1>
<div class="child">
  <h3>Unionist</h3>
  <DragDropContext>
  <Droppable droppableId="unionistIssues">
    {(provided) => (
      <ul className="unionistIssues" {...provided.droppableProps} ref={provided.innerRef}>
        {unionistIssues?.map(({name, description, weight}, index) => {
          return (
            <Draggable key={name} draggableId={name} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <p>
                    { name }
                  </p>
                </li>
                )}
              </Draggable>
          );
        })}
      </ul>
      )}
      </Droppable>
  </DragDropContext>
</div>
<div class="child">
  <h3>Nationalist</h3>
</div>
<div>
<ul>
    {Issues.map((issue) => (
      <button key={issue.id} onClick={() => setPeaceScales(prevScales => prevScales.placeOnUnionist(issue))}>
        {issue.name}
      </button>
    ))}
  </ul>

  <ul>
    {Issues.map((issue) => (
      <button key={issue.id} onClick={() => setPeaceScales(prevScales => prevScales.placeOnNationalist(issue))}>
        {issue.name}
      </button>
    ))}
  </ul>
</div>
</div> */}