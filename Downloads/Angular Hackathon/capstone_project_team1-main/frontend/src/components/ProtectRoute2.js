import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute2=({isLoggedIn, children})=> {
  if (isLoggedIn) {
    return <Navigate to="/banking" replace />;
  }
  return children;
}

export default ProtectRoute2;
