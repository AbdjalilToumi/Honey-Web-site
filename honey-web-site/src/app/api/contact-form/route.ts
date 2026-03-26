import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user:  process.env.APP_EMAIL || 'abdjaliltoumi77@gmail.com',
      pass: process.env.APP_PASSWORD || 'hykc xhpt ztjv qasa',
  },
});

const emailHtml = (name: string, email: string, subject: string, message: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333333; }
    .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header { background-color: #facc15; padding: 30px; text-align: center; color: #ffffff; border-bottom: 4px solid #f59e0b; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
    .content { padding: 30px; }
    .content h2 { font-size: 24px; font-weight: 600; margin-top: 0; margin-bottom: 20px; color: #1a202c; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .details-table th, .details-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .details-table th { background-color: #f8f8f8; font-weight: 600; color: #4a5568; width: 30%; }
    .details-table td { color: #4a5568; }
    .button-container { text-align: center; margin-top: 30px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #facc15; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #a0a0a0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header"><h1>Nouvelle Commande Reçue ! 🍯</h1></div>
    <div class="content">
      <h2>Détails du message :</h2>
      <table class="details-table">
        <tr><th>Nom:</th><td>${name}</td></tr>
        <tr><th>Email:</th><td>${email}</td></tr>
        <tr><th>Sujet:</th><td>${subject}</td></tr>
      </table>
      <h3>Message :</h3>
      <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
      <div class="button-container">
        <a href="mailto:${email}" class="button">Répondre au client</a>
      </div>
    </div>
    <div class="footer">Ceci est une notification automatique.</div>
  </div>
</body>
</html>
`;

const sendContactMailAbdjalil = async ({ name, email, subject, message }: { name: string; email: string; subject: string; message: string }) => {
  try {
    await transporter.sendMail({
      from: 'abdjaliltoumi77@gmail.com',
      to: 'toumiabdjalil1@gmail.com',
      subject: 'Utilisateur Message from IFRAINE MIEL',
      html: emailHtml(name, email, subject, message),
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendContactMailZakaria = async ({ name, email, subject, message }: { name: string; email: string; subject: string; message: string }) => {
  try {
    await transporter.sendMail({
      from: 'abdjaliltoumi77@gmail.com',
      to: 'zakariaoutalat1242@gmail.com',
      subject: 'Utilisateur Message from IFRAINE MIEL',
      html: emailHtml(name, email, subject, message),
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export async function POST(req: NextRequest) {
  const dataContact = await req.json();
  await sendContactMailAbdjalil(dataContact);
  await sendContactMailZakaria(dataContact);
  return NextResponse.json(
    `Votre ${dataContact.name ? dataContact.name : ''} message a été envoyé avec succès. ✅`
  );
}
