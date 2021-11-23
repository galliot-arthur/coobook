import React from 'react'
import ReactDom from 'react-dom'
import useModal from '../services/useModal'
import { MinusIcons } from '../ui/Icons'

export default function Modal({ display, toggleDisplay, children = null }) {

    return display ?
        ReactDOM.createPortal(
            <>
                <div className="modal fade">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>TITLE</h4>
                            </div>
                            <div className="modal-body">
                                Body du truc
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </>,
            document.body
        )
        :
        null
}
