function sendEmail( email, first, last, date, time, location, changed ){
  console.log('Mail was sent');
  var nodemailer = require('nodemailer');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://recruitingapp427@gmail.com:AEXP65219!@smtp.gmail.com');
    var newDate = new Date(date).toDateString();
  // setup e-mail data
  var content;
  var subj;
  if( date === null || time === null || location === null ){
    content =
            `<p>
            Hello, ${first} ${last}:<br><br>
            This message was delivered to ${email}.<br><br>
            Your appointment may have been removed or changed. If it was changed you will receive a new confirmation soon.<br>
            Please contact your recruiter if you have any concerns.<br><br>
            Best,<br>
            Amex Recruiting Team
            </p>`;
    subj = 'AMEX Interview changed';
  }
  else if( changed ){
    content =
            `<p>
            Hello, ${first} ${last}:<br><br>
            This message was delivered to ${email}.<br>
            Your first round interview had been rescheduled. Your new interview is scheduled for ${newDate} at ${time}.<br>
            It will be located in ${location}.<br><br>
            Best,<br>
            Amex Recruiting Team
            </p>`;
    subj = 'AMEX Interview changed';
  }
  else{
    content =
            `
            <h4 align="center">American Express Technology</h4>
            <h4 align="center">Software Engineer</h4>
            <h4 align="center">Interviews</h4>
            <p>
            Hello, ${first} ${last}
            </p>
            <br>
            This message was delivered to ${email}.<br><br>
            <div>Congratulations on being selected for 1st round summer intern
            interviews with American Express Technology!<br><br></div>
            <div>1st Round interviews will be conducted in the CSE building.<br><br></div>
            <div>The session will be 60 minutes total, in which you will meet two American Express Technology interviewers for two 30
            minute back to back interviews.
              <ul>
                <li>The format of the interviews will be behavioral, situational, and technical.</li>
                <li>Please bring 2 copies of your resume.</li>
              </ul>
            </div>
            <div>
              As a reminder, American Express Campus Recruitment has a two
              round interview process. Should you be selected for 2nd round
              interviews, these will be held in our office.<br><br>
            </div>
            <div>
            Your first round interview is scheduled for ${newDate} at ${time}.<br>
            It will be located in ${location}.<br><br>
            </div>
            <div><strong>
            In order to participate in interviews, you must apply to the Campus
            – 2016 Technology Software Engineer Intern posting.  Please go the following.
            </strong></div>
            <a href="https://jobs.americanexpress.com/jobs/16008940/Fort-Lauderdale-FLORIDA-Software-Engineer?lang=en-US">Intern</a>
            <br>
            <a href="https://jobs.americanexpress.com/jobs/16008940/Fort-Lauderdale-FLORIDA-Software-Engineer?lang=en-US">Full time</a>
            <br><br>
            Best,<br>
            Amex Recruiting Team
            `;
    subj = 'American Express Email Confirmation';
  }
  var mailOptions = {
      from: 'recruitingapp427@gmail.com' , // sender address
      to: 'recruitingapp427@gmail.com', // list of receivers
      subject: subj, // Subject line
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
