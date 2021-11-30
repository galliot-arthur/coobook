import React from 'react'

export default function MessageButton() {
    const handleMessage = () => {
        alert("Cette fonctionnalité est encore cours de développement 😃")
    }
    return (
        <button onClick={handleMessage} className='ms-1 btn btn-dark'>
            Écrire
        </button>
    )
}
