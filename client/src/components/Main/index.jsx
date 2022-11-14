import React from 'react';

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
                <button className={style.white_btn} onClick={handleLogOut}>LogOut</button>
            </div>
        </div>
    )
}

export default Main;