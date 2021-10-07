import React from 'react'
import { Route, Redirect } from 'react-router';
// import { auth } from './firebase';
import { useAuth } from './Components/Context/AuthContext';
// import { useAuthState } from 'react-firebase-hooks/auth';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth();
    // const [user] = useAuthState(auth);

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect exact to='/login' />
            }}
        >
        </Route>
    )
}
