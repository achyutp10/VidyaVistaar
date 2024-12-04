// import React, { useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCurrentUser } from '../store/auth-slice/authSlice';

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isAuthenticated, role } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Check for access token on page load
//     const accessToken = localStorage.getItem('access_token');
//     if (accessToken && !user) {
//       dispatch(fetchCurrentUser());
//     }
//   }, [dispatch, user]);

//   if (!isAuthenticated || !allowedRoles.includes(role)) {
//     console.log("Not authenticated");
//     return <Navigate to='/login' />; // Redirect to login if not authenticated or role mismatch
//   }

//   return children; // Allow access to the protected route if role matches
// };

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isAuthenticated, role } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const accessToken = localStorage.getItem('access_token');
//     if (accessToken && !user) {
//       dispatch(fetchCurrentUser());
//     }
//   }, [dispatch, user]);
//   useEffect(() => {
//     console.log("User role:", role);
//     console.log("User authenticated:", isAuthenticated);
//   }, [role, isAuthenticated]);




//   // Ensure that both user is authenticated and their role is allowed
//   if (!isAuthenticated) {
//     console.log("Not authenticated");
//     return <Navigate to='/login' />; // Redirect to login if not authenticated
//   }

//   if (!allowedRoles.includes(role)) {
//     console.log("Role mismatch");
//     return <Navigate to='/login' />; // Redirect if the role doesn't match
//   }

//   return children;
// };


// export default ProtectedRoute;

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/auth-slice/authSlice';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, role } = useSelector((state) => state.auth);

  // Check if there's a token in localStorage and if the user is authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !user) {
      dispatch(fetchCurrentUser()); // Fetch current user if token exists
    }
  }, [dispatch, user]);

  // if (isAuthenticated && role === 'STUDENT') {
  //   console.log("Already authenticated, redirecting to Student Dashboard...");
  //   return <Navigate to="/student-dashboard" />; // Redirect to home or another route if user is already logged in
  // }
  // if (isAuthenticated && role === 'TEACHER') {
  //   console.log("Already authenticated, redirecting to Student Dashboard...");
  //   return <Navigate to="/teacher-dashboard" />; // Redirect to home or another route if user is already logged in
  // }
  // Check if user is authenticated and their role is allowed
  if (!isAuthenticated) {
    // console.log("Not authenticated");
    return <Navigate to='/login' />; // Redirect to login if not authenticated
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // console.log("Role mismatch");
    return <Navigate to='/login' />; // Redirect if the role doesn't match
  }

  return children; // Allow access to the protected route
};

export default ProtectedRoute;

