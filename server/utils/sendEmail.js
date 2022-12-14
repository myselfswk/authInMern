const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        //create transporter to send email
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        });

        //send email method
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log("Email Sent Successfully...");

    } catch (error) {
        console.log("Email Not Sent", error);
        return error;
    }
}