import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import FeedContext from '../../context/FeedContext'
import { useFeed } from '../../hooks/feedReducer'
import API from '../../services/API'
import { TrashIcons } from '../../ui/Icons'

export default function DeleteButton({ id, history, onDelete }) {

    const { fetchFeed, deleteItem } = useFeed()
    const { feedCxt, setFeed } = useContext(FeedContext)

    /* HANDLE DELETE */
    const handleDelete = async () => {
        try {
            await deleteItem(id)
            setFeed(feedCxt.filter(e => e.id !== id))
            onDelete(id)
            toast.info('Cette recette à bien été supprimée')
            history.replace('/')
        } catch (e) {
            console.log(e)
            toast.warning('Erreur, merci de réessayer.')
        }
    }

    return (
        <button onClick={handleDelete} className="dropdown-item">
            Supprimer
            <span className="text-muted ms-2">
                <TrashIcons />
            </span>
        </button>
    )
}
