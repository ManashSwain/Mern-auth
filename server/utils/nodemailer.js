import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASSWORD,
//       method : 'PLAIN'
//     },
//   });

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,   // Use environment variable for user
      pass: process.env.SMTP_PASSWORD,  // Use environment variable for password
      method: 'PLAIN',  // Ensure method is correct
    },
  });

  export default transporter 