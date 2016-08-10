function sendEmail( email, first, last, date, time, location ){
  console.log('Mail was sent');
  var nodemailer = require('nodemailer');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://recruitingapp427@gmail.com:AEXP65219!@smtp.gmail.com');
    var newDate = new Date(date).toDateString();
  // setup e-mail data
  var content;
  if( date === null || time === null || location === null ){
    content =
            `<p>
            Hello, ${first} ${last}:<br><br>
            This message was delivered to ${email}.<br><br>
            Your appointment may have been removed or changed. If it was changed you will receive a new confirmation soon.<br>
            Please contact your recruiter if you have any concerns.<br><br>
            Best,<br>
            Amex Recruiting Team
            </p>`
  }
  else{
    content =
            `<p>
            Hello, ${first} ${last}:<br><br>
            This message was delivered to ${email}.<br>
            Your second round interview is scheduled for ${newDate} at ${time}.<br>
            It will be located in ${location}.<br><br>
            Best,<br>
            Amex Recruiting Team
            </p>`
  }
  var mailOptions = {
      from: 'recruitingapp427@gmail.com' , // sender address
      to: 'recruitingapp427@gmail.com', // list of receivers
      subject: `AMEX Interview`, // Subject line
      generateTextFromHTML: true,
      html: content
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log();
      console.log('Message sent: ' + info.response);
      console.log();
  });

}

module.exports = sendEmail;
