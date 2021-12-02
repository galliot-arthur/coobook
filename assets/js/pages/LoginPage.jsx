import React, { useContext, useState } from 'react'
import authAPI from '../services/authAPI'
import AuthContext from '../context/AuthContext'
import { Loader } from '../ui/Loader'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'

export default function LoginPage({ history }) {
    const { connected, setConnected } = useContext(AuthContext)
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

    /* HANDLE SUBMIT */
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await authAPI.authenticate(credentials)
            setError(null)
            setLoading(false)
            setConnected(true)
            toast.info('Bienvenue ' + window.localStorage.getItem('authToken') + '.')
            history.push('/')
        } catch (e) {
            setError('Identifiant ou mot de passe invalide.')
            setLoading(false)
        }
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

                            {error && <div className="alert alert-danger">{error}</div>}

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
