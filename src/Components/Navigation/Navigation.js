import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
// import { auth } from '../../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
import CategoryIcon from '@mui/icons-material/Category';
// import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Navigation.css';

function Navigation() {
    const [click, setClick] = useState(false);

    const history = useHistory();
    // const [user] = useAuthState(auth);

    const { currentUser, logout } = useAuth();

    const handleClick = () => {
        setClick(!click);
    }

    async function handleLogout() {

        try {
            await logout();
            history.push('/login');
        } catch {
            alert('Failed to logout!');
        }
    }

    return (
        <>
            {
                currentUser &&
                <nav className='NavbarItems'>
                    <NavLink to='/' className='navbar-logHead' >
                        <img src={Logo} alt="Grocery App Logo" />
                        <h1 className='navbar-logo'>Grocery App</h1>
                    </NavLink>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} style={{ color: 'white' }}></i>
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        {/* <li key={0} onClick={() => setClick(false)}>
                            <NavLink exact to='/' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-home' style={{ marginRight: '8px' }}></i>
                                Dahboard
                            </NavLink>
                        </li> */}
                        <li key={0} onClick={() => setClick(false)}>
                            <NavLink exact to='/' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-image' style={{ marginRight: '8px' }}></i>
                                Baners
                            </NavLink>
                        </li>
                        <li key={1} onClick={() => setClick(false)}>
                            <NavLink exact to='/vendor' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-users' style={{ marginRight: '8px' }}></i>
                                Vendor
                            </NavLink>
                        </li>
                        <li key={2} onClick={() => setClick(false)}>
                            <NavLink exact to='/deliveryBoy' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-truck' style={{ marginRight: '8px' }}></i>
                                Delivery Boy
                            </NavLink>
                        </li>
                        <li key={3} onClick={() => setClick(false)}>
                            <NavLink exact to='/categories' className='navb-links' activeClassName='navb-newlinks' >
                                <CategoryIcon style={{ marginRight: '8px' }} />
                                Categories
                            </NavLink>
                        </li>
                        {/* <li key={5} onClick={() => setClick(false)}>
                            <NavLink exact to='/orders' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-shopping-cart' style={{ marginRight: '8px' }}></i>
                                Orders
                            </NavLink>
                        </li> */}
                        {/* <li key={6} onClick={() => setClick(false)}>
                            <NavLink exact to='/notification' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='far fa-bell' style={{ marginRight: '8px' }}></i>
                                Send Notification
                            </NavLink>
                        </li> */}
                        {/* <li key={7} onClick={() => setClick(false)}>
                            <NavLink exact to='/admin' className='navb-links' activeClassName='navb-newlinks' >
                                <i className='fas fa-user' style={{ marginRight: '8px' }}></i>
                                Admin Users
                            </NavLink>
                        </li> */}
                        {/* <li key={8} onClick={() => setClick(false)}>
                            <NavLink exact to='/settings' className='navb-links' activeClassName='navb-newlinks' >
                                <SettingsIcon style={{ marginRight: '8px' }} />
                                Settings
                            </NavLink>
                        </li> */}
                        <li key={4} onClick={() => setClick(false)}>
                            <div className='navb-links' onClick={handleLogout} style={{ cursor: 'pointer' }} >
                                <ExitToAppIcon style={{ marginRight: '8px' }} />
                                Exit
                            </div>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}

export default Navigation
