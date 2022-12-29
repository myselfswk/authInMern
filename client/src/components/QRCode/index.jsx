import React, { useState } from 'react';
import QRCode from "react-qr-code";
import Particle from '../Particle';

import style from './style.module.css'

const QRCodeGenerator = () => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={style.container}>
            <Particle />
            <h1>QR Code Generator with Text</h1>
            <div className={style.qr_div}><QRCode value={text} /></div>

            <div className={style.input_div}>
                <p>Enter your text to generate QR Code</p>
                <input
                    type="text"
                    placeholder="QR Code..."
                    value={text} onChange={(e) => handleChange(e)}
                    className={style.input_tag}
                />
            </div>
            {text ? <div className={style.input_div}>{text}</div> : ""}
        </div>
    )
}

export default QRCodeGenerator;