import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleDashboard = (e) => {
    e.preventDefault()
    if (user.role === 'STUDENT') {
      navigate('/student-dashboard');
    } else if (user.role === 'TEACHER') {
      navigate('/teacher-dashboard');
    };
  }
  return (
    <div className="lg:w-1/4 md:w-1/3 w-full">
      <nav className="bg-[#e7f5ef] shadow-sm mb-2 rounded-lg p-4">
        <a className="lg:hidden md:hidden sm:hidden text-inherit font-bold text-decoration-none text-gray-700 p-3" href="#">Menu</a>
        <button className="lg:hidden md:block sm:block icon-shape icon-sm rounded bg-primary text-light m-3" type="button" aria-label="Toggle navigation">
          <span className="bi bi-grid" />
        </button>
        <div className="lg:block md:block sm:hidden">
          <div className="space-y-4">
            <ul className="space-y-3">
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" onClick={handleDashboard}>
                  <i className='bi bi-grid-fill mr-2'></i> Dashboard
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`/notes`}>
                  <i className='fas fa-shopping-cart mr-2'></i> My Notes
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-plus mr-2'></i> Create Notes
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-star mr-2'></i> Review
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-graduation-cap mr-2'></i> Students
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-dollar-sign mr-2'></i> Earning
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-question-circle mr-2'></i> Quiz
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-shopping-cart mr-2'></i> Orders
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-envelope mr-2'></i> Q/A
                </Link>
              </li>
            </ul>

            {/* Navbar header */}
            <span className="text-lg font-semibold text-gray-600">Account Settings</span>
            <ul className="space-y-3">
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-edit mr-2'></i> Edit Profile
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-lock mr-2'></i> Change Password
                </Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-blue-500 flex items-center" to={`#`}>
                  <i className='fas fa-sign-out-alt mr-2'></i> Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
