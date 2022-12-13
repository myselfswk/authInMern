import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import style from './style.module.css';

const SignIn = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({
            ...data,
            [input.name]: input.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location.href = '/';
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={style.login_container}>
            <div className={style.login_form_container}>
                <div className={style.left}>
                    <form className={style.form_container} onSubmit={handleSubmit}>
                        <h1>Login To Your Account</h1>
                        <input
                            type="email"
                            placeholder='Enter Your Email Address'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={style.input}
                        />
                        <input
                            type="password"
                            placeholder='Enter Your Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={style.input}
                        />
                        <Link style={{ alignSelf: "flex-start" }}>
                            <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
                        </Link>
                        {
                            error && <div className={style.error_msg}>{error}</div>
                        }
                        <button type="submit" className={style.green_btn}>Sign In</button>
                    </form>
                </div>
                <div className={style.right}>
                    <h1>New Here</h1>
                    <Link to={'/signup'}>
                        <button type='button' className={style.white_btn}>Sign Up</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SignIn;