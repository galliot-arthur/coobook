import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isConnected } from '../services/authSlice';

export default function PrivateRoute({ path, component }) {
    const connected = useSelector(isConnected)

    if (!connected) toast.info('Merci de vous connecter.')
    return connected ?
        <Route path={path} component={component} />
        :
        <Redirect to='/login' />
}
