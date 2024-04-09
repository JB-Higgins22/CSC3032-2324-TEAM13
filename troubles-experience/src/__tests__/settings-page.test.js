import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import BasicTabs from '../pages/settings/tabs.js';
import Settings from '../pages/settings/settingsPage.js';
import { SoundProvider } from '../sounds/soundContext.js';


describe('BasicTabs', () => {
  test('TC01 - Page contents are loaded', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByLabelText('mute switch')).toBeInTheDocument();
    expect(screen.getByLabelText('black and white switch')).toBeInTheDocument();
    expect(screen.getByLabelText('contrast switch')).toBeInTheDocument();
    expect(screen.getByLabelText('Large')).toBeInTheDocument();;
    expect(screen.getByLabelText('Medium')).toBeInTheDocument();;
    expect(screen.getByLabelText('Small')).toBeInTheDocument();
    expect(screen.getByLabelText('mute label')).toBeInTheDocument();
    expect(screen.getByLabelText('black and white label')).toBeInTheDocument();
    expect(screen.getByLabelText('contrast label')).toBeInTheDocument();
    expect(screen.getByLabelText('font label')).toBeInTheDocument();
  });

  test('TC02 - Dark Mode is toggled', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const darkModeSwitch = screen.getByLabelText('black and white switch');
    fireEvent.click(darkModeSwitch);
    expect(document.body.style.filter).toEqual('grayscale(100%)');
  });

  test('TC03 - High Contrast Mode is toggled', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const highContrastSwitch = screen.getByLabelText('contrast switch');
    fireEvent.click(highContrastSwitch);
    expect(document.body.style.filter).toEqual('contrast(200%)');
  });

  test('TC04 - Large font size radio button is clicked', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const largeFontSizeRadioButton = screen.getByLabelText('Large');
    fireEvent.click(largeFontSizeRadioButton);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
    expect(rootFontSize).toBeGreaterThan(1); // Assuming font size increased
  });

  test('TC05 - Default font size radio button is clicked', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const defaultFontSizeRadioButton = screen.getByLabelText('Medium'); // Assuming "Medium" is the default size
    fireEvent.click(defaultFontSizeRadioButton);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
    expect(rootFontSize).toEqual(1); // Assuming default font size is 1vmin
  });

  test('TC06 - Small font size radio button is clicked', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const smallFontSizeRadioButton = screen.getByLabelText('Small');
    fireEvent.click(smallFontSizeRadioButton);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
    expect(rootFontSize).toBeLessThan(1); // Assuming font size decreased
  });

  test('TC07 - Admin tab is clicked from General tab', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const adminTab = screen.getByText('Admin');
    fireEvent.click(adminTab);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('TC08 - General tab is clicked from Admin tab', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const adminTab = screen.getByText('Admin');
    fireEvent.click(adminTab); // Switch to Admin tab first
    const generalTab = screen.getByText('General');
    fireEvent.click(generalTab);
    expect(screen.getByLabelText('mute switch')).toBeInTheDocument();
    expect(screen.getByLabelText('black and white switch')).toBeInTheDocument();
    expect(screen.getByLabelText('contrast switch')).toBeInTheDocument();
    expect(screen.getByLabelText('Large')).toBeInTheDocument();;
    expect(screen.getByLabelText('Medium')).toBeInTheDocument();;
    expect(screen.getByLabelText('Small')).toBeInTheDocument();
    expect(screen.getByLabelText('mute label')).toBeInTheDocument();
    expect(screen.getByLabelText('black and white label')).toBeInTheDocument();
    expect(screen.getByLabelText('contrast label')).toBeInTheDocument();
    expect(screen.getByLabelText('font label')).toBeInTheDocument();
  });

  test('TC09 - Login button is clicked', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    const adminTab = screen.getByText('Admin');
    fireEvent.click(adminTab);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(document.querySelector('.login-button')).toBeInTheDocument();
  });

  test('TC10 - Dark Mode is toggled off', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    
    
    const blackAndWhiteSwitch = screen.getByRole('checkbox', { name: 'black and white switch' });

    expect(blackAndWhiteSwitch).not.toBeChecked();

    // toggling the blackAndWhiteSwitch 
    fireEvent.click(blackAndWhiteSwitch);
    expect(blackAndWhiteSwitch).toBeChecked();

    // Optionally, check if toggling it again unmutes
    fireEvent.click(blackAndWhiteSwitch);
    expect(blackAndWhiteSwitch).not.toBeChecked();
  });

  test('TC11 - High Contrast Mode is toggled off', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    
    
    const contrastSwitch = screen.getByRole('checkbox', { name: 'contrast switch' });

    expect(contrastSwitch).not.toBeChecked();

    // toggling the contrastSwitch 
    fireEvent.click(contrastSwitch);
    expect(contrastSwitch).toBeChecked();

    // Optionally, check if toggling it again unmutes
    fireEvent.click(contrastSwitch);
    expect(contrastSwitch).not.toBeChecked();
  });

  test('TC12 - Mute Volume is toggled on', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    
    
    const muteSwitch = screen.getByRole('checkbox', { name: 'mute switch' });

    expect(muteSwitch).not.toBeChecked();

    // toggling the mute switch
    fireEvent.click(muteSwitch);
    expect(muteSwitch).toBeChecked();

  });

  test('TC13 - Mute Volume is toggled off', () => {
    render(
      <MemoryRouter>
        <SoundProvider>
          <BasicTabs />
        </SoundProvider>
      </MemoryRouter>
    );
    
    
    const muteSwitch = screen.getByRole('checkbox', { name: 'mute switch' });

    expect(muteSwitch).not.toBeChecked();

    // toggling the mute switch
    fireEvent.click(muteSwitch);
    expect(muteSwitch).toBeChecked();

    // Optionally, check if toggling it again unmutes
    fireEvent.click(muteSwitch);
    expect(muteSwitch).not.toBeChecked();
  });



});
