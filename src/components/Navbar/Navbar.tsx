import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
    return <nav className={s.nav} >
        <div className={s.item}>
            <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
        </div>
        <div className={s.item}>
            <a  href='1'>News</a>
        </div>
        <div className={s.item}>
            <a  href='1'>Music</a>
        </div>
        <div className={s.item}>
            <a href='1'>Settings</a>
        </div>
    </nav>
}

export default Navbar;