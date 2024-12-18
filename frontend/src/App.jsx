import { Outlet } from 'react-router-dom'
import Container from './components/Container'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      {/* <div className="bg-bgPrimary min-h-screen flex flex-col"> */}
      {/* <Navbar /> */}
      <Container>
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </ Container>
      {/* <Footer className="mt-auto" /> */}
      {/* </div> */}
    </>
  )
}

export default App
