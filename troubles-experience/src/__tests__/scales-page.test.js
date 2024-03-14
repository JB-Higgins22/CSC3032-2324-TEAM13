import { render, screen, waitFor } from '@testing-library/react';
import Scales from '../pages/scales/scales';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import mockIssueData from '../__mocks__/mockIssueData';

beforeAll(() => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockIssueData),
    })
  );
});

beforeEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  fetch.mockRestore();
});


test('Scales Page Renders Necessary Components: TC01', async () => {
  render(
    <MemoryRouter>
      <Scales />
    </MemoryRouter>
  );

  // Wait for the async operation to complete and UI to update
  await waitFor(() => expect(screen.getByText(/Balance/i)).toBeInTheDocument());

  // // Correct way to check if fetch was called
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/issues');
});


// // Then, check for the presence of specific elements indicating successful data fetch
  // const bookshelf = await screen.findBySelector('.books'); // Using findBySelector for example, adjust as needed
  // expect(bookshelf).not.toBeNull();