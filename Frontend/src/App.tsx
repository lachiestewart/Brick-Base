import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/SideBar'

const App = () => {
  return (
    <Router>
      <div className='flex flex-row'>
        <SideBar />
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/about' element={<div>About</div>} />
          <Route path='/dashboard' element={<div>Dashboard</div>} />
          <Route path='/collection' element={<div>Collection</div>} />
        </Routes>
      </div>

    </Router>
  )
}

export default App