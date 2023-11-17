import React, { useState, useEffect } from 'react';
import ScalesObject from '../../classes/scales';
import Issue from '../../classes/issue';

var Issues = [];

const Scales = () => {
  const [peaceScales, setPeaceScales] = useState(null);

  useEffect(() => {
    initialiseScales();
    initialiseIssues();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  function initialiseScales() {
    const initialisationIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);
    setPeaceScales(new ScalesObject([], [], 0, 0));
  }

  function initialiseIssues() {
    const decommissioningIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);
    const northSouthCouncilIssue = new Issue('North/South Council', 'North/South Council & blah blah blah', 10);
    const britishIrishCouncilIssue = new Issue('British/Irish Council', 'British/Irish Council & blah blah blah', 10);
    const selfDeterminationIssue = new Issue(
      'The Right to Self-Determination',
      'The Right to Self-Determination & blah blah blah',
      10
    );

    Issues = [decommissioningIssue, northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue];
  }

  return (
    <div>
      <h1>Scales</h1>
      <table>
        <tbody>
          <tr>
            <th>Unionist Side</th>
            <th>|</th>
            <th>Nationalist Side</th>
          </tr>
          <tr>
            <td>{peaceScales?.unionistWeight}</td>
            <td>|</td>
            <td>{peaceScales?.nationalistWeight}</td>
          </tr>
        </tbody>
      </table>

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
  );
};

export default Scales;