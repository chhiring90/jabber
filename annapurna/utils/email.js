const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Chhiring Tamang <${process.env.EMAIL_FROM}/>`;
    }

    newTransport() {
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            pool: true,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
        });
        return transport;
    }

    async send(template, subject) {
        // 1) Render the html based on pug Template
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject,
        });

        // 2) Define email options
        const mailOptions = {
            form: this.form,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        // 3) create new Transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to jabber.');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset token (valid for only 10 minutes)'
        );
    }
}