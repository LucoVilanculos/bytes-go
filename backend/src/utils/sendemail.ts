import  nodemailer  from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  html: string
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL, 
      pass: process.env.SMTP_PASS   
    }
  })

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    html
  }

  await transporter.sendMail(mailOptions)
}
