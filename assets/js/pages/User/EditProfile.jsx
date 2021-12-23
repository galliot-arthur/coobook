import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Field from '../../components/forms/Field'
import API from '../../services/API'
import { Loader } from '../../ui/Loader'

export default function EditProfile({ history }) {

    const [loading, setLoading] = useState(false)

    /* FETCH USER */
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        website: "",
        bio: "",
    })
    const fetchUser = async () => {
        try {
            const data = await API.get(window.localStorage.getItem('authId'), 'users')
            setUser({
                firstName: data.firstName,
                lastName: data.lastName,
                website: data.website,
                bio: data.bio,
            })
            setLoading(false)
        } catch (e) {
            setLoading(true)
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchUser()
    }, [])

    /* HANDLE FIELDS */
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            API.put(
                window.localStorage.getItem('authId'),
                user,
                'users'
            )
            toast.info('Votre profil a été modifié avec succès.')
            history.replace('/mes-recettes')
        } catch (i) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }
    return (
        <div className='fade-left'>
            {loading ?
                <Loader />
                :
                <>
                    <h1>Editer mon profil</h1>
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="firstName"
                            label="Nom d'utilisateur"
                            value={user.firstName}
                            onChange={handleChange}
                            placeholder="cooBook92"
                        />
                        <Field
                            name="lastName"
                            label="Nom complet"
                            value={user.lastName}
                            onChange={handleChange}
                            placeholder="CooBook Official Account"
                        />
                        <Field
                            name="website"
                            type="url"
                            label="Site Internet"
                            value={user.website}
                            onChange={handleChange}
                            placeholder="https://www.cookbook.com"
                            required={false}
                        />
                        <Field
                            name="bio"
                            label="Courte Bio"
                            value={user.bio}
                            onChange={handleChange}
                            placeholder="We love to cook, we love to share."
                            required={false}
                        />
                        <button className="btn btn-danger mt-2">
                            Enregistrer
                        </button>
                    </form>
                </>
            }
        </div>
    )
}
