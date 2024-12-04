import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="bg-bgPrimary min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="flex-grow">
          <Outlet />
        </div>
        {/* <Footer className="mt-auto" /> */}
      </div>
    </>
  )
}

export default App
