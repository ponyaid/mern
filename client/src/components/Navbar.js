import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper red accent-2 pr-2 pl-2">
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/create">Создать</Link></li>
                    <li><Link to="/links">Ссылки</Link></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}