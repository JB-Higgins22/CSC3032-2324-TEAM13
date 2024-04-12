import React from 'react';
import { render, waitFor, screen, fireEvent, act, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import PreGameInfo from '../pages/pre-game-info/pre-game-info';

// TC01 Page contents are loaded
// TC02 User clicks Cancel on confirm quit dialog
// TC03 User clicks Quit on confirm quit dialog
// TC04 User clicks on Settings Icon
// TC05 User clicks out of Settings dialog
// TC06 Next button is clicked
// TC07 Next button is clicked for second time
// TC08 "How to Play Game" button is clicked


//Because test cases are the same as tutorial, those tests have been copied and reworked here

fetchMock.enableMocks();

describe('Pregameinfo Component', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    
    //TC01 Page contents are loaded correctly
    it('Page Contents Correctly Loaded', async () => {
        // Render the Pregame component
        render(
            <Router>
                <PreGameInfo />
             </Router>
        );

        const settingsIcon = screen.getByLabelText(/SettingsIcon/i);
        expect(settingsIcon).toBeInTheDocument();
        const homeIcon = screen.getByLabelText(/HomeIcon/i);
        expect(homeIcon).toBeInTheDocument();
        expect(screen.getByText(/A BACKGROUND ON THE TROUBLES/i)).toBeInTheDocument();
        expect(screen.getByText(/The Troubles, also known as the Northern Ireland conflict,/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();

    });
    
    //TC02 User clicks cancel on confirm quit dialog
    it('Confirm Quit Dialog Closes When Cancel is Clicked', async () => {
        render(
            <Router>
                <PreGameInfo />
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
                <PreGameInfo />
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

    /*
    //TC04 User clicks on Settings icon
    it('Settings Dialog Opened When Settings Icon Clicked', async () => {
        render(
            <Router>
                <SoundProvider>
                    <Pregameinfo />
                </SoundProvider>
            </Router>
        );

        // simulate the click.
        // Has been tested but doesn't seem to work here
        const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
        fireEvent.click(settingsIcon);

        expect(screen.queryByLabelText('Settings-Dialog')).toBeInTheDocument();

    });

    //TC05 User clicks out of Settings dialog 
    it('Settings Dialog Can Be Closed', async () => {
        render(
            <Router>
                <SoundProvider>
                    <Pregameinfo />
                </SoundProvider>
            </Router>
        );

        // simulate the click.
        //Has been tested before but doesn't seem to work here

        const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
        fireEvent.click(settingsIcon);

        const closeButton = screen.getByRole('button', { name: 'closeSettings' });
        fireEvent.click(closeButton)

        expect(screen.queryByLabelText('Settings-Dialog')).not.toBeInTheDocument();
    });

    //TC06 Next button is clicked
    it('Next button is clicked', async () => {
        render(
          <Router>
            <Pregameinfo />
          </Router>
        );

        // simulate the click.
        const nextButton = await screen.getByLabelText(/NextButton/i);
        fireEvent.click(nextButton);
        
        //Don't know if this is a waiting issue because the components move in and out but this seems close
        expect(screen.getByText(/At its core, the Troubles were driven by political,/i)).toBeInTheDocument();
        
    });
    
    //TC07 Next button is clicked for the second time
    it('Next button is clicked', async () => {
        render(
          <Router>
            <Pregameinfo />
          </Router>
        );

        // simulate the click.
        // This should suffer from the same issue as TC06
        const nextButton = await screen.getByLabelText(/NextButton/i);
        fireEvent.click(nextButton);
        expect(await screen.getByText(/At its core, the Troubles were driven by political,/i)).toBeInTheDocument();

        fireEvent.click(nextButton);    
        expect(await screen.getByText(/The primary actors in this conflict included republican/i)).toBeInTheDocument();
        
    }); 
    
    //TC08 “How to Play” button is clicked
    it('Next button is clicked', async () => {
        render(
          <Router>
            <Pregameinfo />
          </Router>
        );

        // simulate the click.
        // Again this is to do with waiting for the final content to come in
        const finalButton = await screen.getByText(/The primary actors in this conflict included republican/i);
        fireEvent.click(finalButton);
        const gameLink = screen.getByRole('link', { name: 'Pregameinfo' });
    
        expect(gameLink).toHaveAttribute('href', expect.stringContaining('tutorial'));
    });
    */
});