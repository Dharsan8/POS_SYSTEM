
import './App.css'
import Dashboard from './assets/components/Dashboard'
import HomePage from './assets/components/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {


  return (
<Router>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>
</Router>
  )
}

export default App
