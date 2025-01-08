import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import StudentDashboard from '../pages/student/StudentDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import ProtectedRoute from './ProtectedRoute';
import ForgetPassword from '../pages/user/ForgetPassword';
import ResetPassword from '../pages/user/ResetPassword';
import Notes from '../pages/Notes/Notes';
import MyNotes from '../pages/student/MyNotes';
import ActivatePage from '../pages/UtilityPages/ActivatePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about-us",
        element: <AboutUs />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />
      },
      // {
      //   path: "/reset_password_validate/:uid/:token",
      //   element: <ResetPassword />
      // },
      {
        path: "/reset_password_validate/:uid/:token",
        element: <ResetPassword />
      },

      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/student-dashboard",
        element: (
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/teacher-dashboard",
        element: (
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <TeacherDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/notes",
        element: (

          <MyNotes />

        )
      },
      {
        path: "/activate/:uidb64/:token",
        element: (

          <ActivatePage />

        )
      },
    ]
  },
]);

export default router;