import React from 'react'

export default function MessageButton() {
    const handleMessage = () => {
        alert(`Hey, j'ai encore un peu de travaille on dirait ! 😃`)
    }
    return (
        <button onClick={handleMessage} className="ms-1 btn btn-dark">
            Écrire
        </button>
    )
}
