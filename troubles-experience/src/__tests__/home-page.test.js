import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/home/home';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { SoundProvider } from '../sounds/soundContext';

test('Home Screen Renders: TC01', () => {
    render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
  const necessaryText = screen.getByText(/Peace Process Puzzle Game/i);
  expect(necessaryText).toBeInTheDocument();
});

test('Page displays options correctly: TC02', () => {
  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

    const settingsIcon = container.querySelector('.SettingsIcon');
    expect(screen.getByText(/Start Puzzle/i)).toBeInTheDocument();
    expect(screen.getByText(/Museum Of The Troubles and Peace Process Home Page/i)).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
  });

  test('Clicking the settings icon navigates to the settings page: TC03', async () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <HomePage />
          </SoundProvider>
      </MemoryRouter>
    );
  
    //const settingsLink = screen.getByRole('link', { name: 'Settings' });
    const settingsIcon = screen.getByLabelText(/SettingsIcon/i);

    act(() => {
      fireEvent.click(settingsIcon);
    });

    expect(screen.getByText('Settings')).toBeInTheDocument();
  
    // User clicking the link
    // await act(async () => {
    //   await userEvent.click(settingsLink);
    // });
  
    // expect(settingsLink).toHaveAttribute('href', expect.stringContaining('settings'));
  });

  test('Clicking the `Play Game` button navigates to the pre-game-info page: TC04', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  
    const preGameInfoLink = screen.getByRole('link', { name: 'PreGameInfo' });
  
    // User clicking the link
    await act(async () => {
      await userEvent.click(preGameInfoLink);
    });
  
    expect(preGameInfoLink).toHaveAttribute('href', expect.stringContaining('pre-game-info'));
  });

  test('The museum website is opened in a new tab when clicked: TC05', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const museumLink = screen.getByText(/Museum Of The Troubles and Peace Process Home Page/i).closest('a');
    expect(museumLink).toHaveAttribute('href', 'http://museumofthetroubles.org/');
    expect(museumLink).toHaveAttribute('target', '_blank');
  });
  


  


