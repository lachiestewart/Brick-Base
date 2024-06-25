import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/SideBar'
import DashBoard from './pages'

const App = () => {
  return (
    <Router>
      <div className='flex flex-row'>
        <SideBar />
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/about' element={<div>About</div>} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/collection' element={<div>Collection</div>} />
        </Routes>
      </div>

    </Router>
  )
}

export default App