import React, { useState, useEffect } from 'react'
import './LoginScreen.css';
import Logo from '../../Assets/logo.png';
import { db } from '../../firebase';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

function LoginScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [nameerror, setNameError] = useState('');
    const [passworderror, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = db.collection('Admin').onSnapshot(snapshot => (
            setAdmins(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ));

        return () => {
            unsubscribe();
        };
    }, []);

    const logEnter = async () => {
        await login();
        history.push('/');
    }

    const loginUser = (userName, password) => {
        try {
            if (admins) {
                admins.forEach((admin, ind) => {
                    if (admin.data.username === userName) {
                        if (admin.data.password === password) {
                            setUserName('');
                            setPassword('');
                            setNameError('');
                            setPasswordError('');
                            setLoading(true);
                            logEnter();

                        } else {
                            setPasswordError('Incorrect Password!');
                            setNameError('');
                        }
                    } else {
                        setNameError('No such username exists!');

                    }
                });
            }
        } catch (error) {
            alert('Error logging in!');
        }

        setLoading(false);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userName && !password) {
            setNameError('This is a required field!');
            setPasswordError('This is a required field!');
        } else {
            if (!userName) {
                setNameError('This is a required field!');
            } else if (!password) {
                setPasswordError('This is a required field!');
            } else {
                loginUser(userName, password);
            }
        }
    }

    return (
        <div className='loginScreen'>
            {
                loading ? <CircularProgress /> :
                    <form className="loginScreen__form" onSubmit={handleSubmit} >
                        <img src={Logo} alt="logo" />
                        <h1 className='loginScreen__formHead' >GROCERY APP ADMIN</h1>
                        <TextField className='loginScreen__formInput' id="outlined-basic" label="Username" placeholder="Username" type='text' onChange={(e) => { setUserName(e.target.value) }} value={userName} helperText={nameerror ? nameerror : ''} error={nameerror ? true : false} />
                        <TextField className='loginScreen__formInput' id="outlined-textarea" label="Password" placeholder="Password" type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} helperText={passworderror ? passworderror : ''} error={passworderror ? true : false} />
                        <button className='loginScreen__formButton' type='submit' >
                            {
                                loading ? 'Loading...' : 'Login'
                            }
                        </button>
                    </form>
            }
        </div>
    )
}

export default LoginScreen
