import moment from 'moment'
import React from 'react'
import { InfoIcons, UserIcons } from '../../ui/Icons'

export default function Comments({ recipe }) {
    const formatDate = str => moment(str).locale('fr').fromNow(true)
    return (
        <div>
            <h3>Commentaires :</h3>
            {recipe.comments.length == 0 &&
                <div className="my-2">
                    <InfoIcons /> Soyer le premier à commenter cette recette !
                </div>
            }
            {recipe.comments.map(comment =>
                <div className="my-2" key={comment.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-muted d-block">
                            <UserIcons />
                            {comment.user.firstName}</strong>
                        <div className="text-muted">il y a {formatDate(comment.createdAt)}</div>
                    </div>
                    {comment.content}
                </div>
            )}
        </div>
    )
}
