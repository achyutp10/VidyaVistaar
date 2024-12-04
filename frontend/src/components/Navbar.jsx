import React, { useEffect } from 'react'
import { fetchCurrentUser, logoutUser } from '../store/auth-slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Toast from '../utils/Toast';


const navLists = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about-us' },

];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user)

  // if (!user) {
  //   console.log("User data is not yet available.");
  //   return <div>Loading...</div>; // Optionally render a loading state
  // }

  // console.log("Navbar user:", user);
  // console.log("Navbar role:", user.role);

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logout action
    navigate('/login');
    Toast().fire({
      icon: "success",
      title: "Logout Successfull!",
    });
    // localStorage.removeItem('access_token'); // Clear token from localStorage
    // localStorage.removeItem('refresh_token'); // Clear token from localStorage
  };
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <header className='bg-white py-6 border'>
      <nav className='container mx-auto flex justify-between px-5'>
        <a href="/">
          <img src="/logo.png" alt="logo" className='h-12' />
        </a>
        <ul className='sm:flex hidden items-center gap-8'>
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink to={list.path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >{list.name}</NavLink>
            </li>
          ))}

          {/* <li className='flex gap-3 items-center'>
            <img alt="" className='size-8' />
            <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Logout</button>
          </li> */}

          {/* Conditional rendering based on user presence */}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'
              >
                Logout
              </button>


            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>

            </li>
          )}

          {/* admin */}

        </ul>


      </nav>

    </header>
  )
}

export default Navbar







