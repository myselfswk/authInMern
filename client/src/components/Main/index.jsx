import React from 'react';
import { Link } from 'react-router-dom'
import Particle from '../Particle';

import style from './style.module.css';

const Main = () => {
    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className={style.main_container}>
            <div className={style.navbar}>
                <h1>Mern Auth App</h1>
                <div>
                    <Link to={'/qrcode'}><button className={style.white_btn}>QR Code</button></Link>
                    <button className={style.white_btn} onClick={handleLogOut}>LogOut</button>
                </div>
            </div>
            <Particle />
            <div className={style.heading}>
                <h1>Auth App By Muhammad Waleed Khan</h1>
            </div>
        </div>
    )
}

export default Main;