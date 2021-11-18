import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext'

export default function PrivateRoute({ path, component }) {
    const { connected } = useContext(AuthContext)

    if (!connected) toast.info('Merci de vous connecter.')
    return connected ?
        <Route path={path} component={component} />
        :
        <Redirect to='/login' />
}
