import React from 'react'

function Stats() {
  return (
    <>
      <div className="sm:w-1/2 lg:w-1/3 mb-3 mb-lg-0">
        <div className="flex justify-center items-center p-4 bg-orange-100 rounded-3xl">
          <span className="display-6 text-orange-600 mb-0">
            <i className="fas fa-tv fa-fw text-orange-500" />
          </span>
          <div className="ms-4">
            <div className="flex">
              <h5 className="mb-0 font-bold text-xl">55</h5>
            </div>
            <p className="mb-0 text-sm text-gray-600">Total Courses</p>
          </div>
        </div>
      </div>

      {/* Counter item */}
      <div className="sm:w-1/2 lg:w-1/3 mb-3 mb-lg-0">
        <div className="flex justify-center items-center p-4 bg-red-100 rounded-3xl">
          <span className="display-6 text-purple-600 mb-0">
            <i className="fas fa-graduation-cap text-red-500 fa-fw" />
          </span>
          <div className="ms-4">
            <div className="flex">
              <h5 className="mb-0 font-bold text-xl">555</h5>
            </div>
            <p className="mb-0 text-sm text-gray-600">Total Students</p>
          </div>
        </div>
      </div>

      {/* Counter item */}
      <div className="sm:w-1/2 lg:w-1/3 mb-3 mb-lg-0">
        <div className="flex justify-center items-center p-4 bg-green-100 rounded-3xl">
          <span className="display-6 text-green-600 mb-0">
            <i className="fas fa-dollar-sign fa-fw" />
          </span>
          <div className="ms-4">
            <div className="flex">
              <h5 className="mb-0 font-bold text-xl">555</h5>
            </div>
            <p className="mb-0 text-sm text-gray-600">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Card for courses */}
      <div className="card mb-4 border rounded-lg shadow-sm mt-2 p-2">
        <div className="card-header p-4 bg-gray-100">
          <h3 className="mb-0 text-xl font-semibold">Notes</h3>
          <span className="text-sm text-gray-600">
            Manage your Notes from here, search, view, edit or delete Notes.
          </span>
        </div>
        <div className="card-body p-4">
          <form className="row gx-3">
            <div className="col-12 mb-2">
              <input
                type="search"
                className="form-control p-2 border rounded-lg w-full"
                placeholder="Search Your Courses"
              />
            </div>
          </form>
        </div>
        <div className="table-responsive overflow-y-hidden p-4">
          <table className="table mb-0 text-nowrap table-hover table-centered w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Courses</th>
                <th className="px-4 py-2">Enrolled</th>
                <th className="px-4 py-2">Level</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date Created</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div>
                      <a href="#">
                        <img
                          src=""
                          alt="course"
                          className="rounded-full w-24 h-16 object-cover"
                        />
                      </a>
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-1 text-sm font-semibold">
                        <a href="#" className="text-gray-900">
                          Nice
                        </a>
                      </h4>
                      <ul className="list-inline text-sm mb-0">
                        <li className="list-inline-item">
                          <small>
                            <i className="fas fa-user"></i>
                            <span className="ms-1">Language</span>
                          </small>
                        </li>
                        <li className="list-inline-item">
                          <small>
                            <i className="bi bi-reception-4"></i>
                            <span className="ms-1">Level</span>
                          </small>
                        </li>
                        <li className="list-inline-item">
                          <small>
                            <i className="fas fa-dollar-sign"></i>
                            <span>Price</span>
                          </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4"><p className="mt-3">Total</p></td>
                <td className="py-4 px-4">
                  <p className="mt-3 badge bg-green-500 text-white rounded-full px-2">Level</p>
                </td>
                <td className="py-4 px-4">
                  <p className="mt-3 badge bg-yellow-500 text-black rounded-full px-2">Intermediate</p>
                </td>
                <td className="py-4 px-4"><p className="mt-3">Date</p></td>
                <td className="py-4 px-4">
                  <button className="btn btn-primary btn-sm mt-3 me-1 bg-blue-500 text-white px-3 py-1 rounded-md">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger btn-sm mt-3 me-1 bg-red-500 text-white px-3 py-1 rounded-md">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-secondary btn-sm mt-3 me-1 bg-gray-500 text-white px-3 py-1 rounded-md">
                    <i className="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Stats
