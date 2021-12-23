import React from 'react'

export default function CenterContainer({ children }) {
    return (
        <div look="d-flex justify-content-center mt-3">
            {children}
        </div>
    )
}
