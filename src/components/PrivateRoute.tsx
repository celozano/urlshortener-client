import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { token } = useAuth();

  return token ? children : <Navigate to={'/login'} />;
};
