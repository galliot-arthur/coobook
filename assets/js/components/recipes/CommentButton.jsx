import React from 'react'
import { CommentIcon } from '../../ui/Icons'

export default function CommentButton({ onClick, text = null }) {

    return (
        <button onClick={onClick}>
            <CommentIcon size={22} />{text && <span className="text-decoration-underline ms-2">{text}</span>}
        </button>
    )
}
