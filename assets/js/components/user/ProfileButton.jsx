import React from "react"
import { UserCircleIcons } from "../../ui/Icons"

export default function ProfileButton({ user }) {

  const currentUser = localStorage.getItem('authId')

  const IRI = user.id == currentUser
    ? "/mon-profil/"
    : "/profil/" + user.id

  return <div className="d-flex justify-content-center">
    <UserCircleIcons size='24' />
    <NavLink to={"/profil/" + user.id} className='me-1'>
      {user.firstName}
    </NavLink>
  </div>
}
