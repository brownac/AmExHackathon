var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://recruitingapp427@gmail.com:AEXP65219!@smtp.gmail.com');

// input variables
var name = "Brandong";
var email = "recruitingapp427@gmail.com";
var time = "\nNEVER BECAUSE YOU SUCK\n";

// setup e-mail data with unicode symbols
var mailOptions = {
    from: email , // sender address
    to: email, // list of receivers
    subject: `AMEX Interview`, // Subject line
    generateTextFromHTML: true,
    html: `<p>
            Hello, ${name}<br><br>
            This message was delivered to ${email}.<br>
            Your second round interview is scheduled for ${time}.<br><br>
            Best,<br>
            Amex Recruiting Team
            </p>`
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
