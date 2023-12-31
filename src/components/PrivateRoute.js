import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate} from 'react-router-dom';

export default function PrivateRoute({ Component }) {

  const { user, isAuthenticated } = useAuthContext();
  console.log(isAuthenticated);
  // const navigate = useNavigate();

  if (isAuthenticated)
    return Component
  return <Navigate to="/auth/login" /> 

}