import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard/:name' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;