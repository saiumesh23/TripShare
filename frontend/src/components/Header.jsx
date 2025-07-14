import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search-trip">SearchTrip</Link>
        <Link to="/share-experience">ShareExperience</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;