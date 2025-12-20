import { useAuth } from '@/contexts/auth/AuthContext';

import { Navigate, Outlet } from 'react-router-dom';

/**
 * Component representing a protected route
 */
export default function ProtectedRoute() {
  const { user } = useAuth();

  if (user === false) {
    return null;
  }

  if (user === null) {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
}
