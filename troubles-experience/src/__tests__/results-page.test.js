import React from 'react';
import { render, waitFor, screen, fireEvent, act, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import Results from '../pages/results/results';

// TC01 Page contents are loaded
// TC02 User clicks cancel on confirm quit dialog
// TC03 User clicks Quit on confirm quit dialog
// TC04 User clicks on Settings icon
// TC05 User clicks out of Settings dialog
// TC06 Next button is clicked
// TC07 Next button is clicked for the second time
// TC08 Results % on screen Phase 1
// TC09 Results % on screen Phase 2
// TC10 Results % on screen overall
// TC11 "Share reflection" button is clicked


fetchMock.enableMocks();

describe('Results Component', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    
    //TC01 Page contents are loaded correctly
    it('Page Contents Correctly Loaded', async () => {
        // Render the Results component
        render(
            <Router>
                <Results />
             </Router>
        );

        const settingsIcon = screen.getByLabelText(/SettingsIcon/i);
        expect(settingsIcon).toBeInTheDocument();
        const homeIcon = screen.getByLabelText(/HomeIcon/i);
        expect(homeIcon).toBeInTheDocument();
        expect(screen.getByText(/RESULTS/i)).toBeInTheDocument();
        expect(screen.getByText(/1998 Peace Talks/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();

    });
    
    //TC02 User clicks cancel on confirm quit dialog
    it('Confirm Quit Dialog Closes When Cancel is Clicked', async () => {
        render(
            <Router>
                <Results />
            </Router>
        );

        // Simulate the click.
        const homeIcon = await screen.getByLabelText(/HomeIcon/i);
        fireEvent.click(homeIcon);

        const closeButton = screen.getByRole('button', { name: 'closeConfirmQuit' });
        fireEvent.click(closeButton)

        expect(screen.queryByLabelText('Confirm-Quit-Dialog')).not.toBeInTheDocument();
    });
    
    //TC03 User clicks Quit on confirm quit dialog
    it('User is redirected Home When Quit is Clicked', async () => {
        render(
            <Router>
                <Results />
            </Router>
        );

        // simulate the click.
        const homeIcon = await screen.getByLabelText(/HomeIcon/i);
        fireEvent.click(homeIcon);

        const linkElement = screen.getByRole('link', { name: /Quit/i });
        expect(linkElement).toBeInTheDocument();

        fireEvent.click(linkElement);
        expect(window.location.pathname).toBe("/");
    });


});