import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

export default function PrivateRoute ({ path, component }) {
    const {connected} = useContext(AuthContext)
    return connected ?
        <Route path={path} component={component} />
        :
        <Redirect to='/login' />
}
