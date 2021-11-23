import React, { useState } from 'react'

export default function useModal() {
    const [display, setDisplay] = useState(false)

    const toggleDisplay = () => setDisplay(!display)

    return {
        display: display,
        toggleDisplay: toggleDisplay
    }
}