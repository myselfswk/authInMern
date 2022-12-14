import React, { useState } from 'react';
// useNavigate
import { Link } from 'react-router-dom';
import axios from 'axios';

import style from './style.module.css';

const SignUp = () => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    // const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({
            ...data,
            [input.name]: input.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
            // navigate('/login');
            // console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={style.signup_container}>
            <div className={style.signup_form_container}>
                <div className={style.left}>
                    <h1>Welcome Back</h1>
                    <Link to={'/login'}>
                        <button type='button' className={style.white_btn}>Sign In</button>
                    </Link>
                </div>
                <div className={style.right}>
                    <form className={style.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder='Enter Your First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={style.input}
                        />
                        <input
                            type="text"
                            placeholder='Enter Your Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={style.input}
                        />
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

                        {error && <div className={style.error_msg}>{error}</div>}
                        {msg && <div className={style.success_msg}>{msg}</div>}

                        <button type="submit" className={style.green_btn}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;