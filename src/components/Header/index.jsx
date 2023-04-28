import './index.css';
import Toggle from '../Toggle';
import Button from '../Button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header style={{ backgroundImage: "url(/img/background.svg)" }}>
            <Link to="/">
                <img className='logo' src="/img/logo.svg" alt="devjobs' logo" />
            </Link>
            <Toggle />
            {location.pathname !== '/create' && (
                <div className="btn-container adminCreate">
                    <Link to="/create">
                        <Button value="Create offer" />
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Header;