import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import Gallery1040 from './components/Gallery1040'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/1040" element={<Gallery1040 />} />
      </Routes>
    </Router>
  )
}

export default App
