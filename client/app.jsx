import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShareExperience from './pages/ShareExperience';
import ShareTrip from './pages/ShareTrip';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/share-trip" element={<ShareTrip/>}/>
      </Routes>
    </Router>
  );
}

export default App;
