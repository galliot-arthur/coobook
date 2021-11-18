import React from 'react'

export function Loader({ look = "d-flex justify-content-center align-items-center my-5" }) {
    return (
        <div className={look}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
