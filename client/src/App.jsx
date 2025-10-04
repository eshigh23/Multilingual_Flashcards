
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AuthPage from './pages/authPage';
import CreateCard from './pages/CreateCard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateCard />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  )
}

export default App
