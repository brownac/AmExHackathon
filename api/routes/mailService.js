var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/send', function(req, res, next){

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'recruitingapp427@gmail.com',
        pass: 'AEXP65219!'
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
      to: 'recruitingapp427@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
          res.redirect('/');
      } else {
          console.log('Message sent: ' + info.response);
          res.redirect('/');
      }
  });
});

module.exports = router;
