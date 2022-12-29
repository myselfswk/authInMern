import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import style from './style.module.css';

const PasswordReset = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const param = useParams();

    const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError("");
            window.location.href = '/login';

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    }

    // check if url is valid by useEffect
    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        }

        // call function
        verifyUrl();
    }, [param, url]);

    return (
        <Fragment>
            {
                validUrl ? (
                    <div className={style.container}>
                        <form className={style.form_container} onSubmit={handleSubmit}>
                            <h1>Add New Password</h1>
                            <input
                                type="password"
                                placeholder='Enter Your New Password'
                                name='password'
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                                required
                                className={style.input}
                            />

                            {error && <div className={style.error_msg}>{error}</div>}
                            {msg && <div className={style.success_msg}>{msg}</div>}
                            <button type="submit" className={style.green_btn}>Submit</button>
                        </form>
                    </div>
                ) : (
                    <h1>404 Not Found</h1>
                )
            }
        </Fragment>
    )
}

export default PasswordReset;