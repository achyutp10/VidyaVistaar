import React from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';


function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* <Navbar /> */}
      TeacherDashboard
      <p>{user?.first_name}</p>
      <p>{user?.last_name}</p>
      <p>{user?.phone_number}</p>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
    </div>

  )
}

export default TeacherDashboard