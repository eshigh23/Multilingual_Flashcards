
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';
import CreateCard from './pages/CreateCard';
import DeckPage from './pages/DeckPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import Layout from './components/Layout';



function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/auth" element={<AuthPage />} />
        </Route> 
      </Routes>
    </Router>

    // <Router>
    //   {/* <Navbar /> */}
    //   <Routes>
    //     <Route path="/" element={<DashboardPage />} />
    //     <Route path="/auth" element={<AuthPage />} />
    //   </Routes>
    // </Router>
  )
}

export default App
