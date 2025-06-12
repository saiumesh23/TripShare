import {Link} from 'react-router-dom';


function Header(){
    <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/search-trip">SearchTrip</Link>
            <Link to="/share-experience">ShareExperience</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>

        </nav>
    </header>
}
export default Header;