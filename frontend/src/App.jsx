import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ShareExperience from './pages/ShareExperience';
import SearchTrip from './pages/SearchTrip';
import Profile from './pages/Profile';
import ExperienceDetail from './pages/ExperienceDetail';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/share-experience" element={<ShareExperience />} />
        <Route path="/search-trip" element={<SearchTrip />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/experience/:id" element={<ExperienceDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
