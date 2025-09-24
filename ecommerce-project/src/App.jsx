import './App.css'
import { HomePage } from './pages/HomePage'
import { Routes, Route } from 'react-router'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {

  return (
    <Routes>
      <Route 
        path="/"
        element={<HomePage />}
      />
      <Route 
        path="/checkout"
        element={<CheckoutPage />}
      ></Route>
    </Routes>
  )
}

export default App
