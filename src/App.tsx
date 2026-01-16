import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'

const Gallery1040 = lazy(() => import('./components/Gallery1040'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="gallery-app">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/1040" element={<Gallery1040 />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
