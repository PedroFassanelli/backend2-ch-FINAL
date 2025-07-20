import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendRecoveryMail = async (to, link) => {
  await transporter.sendMail({
    from: `"Coder Ecommerce" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Recuperación de contraseña',
    html: `<p>Hacé clic en el siguiente enlace para restablecer tu contraseña. El enlace expira en 1 hora:</p>
           <a href="${link}">${link}</a>`
  });
};