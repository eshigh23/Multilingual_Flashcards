
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreateDeckPage from './pages/CreateDeckPage';
import DeckPage from './pages/DeckPage';
import GlobalLayout from './components/GlobalLayout';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import { UserProvider } from './context/UserContext';



function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<GlobalLayout />} >
            <Route element={<Layout />}>
                <Route path="/home" element={<Welcome />} />
                <Route path="/deck/:deckId" element={<DeckPage />} />
                <Route path="/deck/create" element={<CreateDeckPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Route> 
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
