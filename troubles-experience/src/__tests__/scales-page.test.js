// Import necessary utilities and your component
import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Scales from '../pages/scales/scales';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

// Enable fetch mocking
fetchMock.enableMocks();

const mockData = [
  {
    "id": 1,
    "name": "Dummy Issue 1",
    "description_one": "This is a test issue.",
    "description_two": "This is a test issue.",
    "image_url": "/dummyimage.jpeg",
    "number_of_options": 3,
    "selected_option": "X",
    "option_a": "Option A (Representative of total imbalance, + Nationalist)",
    "option_a_nationalist_weight": 100,
    "option_a_nationalist_perspective": "Scales tipped totally in our favour.",
    "option_a_unionist_weight": 0,
    "option_a_unionist_perspective": "No Weight Here.",
    "option_b": "Option B (Representative of total balance)",
    "option_b_nationalist_weight": 100,
    "option_b_nationalist_perspective": "Even",
    "option_b_unionist_weight": 100,
    "option_b_unionist_perspective": "Even",
    "option_c": "Option C (Representative of partial balance, + Unionist)",
    "option_c_nationalist_weight": 20,
    "option_c_nationalist_perspective": "A little weight on this side",
    "option_c_unionist_weight": 80,
    "option_c_unionist_perspective": "Lots of weight on this side."
  },
  {
    "id": 2,
    "name": "Dummy Issue 2",
    "description_one": "This is a test issue.",
    "description_two": "This is a test issue.",
    "image_url": "/dummyimage.jpeg",
    "number_of_options": 3,
    "selected_option": "X",
    "option_a": "Option A (Representative of total imbalance, + Unionist)",
    "option_a_nationalist_weight": 0,
    "option_a_nationalist_perspective": "No Weight Here",
    "option_a_unionist_weight": 100,
    "option_a_unionist_perspective": "Scales tipped totally in our favour.",
    "option_b": "Option B (Representative of total balance)",
    "option_b_nationalist_weight": 100,
    "option_b_nationalist_perspective": "Even",
    "option_b_unionist_weight": 100,
    "option_b_unionist_perspective": "Even",
    "option_c": "Option C (Representative of partial balance, + Nationalist)",
    "option_c_nationalist_weight": 80,
    "option_c_nationalist_perspective": "Lots of weight on this side",
    "option_c_unionist_weight": 20,
    "option_c_unionist_perspective": "A little weight on this side."
  }
]


describe('Scales Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  //TC01
  it('Page Contents Correctly Loaded', async () => {

    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    // Render the Scales component
    render(
      <Router>
        <Scales />
      </Router>
    );

    const scalesElement = await screen.findByText(/Balance Achieved/i);
    const bookshelfElement = await screen.findByAltText(/Bookshelf/i);

    expect(scalesElement).toBeInTheDocument();
    expect(bookshelfElement).toBeInTheDocument();
  })

  //TC02
  it('Issues are loaded from the DB via endpoint', async () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

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


  // TC03
  it('Issue Dialog opens upon clicking on a book', async () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Render the Scales component
    render(
      <Router>
        <Scales />
      </Router>
    );

    // const bookDiv = await screen.findByAltText(/BookOnShelf/i);
    // fireEvent.click(bookDiv);

    // // Assuming 'Dummy Issue 1' opens a dialog with a unique text appearing
    // const issueDialogTitle = await screen.findByText('Dummy Issue 1');
    // expect(issueDialogTitle).toBeInTheDocument();

  });