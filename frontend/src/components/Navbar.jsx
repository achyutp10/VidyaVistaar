import React, { useEffect, useState } from 'react'
import { fetchCurrentUser, logoutUser } from '../store/auth-slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Toast from '../utils/Toast';
import Container from './Container';
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { CgLogIn } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";

const navLists = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about-us' },

];

const API_BASE_URL = 'http://localhost:8000';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { user } = useSelector((state) => state.auth);

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
  };

  const handleDashboard = (e) => {
    e.preventDefault()
    if (user.role === 'STUDENT') {
      navigate('/student-dashboard');
    } else if (user.role === 'TEACHER') {
      navigate('/teacher-dashboard');
    };
  }

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  useEffect(() => {
    console.log("Current user data:", user);
    if (user?.profile_picture) {
      console.log("Profile picture URL:", user.profile_picture);
    }
  }, [user]);
  return (
    <Container>
      {/* // <header className='bg-white py-6 border'> */}
      <nav className='flex justify-between h-50 p-1' style={{ backgroundColor: '#f4f4f4', }}>
        <a href="/">
          <img src="../../public/logo/logo.png" alt="logo" className='h-20 w-auto' />
        </a>
        <ul className='sm:flex hidden items-center gap-2 font-semibold mx-5'>
          {navLists.map((list, index) => (
            <li key={index} className="list-none">
              <NavLink
                to={list.path}
                className={({ isActive }) =>
                  `px-2 py-2 rounded-md transition-colors duration-500 ease-in-out ${isActive
                    ? "bg-[#2a3521] text-[#a6ef67] font-semibold"
                    : "text-gray-800 hover:bg-gray-100 hover:text-[#a6ef67]"
                  }`
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}


          {/* <li className='flex gap-3 items-center'>
            <img alt="" className='size-8' />
            <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>Logout</button>
          </li> */}

          {/* Conditional rendering based on user presence */}
          {user ? (
            <li className='flex gap-2'>
              <button onClick={handleLogout} className='text-[#000] hover:text-[#d16e60] hover:bg-[#000] p-2 h-auto w-14 rounded-full flex justify-center items-center shadow-lg'><BiLogOut size={28} /></button>
              <button
                onClick={handleDashboard}
                className='bg-[#000] text-[#a6ef67] hover:text-[#d16e60] hover:bg-[#a6ef67] p-2 h-auto w-14 rounded-full flex justify-center items-center shadow-lg'>
                {
                  user?.profile_picture ? (
                    <img src={`${API_BASE_URL}${user.profile_picture}`} alt="profile" className='h-10 rounded-full' />
                  ) :

                    <img src='../../public/User/userDefault.png' alt="profile" className='h-auto w-15 rounded-lg' />
                }

              </button>
            </li>
          ) : (
            <li>
              {/* <NavLink to="/login" className='bg-[#565564] px-5 py-3 text-white rounded-full hover:text-[#a6ef67]'>Login</NavLink> */}
              <NavLink to="/login" className='bg-[#000] text-[#a6ef67] p-2 h-10 w-10 rounded-full flex justify-center items-center shadow-lg hover:text-[#d16e60] hover:bg-[#a6ef67]'><CgLogIn size={25} /></NavLink>



            </li>
          )}

          {/* admin */}

        </ul>

        <div className='flex items-center sm:hidden'>
          <button
            onClick={toggleMenu}
            className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'>
            {isMenuOpen ? <IoClose className='size-6' /> : <IoMenuSharp className='size-6' />}
          </button>
        </div>


      </nav>

      {isMenuOpen && (
        <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
          {navLists.map((list, index) => (
            <li key={index} className='mt-5 px-4'>
              <NavLink to={list.path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
                onClick={() => setIsMenuOpen(false)}
              >{list.name}</NavLink>
            </li>
          ))}
          {user ? (
            <>
              <img src='' alt="" className='size-8' />
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li className='px-4 mt-5'><NavLink to="/login">Login</NavLink></li>
          )}
        </ul>
      )}


    </Container>
  )
}

export default Navbar







