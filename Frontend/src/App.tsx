import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SideBar } from "./components"
import { DashBoard, Home, Collection, NoNoPage, MyCollections, NewCollection, Search } from "./pages"

const App = () => {
  return (
    <Router>
      <div className="flex flex-row h-screen">
        <SideBar />
        <div className="w-full h-full overflow-scroll flex flex-col items-center py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/collections" element={<MyCollections />} />
            <Route path="/collection/new" element={<NewCollection />} />
            <Route path="/collection/:id" element={<Collection />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NoNoPage />} />
          </Routes>
        </div>
      </div>

    </Router>
  )
}

export { App }