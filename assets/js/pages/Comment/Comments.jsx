import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Field from '../../components/forms/Field'
import { deleteComment, editComment, getCommentsByRecipe } from '../../services/commentSlice'
import { EditIcons, TrashIcons, UserIcons } from '../../ui/Icons'

let Comments = ({ recipe }) => {

    const comments = useSelector(state => getCommentsByRecipe(state, recipe.id))

    return <>
        <h4 className="text-muted">Commentaires :</h4>
        {comments.length < 1
            ? <div className="my-2">
                Soyer le premier à commenter cette recette !
            </div>
            : comments.map(comment => <Comment comment={comment} key={comment.id} />)
        }
    </>
}
export default Comments = React.memo(Comments)

const Comment = ({ comment }) => {
    const dispatch = useDispatch()
    const formatDate = str => moment(str).locale('fr').fromNow(true)
    const [editing, setEditing] = useState(false)
    const toggleEdit = () => setEditing(!editing)
    const [loading, setLoading] = useState(false)

    const [commentData, setCommentData] = useState({
        recipe: '/api/recipes/' + comment.recipeId,
        user: '/api/users/' + localStorage.getItem('authId'),
        content: comment.content,
    })

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCommentData({ ...commentData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(editComment({ id: comment.id, data: commentData, comment }))
        setLoading(false)
        setEditing(false)
    }

    const handleDelete = () => {
        dispatch(deleteComment(comment.id))
    }
    return (
        <>
            {!editing
                ?
                <div className="my-2" key={comment.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={"/profil/" + comment.user.id} className="text-muted d-block text-decoration-none">
                            <strong>
                                <UserIcons />
                                {comment.user.firstName}
                            </strong>
                        </NavLink>
                        <div className="text-muted">il y a {formatDate(comment.createdAt)}
                            {comment.user.id == localStorage.getItem("authId") &&
                                <>
                                    <button className='ms-1' onClick={toggleEdit}>
                                        <EditIcons />
                                    </button>
                                    <button className='ms-1' onClick={handleDelete}>
                                        <TrashIcons />
                                    </button>
                                </>
                            }</div>
                    </div>
                    <span className="fade-start">
                        {comment.content}
                    </span>
                </div>
                :
                <div className="my-2" key={comment.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={"/profil/" + comment.user.id} className="text-muted d-block text-decoration-none">
                            <strong>
                                <UserIcons />
                                {comment.user.firstName}
                            </strong>
                        </NavLink>
                        <div className="text-muted">il y a {formatDate(comment.createdAt)}
                            <button className='ms-1' onClick={toggleEdit}>
                                <EditIcons />
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='input-group my-2 fade-start'>
                        <Field name="content" value={commentData.content} onChange={handleChange} placeholder="Votre commentaire" />
                        <button type='submit' className='btn btn-primary' >Enregistrer</button>
                    </form>
                </div>
            }
        </>)
}