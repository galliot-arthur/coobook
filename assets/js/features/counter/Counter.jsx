import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './couterSlide'

export default function Counter() {

    const count = useSelector((state) => state.counter.toto)

    const dispatch = useDispatch()

    return (
        <div>
            <button
                className="btn btn-dark m-2"
                aria-label="Incrémenter"
                onClick={() => dispatch(increment())}
            >
                +1
            </button>

            <span>
                {count}
            </span>

            <button
                className="btn btn-dark m-2"
                aria-label="Incrémenter"
                onClick={() => dispatch(decrement())}
            >
                -1
            </button>
        </div>
    )
}
