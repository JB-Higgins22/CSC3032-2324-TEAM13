import {Navigate } from 'react-router-dom';

const PrivateRoutes = ({authenticated,children}) => {
    if (!authenticated) {
        return <Navigate to="/login" replace />;
      }
    
      return children;
    };

  
  //return <div>{authenticated ? children : <Navigate to="/login" />}</div>;

export default PrivateRoutes;