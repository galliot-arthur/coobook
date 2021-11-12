import React from 'react'

export function Loader({look}) {
    return (
        <div className={look}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
