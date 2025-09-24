import './App.css'
import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'

function App() {

  return (
    <Routes>
      <Route 
        path="/"
        element={<HomePage />}
      />
      <Route 
        path="/checkout"
        element={<h1>Checkout Page</h1>}
      ></Route>
    </Routes>
  )
}

export default App
