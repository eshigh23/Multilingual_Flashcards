
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';
import DeckPage from './pages/DeckPage';
import Layout from './components/Layout';
import Welcome from './components/Welcome';



function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/deck/:deckId" element={<DeckPage />} />
        </Route> 
      </Routes>
    </Router>
  )
}

export default App
