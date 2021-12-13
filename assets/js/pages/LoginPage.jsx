import React, { useContext, useEffect, useState } from 'react'
import { Loader } from '../ui/Loader'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'
import { authLogin, isConnected } from '../services/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function LoginPage({ history }) {
    const { connected } = useSelector(isConnected)
    useEffect(() => {
        if (connected) history.replace('/')
    })

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /* HANDLE FIELDS */
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value })
    }

    const dispatch = useDispatch()
    /* HANDLE SUBMIT */
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        dispatch(authLogin(credentials)).then(result => {
            if (!connected) {
                setError('Identifiant ou mot de passe invalide.')
                setLoading(false)
            } else if (connected) {
                setError(null)
                setLoading(false)
                toast.info('Bienvenue ' + window.localStorage.getItem('authToken') + '.')
                history.push('/')
            }
        })
    }
    return (
        <>
            <h1 className="display-4">Connexion</h1>
            <p className="lead">Merci de saisir vos identiants</p>
            <hr className="my-4" />
            {
                loading ?
                    <Loader />
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <form onSubmit={handleSubmit} className="form-group d-flex flex-column">

                            {error && <div className="text-danger">{error}</div>}

                            <Field name="username" label="Email" value={credentials.username} onChange={handleChange} placeholder="vous@email.fr" type="email" />
                            <Field name="password" label="Mot de passe" value={credentials.password} onChange={handleChange} placeholder="password123" type="password" />

                            <div className="mt-3 mx-auto">
                                <button className={"btn btn-danger " + (loading && "disabled")}>
                                    Connexion
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}
