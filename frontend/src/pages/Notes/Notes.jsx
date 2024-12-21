import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux';

function Notes() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>

      {/* ----------------------------- */}

      <div className="col-12" >
        <div className="row mb-4">
          <h4 className="mb-2 mt-1 text-xl font-semibold">
            <i className='bi bi-grid-fill'></i> Courses
          </h4>
        </div>
        <div className="card mb-4 border rounded-lg shadow-sm">
          <div className="card-header px-4 py-2 bg-gray-100">
            <span className="text-sm text-gray-600">
              Manage your courses from here, search, view, edit or delete courses.
            </span>
          </div>
          <div className="card-body px-4 py-3">
            <form className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="search"
                  className="p-2 border rounded-lg w-full"
                  placeholder="Search Your Courses"
                />
              </div>
            </form>
          </div>
          <div className="table-responsive overflow-y-hidden px-4 py-3">
            <table className="table mb-0 table-hover table-centered text-nowrap w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-4">Courses</th>
                  <th className="py-2 px-4">Enrolled</th>
                  <th className="py-2 px-4">Level</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date Created</th>
                  <th className="py-2 px-4">Action</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div>
                        <a href="#">
                          <img
                            src="https://geeksui.codescandy.com/geeks/assets/images/course/course-python.jpg"
                            alt="course"
                            className="rounded-full w-24 h-16 object-cover"
                          />
                        </a>
                      </div>
                      <div className="ms-3">
                        <h4 className="mb-1 text-sm font-semibold">
                          <a href="#" className="text-gray-900">
                            Create a Website with WordPress
                          </a>
                        </h4>
                        <ul className="list-inline text-sm mb-0">
                          <li className="list-inline-item">
                            <small><i className='bi bi-clock-history'></i>
                              <span className='ms-1'>1hr 30 Mins</span>
                            </small>
                          </li>
                          <li className="list-inline-item">
                            <small>
                              <i className='bi bi-reception-4'></i>
                              <span className='ms-1'>Beginner</span>
                            </small>
                          </li>
                          <li className="list-inline-item">
                            <small>
                              <i className='fas fa-dollar-sign'></i>
                              <span>30.99</span>
                            </small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><p className='mt-3'>71</p></td>
                  <td className="py-4 px-4"><p className='mt-3 badge bg-green-500 text-white rounded-full px-2'>Intermediate</p></td>
                  <td className="py-4 px-4"><p className='mt-3 badge bg-yellow-500 text-black rounded-full px-2'>Intermediate</p></td>
                  <td className="py-4 px-4"><p className='mt-3'>07 Aug, 2025</p></td>
                  <td className="py-4 px-4">
                    <button className='btn btn-primary btn-sm mt-3 me-1 bg-blue-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-edit'></i>
                    </button>
                    <button className='btn btn-danger btn-sm mt-3 me-1 bg-red-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-trash'></i>
                    </button>
                    <button className='btn btn-secondary btn-sm mt-3 me-1 bg-gray-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-eye'></i>
                    </button>
                  </td>
                </tr>

                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div>
                        <a href="#">
                          <img
                            src="https://geeksui.codescandy.com/geeks/assets/images/course/course-react.jpg"
                            alt="course"
                            className="rounded-full w-24 h-16 object-cover"
                          />
                        </a>
                      </div>
                      <div className="ms-3">
                        <h4 className="mb-1 text-sm font-semibold">
                          <a href="#" className="text-gray-900">
                            Create a Website with WordPress
                          </a>
                        </h4>
                        <ul className="list-inline text-sm mb-0">
                          <li className="list-inline-item">
                            <small><i className='bi bi-clock-history'></i>
                              <span className='ms-1'>1hr 30 Mins</span>
                            </small>
                          </li>
                          <li className="list-inline-item">
                            <small>
                              <i className='bi bi-reception-4'></i>
                              <span className='ms-1'>Beginner</span>
                            </small>
                          </li>
                          <li className="list-inline-item">
                            <small>
                              <i className='fas fa-dollar-sign'></i>
                              <span>30.99</span>
                            </small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><p className='mt-3'>71</p></td>
                  <td className="py-4 px-4"><p className='mt-3 badge bg-green-500 text-white rounded-full px-2'>Intermediate</p></td>
                  <td className="py-4 px-4"><p className='mt-3 badge bg-yellow-500 text-black rounded-full px-2'>Intermediate</p></td>
                  <td className="py-4 px-4"><p className='mt-3'>07 Aug, 2025</p></td>
                  <td className="py-4 px-4">
                    <button className='btn btn-primary btn-sm mt-3 me-1 bg-blue-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-edit'></i>
                    </button>
                    <button className='btn btn-danger btn-sm mt-3 me-1 bg-red-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-trash'></i>
                    </button>
                    <button className='btn btn-secondary btn-sm mt-3 me-1 bg-gray-500 text-white px-3 py-1 rounded-md'>
                      <i className='fas fa-eye'></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>

    // {/* ------------------------------- */ }

  );
}

export default Notes;
