import React from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';


function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (

    <section className="pt-5 pb-5">
      <div className="container">
        {/* Header Here */}
        <div className="row mt-0 mt-md-2">
          {/* Sidebar Here */}
          <Sidebar />
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row mb-4">
              <h4 className="mb-4">
                {" "}
                <i className="bi bi-grid-fill"></i>Welcome, {user?.first_name} {user?.last_name}
              </h4>

            </div>
          </div>
        </div>
      </div>
    </section>

    // {/* TeacherDashboard
    //   <p>{user?.first_name}</p>
    //   <p>{user?.last_name}</p>
    //   <p>{user?.phone_number}</p>
    //   <p>{user?.email}</p>
    //   <p>{user?.role}</p> */}


  )
}

export default TeacherDashboard