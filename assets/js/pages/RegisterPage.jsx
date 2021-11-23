import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Field from '../components/forms/Field'
import AuthContext from '../context/AuthContext'
import authAPI from '../services/authAPI'
import { Loader } from '../ui/Loader'

export default function RegisterPage({ history }) {
    const { connected, setConnected } = useContext(AuthContext)
    if (connected) history.push('/')
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /* HANDLE FIELDS */
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setUser({ ...user, [name]: value })
    }

    /* HANDLE SUBMIT */
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await authAPI.register(user)
            setError(null)
            setLoading(false)
            toast.info('Inscription réussie. Merci de vous connecter.')
            history.replace('/login')
        } catch (e) {
            const { violations } = e.response.data
            if (violations) {
                violations.forEach(violation => {
                    APIErrors[violation.propertyPath] = violation.message
                })
                setError(APIErrors)
                setLoading(false)
            }
        }

    }
    return (
        <>
            <h1 className="display-4">Inscription</h1>
            <p className="lead">Bienvenue sur CooBook</p>
            <hr className="my-4" />
            <div className=" w-lg-20 w-sm-50">
                {
                    loading ?
                        <Loader look="d-flex justify-content-center my-5" />
                        :
                        <form onSubmit={handleSubmit} className="form-group">
                            <p>Merci de saisir vos données.</p>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <Field name="firstName" label="Nom d'utilisateur" value={user.firstName} onChange={handleChange} placeholder="cooBook92" type="text" minLength="2" />
                            <Field name="lastName" label="Nom complet" value={user.lastName} onChange={handleChange} placeholder="CooBook Official Account" type="text" minLength="2" />
                            <Field name="email" label="Email" value={user.email} onChange={handleChange} placeholder="contact@coobook.com" type="email" minLength="4" />
                            <Field name="password" label="Mot de passe" value={user.password} onChange={handleChange} placeholder="votre-mot2passe" type="password" minLength="8" />

                            <div className="form-group mt-3">
                                <button className={"btn btn-danger " + (loading && "disabled")}>
                                    Inscription
                                </button>
                                <NavLink to="/login" className="link-danger text-decoration-none ms-4">Déja membre ?</NavLink>
                            </div>
                        </form>
                }
            </div>
        </>
    )
}
