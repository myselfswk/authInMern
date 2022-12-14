import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Success from "../../images/success.png";

import styles from './style.module.css';

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${params.id}/verify/${params.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        }

        //Call Function
        verifyEmailUrl();
    }, [params])


    return (
        <Fragment>
            {
                validUrl ? (
                    <div className={styles.container}>
                        <img src={Success} alt="Success" className={styles.success_img} />
                        <h1>Email Verified Successfully</h1>
                        <Link to="/login">
                            <button className={styles.green_btn}>Login</button>
                        </Link>
                    </div>
                ) : (
                    <h1>404 Not Found</h1>
                )
            }
        </Fragment>
    )
}

export default EmailVerify;