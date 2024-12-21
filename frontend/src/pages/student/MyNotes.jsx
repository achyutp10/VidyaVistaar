import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import Notes from '../Notes/Notes';


function MyNotes() {
  const { user } = useSelector((state) => state.auth);

  return (

    <section className="pt-5 pb-3">
      <div className="container">
        {/* Header Here */}
        <div className="row mt-0">
          {/* Sidebar Here */}
          <Sidebar />
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row mb-4">
              <h4 className="mb-4">
                {" "}
                <i className="bi bi-grid-fill"></i> Welcome, {user?.first_name} {user?.last_name}
              </h4>
              <Notes />
            </div>
          </div>
        </div>
      </div>
    </section>

    // <div className='bg-gray-50 min-h-screen flex flex-col'>

    //   <h1>Student Dashboard</h1>
    //   <p>{user?.first_name}</p>
    //   <p>{user?.last_name}</p>
    //   <p>{user?.phone_number}</p>
    //   <p>{user?.email}</p>
    //   <p>{user?.role}</p>

    // </div>
  )
}

export default MyNotes