import React, { createContext, useContext, useState } from 'react';

/*Context allows info on the mute state to be available to everything 
below parent component, rather than passing props */
const SoundContext = createContext();

// Custom hook to access SoundContext values
export const useSoundContext = () => useContext(SoundContext);

// Provider component for managing sound-related state
export const SoundProvider = ({ children }) => {
  // Define state for muting sound
  const [isMuted, setIsMuted] = useState(false);

  // Function to toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted); // Toggle mute state
  };

  // Provide state and function to children components via context
  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};
