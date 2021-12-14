import React from 'react'
import { GitHubIcon, LinkedInIcon } from '../../ui/Icons'

export default function Contact() {
    return (
        <div className='fade-left'>
            <h1 className="display-4">Contact</h1>
            <hr className="my-4" />
            {/* THEN */}
            <div className="d-flex flex-column justify-content-center align-items-center">
                <a className="lead link-dark text-decoration-none" target="_blank" href="https://www.linkedin.com/in/arthur-galliot-webdev/"><LinkedInIcon size={24} /> LinkedIn</a><br />
                <a className="lead link-dark text-decoration-none" target="_blank" href="https://github.com/galliot-arthur"><GitHubIcon size={24} /> GitHub</a><br />
                <a className="lead link-dark text-decoration-none" target="_blank" href="https://www.arthur-galliot.com">www.arthur-galliot.com</a>
            </div>
        </div>
    )
}
