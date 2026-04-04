const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create a transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
        ? process.env.EMAIL_PASS.replace(/\s/g, "")
        : "",
    },
  });

  // 2. Define email options
  const mailOptions = {
    from: `"Mindset App" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
