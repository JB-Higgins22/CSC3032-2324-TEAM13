import React, { useState, useEffect } from 'react';

const DeviceOrientation = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMessage(window.innerHeight > window.innerWidth);
    };

    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div style={{ display: showMessage ? 'block' : 'none',
                    textAlign: 'center',
                    fontFamily: 'Anton',
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'rgba(0, 0, 0, 1)', 
                    color: '#fff', 
                    padding: '10px', 
                    borderRadius: '10px', 
                    zIndex: '9999' }}>
        <p>Please rotate your device to landscape mode.</p>
      </div>
      {showMessage && <div style={{ position: 'fixed', 
                                    top: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                    zIndex: '9998' }}></div>}
    </>
  );
};

export default DeviceOrientation;
