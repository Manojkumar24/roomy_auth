var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roomyking777@gmail.com',
        pass: 'roommate777'
    }
});

function send_mail(body, to_email) {

    mailOptions = {
        from: 'roomyking777@gmail.com',
        to: to_email,
        subject: "Please confirm your Email account",
        html: body
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

function send_verification_token(to_email) {
    link = "http://localhost:5000" + `/api/users/verify/profile/${to_email}`;
    const body = "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    send_mail(body, to_email)

}

module.exports = { send_mail, send_verification_token }
