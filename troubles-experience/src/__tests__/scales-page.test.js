// Import necessary utilities and your component
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Scales from '../pages/scales/scales';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

// Enable fetch mocking
fetchMock.enableMocks();

describe('Scales Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls the issues endpoint on component mount', async () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify([
      {
          "id": 186,
          "name": "Decommissioning of Arms",
          "description_one": "Debate on the mechanisms for the decommissioning of paramilitary arms as a trust-building measure.",
          "description_two": "How should disarmament be verified to satisfy all parties?",
          "image_url": "/images/decommissioning_arms.jpg",
          "number_of_options": 3,
          "selected_option": "X",
          "option_a": "Immediate and Transparent Decommissioning",
          "option_a_nationalist_weight": 30,
          "option_a_nationalist_perspective": "Ensures a commitment to peace.",
          "option_a_unionist_weight": 10,
          "option_a_unionist_perspective": "Builds trust among communities.",
          "option_b": "Phased Decommissioning",
          "option_b_nationalist_weight": 10,
          "option_b_nationalist_perspective": "Allows verification and trust building.",
          "option_b_unionist_weight": 20,
          "option_b_unionist_perspective": "Ensures security concerns are addressed.",
          "option_c": "No Decommissioning Required",
          "option_c_nationalist_weight": 5,
          "option_c_nationalist_perspective": "Trust should be built through dialogue.",
          "option_c_unionist_weight": 5,
          "option_c_unionist_perspective": "Maintains a stance on self-defense."
      },
      {
          "id": 187,
          "name": "Police Reform",
          "description_one": "Discussion on reforming the Royal Ulster Constabulary (RUC) to create a police service representative of the entire community.",
          "description_two": "How to transform the police service to gain the trust of all communities?",
          "image_url": "/images/police_reform.jpg",
          "number_of_options": 3,
          "selected_option": "X",
          "option_a": "Comprehensive Reform and Renaming",
          "option_a_nationalist_weight": 25,
          "option_a_nationalist_perspective": "Symbolizes a new start.",
          "option_a_unionist_weight": 15,
          "option_a_unionist_perspective": "Acknowledges past and looks to future.",
          "option_b": "Moderate Reforms",
          "option_b_nationalist_weight": 15,
          "option_b_nationalist_perspective": "Improves relations gradually.",
          "option_b_unionist_weight": 25,
          "option_b_unionist_perspective": "Balances tradition with necessary changes.",
          "option_c": "Maintain Current Structure",
          "option_c_nationalist_weight": 10,
          "option_c_nationalist_perspective": "Preserves order and tradition.",
          "option_c_unionist_weight": 5,
          "option_c_unionist_perspective": "A cautious approach to change."
      }
  ]));

    // Render the Scales component
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the fetch call to happen
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/issues');
    });
  });
});
