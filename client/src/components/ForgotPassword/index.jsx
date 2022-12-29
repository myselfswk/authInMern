import React, { useState } from 'react';
import axios from 'axios';

import style from './style.module.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/api/password-reset`;
            const { data } = await axios.post(url, { email });
            setMsg(data.message);
            setError("");

        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    }

    return (
        <div className={style.container}>
            <form className={style.form_container} onSubmit={handleSubmit}>
                <h1>Forget Password</h1>
                <input
                    type="email"
                    placeholder='Enter Your Email Address'
                    name='email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                    required
                    className={style.input}
                />

                {error && <div className={style.error_msg}>{error}</div>}
                {msg && <div className={style.success_msg}>{msg}</div>}
                <button type="submit" className={style.green_btn}>Submit</button>
            </form>
        </div>
    )
}

export default ForgetPassword;