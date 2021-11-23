import moment from 'moment'
import React from 'react'
import { UserIcons } from '../../ui/Icons'

export default function Comments({ recipe }) {
    const formatDate = str => moment(str).format('DD/MM/YYYY à HH:mm')
    return (
        <div>
            <h3>Commentaires :</h3>
            {recipe.comments.map(comment =>
                <div className="my-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-muted d-block">
                            <UserIcons />
                            {comment.user.firstName}</strong>
                        <div className="text-muted">le {formatDate(comment.createdAt)}</div>
                    </div>
                    {comment.content}
                </div>
            )}
        </div>
    )
}
