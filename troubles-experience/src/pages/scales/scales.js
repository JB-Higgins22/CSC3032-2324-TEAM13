import React from 'react';
import ScalesObject from '../../classes/scales';
import Issue from '../../classes/issue';

var Issues = [];
var peaceScales;

const Scales = () =>{
  initialiseIssues();
  initialiseScales();
  return (
    <div>
      <h1>Scales</h1>
      <table>
        <tr>
          <th>Unionist Side</th>
          <th>|</th>
          <th>Nationalist Side</th>
        </tr>
          <td>{peaceScales.unionistWeight}</td>
          <td>|</td>
          <td>{peaceScales.nationalistWeight}</td>
      </table>

      <ul>
        {Issues.map((issue) => (
          <button key={issue.id} onClick={peaceScales.placeOnUnionist.bind(this, issue)}>{issue.name}</button>
        ))}
      </ul>

      <ul>
        {Issues.map((issue) => (
          <button key={issue.id} onClick={peaceScales.placeOnNationalist.bind(this, issue)}>{issue.name}</button>
        ))}
      </ul>

    </div>
  );
}

function initialiseScales() {
  peaceScales = new ScalesObject([{}],[{}],0,0);
}

function initialiseIssues() {
  var decommissioningIssue = new Issue('Decommissioning', 'Decommissioning & blah blah blah', 10);

  var northSouthCouncilIssue = new Issue('North/South Council', 'North/South Council & blah blah blah', 10);

  var britishIrishCouncilIssue = new Issue('British/Irish Council', 'British/Irish Council & blah blah blah', 10);

  var selfDeterminationIssue = new Issue('The Right to Self-Determination', 'The Right to Self-Determination & blah blah blah', 10);

  Issues = [decommissioningIssue, northSouthCouncilIssue, britishIrishCouncilIssue, selfDeterminationIssue];

  console.log(Issues);
}

export default Scales;