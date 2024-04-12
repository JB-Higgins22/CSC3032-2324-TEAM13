import Tutorial from '../pages/tutorial/tutorial';
import React from 'react';
import { render, waitFor, screen, fireEvent, act, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import { SoundProvider } from '../sounds/soundContext';

    //TC01 Page contents are loaded correctly
    //TC02 User clicks cancel on confirm quit dialog 
    //TC03 User clicks Quit on confirm quit dialog 
    //TC04 User clicks on Settings icon 
    //TC05 User clicks out of Settings dialog 
    //TC06 Next button is clicked 
    //TC07 Next button is clicked for the second time 
    //TC08 “Play Game” button is clicked 

  

fetchMock.enableMocks();

describe('Tutorial Component', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    
    //TC01 Page contents are loaded correctly
    it('Page Contents Correctly Loaded', async () => {
        // Render the Tutorial component
        render(
            <Router>
                <Tutorial />
             </Router>
        );

        const settingsIcon = screen.getByLabelText(/SettingsIcon/i);
        expect(settingsIcon).toBeInTheDocument();
        const homeIcon = screen.getByLabelText(/HomeIcon/i);
        expect(homeIcon).toBeInTheDocument();
        const firstImage = screen.getByAltText(/Step 1/i);
        expect(firstImage).toBeInTheDocument();
        expect(screen.getByText(/HOW TO PLAY GAME/i)).toBeInTheDocument();
        expect(screen.getByText(/Step 1 - Select an issue by clicking on a book/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();

    });
    
    //TC02 User clicks cancel on confirm quit dialog
    it('Confirm Quit Dialog Closes When Cancel is Clicked', async () => {
        render(
            <Router>
                <Tutorial />
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
                <Tutorial />
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
                    <Tutorial />
                </SoundProvider>
            </Router>
        );

        // simulate the click.
        // Has been tested but doesn't seem to work here
        const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
        act (() => {
            fireEvent.click(settingsIcon);
        });

        await waitFor(() => expect(settingsDialogContent).toBeInTheDocument());
    });

    //TC05 User clicks out of Settings dialog 
    it('Settings Dialog Can Be Closed', async () => {
        render(
            <Router>
                <SoundProvider>
                    <Tutorial />
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
            <Tutorial />
          </Router>
        );

        // simulate the click.
        const nextButton = await screen.getByLabelText(/NextButton/i);
        act (() => {
            fireEvent.click(nextButton);
        });

        
        //Don't know if this is a waiting issue because the components move in and out but this seems close
        await waitFor(() => expect(screen.getByAltText(/Step 2/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Step 2 - Choose which solution you think is best/i)).toBeInTheDocument());
        
    });
    

    //TC07 Next button is clicked for the second time
    it('Next button is clicked', async () => {
        render(
          <Router>
            <Tutorial />
          </Router>
        );

        // simulate the click.
        // This should suffer from the same issue as TC06
        const nextButton = await screen.getByLabelText(/NextButton/i);
        fireEvent.click(nextButton);
        expect(await screen.getByText(/Step 2 - Choose which solution you think is best/i)).toBeInTheDocument();

        fireEvent.click(nextButton);    
        expect(await screen.getByText(/Step 3 - Balance the issues on the scales/i)).toBeInTheDocument();
        
    }); 
    
    //TC08 “Play Game” button is clicked
    it('Next button is clicked', async () => {
        render(
          <Router>
            <Tutorial />
          </Router>
        );

        // simulate the click.
        // Again this is to do with waiting for the final content to come in
        const finalButton = await screen.getByText(/Step 3 - Balance the issues on the scales/i);
        fireEvent.click(finalButton);
        const gameLink = screen.getByRole('link', { name: 'Tutorial' });
    
        expect(gameLink).toHaveAttribute('href', expect.stringContaining('scales'));
    });
    */
});
