/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem('access-token');
  const location = useLocation();
  console.log('this', isAuthenticated);

  return (
    isAuthenticated !== null ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
