import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  process.env.APP_EMAIL || 'abdjaliltoumi77@gmail.com',
    pass: process.env.APP_PASSWORD || 'hykc xhpt ztjv qasa',
  },
});

const sendMailAbdjalil = async ({ name, lastName, phoneNumber, city, location, products, date }: any) => {
  try {
    await transporter.sendMail({
      from: 'abdjaliltoumi77@gmail.com',
      to: 'toumiabdjalil1@gmail.com',
      subject: 'New Order Received',
      html: `
        <h2 style="color:#2e7d32;">Nouvelle commande reçue ✅</h2>
        <p><strong>Client:</strong> ${name} ${lastName}</p>
        <p><strong>Téléphone:</strong> ${phoneNumber}</p>
        <p><strong>Ville:</strong> ${city}</p>
        <p><strong>Adresse:</strong> ${location}</p>
        <h3>Détails des produits:</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%;">
          <thead style="background:#f2f2f2;">
            <tr><th>Nom</th><th>Quantité</th><th>Catégorie</th><th>Prix</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${products.map((element: any) => `
              <tr>
                <td>${element.name}</td>
                <td>${element.quantity}</td>
                <td>${element.cartegory}</td>
                <td>${element.price} MAD</td>
                <td>${element.price * element.quantity} MAD</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p><strong>Date de la commande:</strong> ${date}</p>
        <p style="color:#555;">Merci pour votre confiance 🙏</p>
      `,
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendMailZakaria = async ({ name, lastName, phoneNumber, city, location, products, date }: any) => {
  try {
    await transporter.sendMail({
      from: 'abdjaliltoumi77@gmail.com',
      to: 'zakariaoutalat1242@gmail.com',
      subject: 'New Order Received',
      html: `
        <h2 style="color:#2e7d32;">Nouvelle commande reçue ✅</h2>
        <p><strong>Client:</strong> ${name} ${lastName}</p>
        <p><strong>Téléphone:</strong> ${phoneNumber}</p>
        <p><strong>Ville:</strong> ${city}</p>
        <p><strong>Adresse:</strong> ${location}</p>
        <h3>Détails des produits:</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%;">
          <thead style="background:#f2f2f2;">
            <tr><th>Nom</th><th>Quantité</th><th>Catégorie</th><th>Prix</th><th>Total</th></tr>
          </thead>
          <tbody>
            ${products.map((element: any) => `
              <tr>
                <td>${element.name}</td>
                <td>${element.quantity}</td>
                <td>${element.cartegory}</td>
                <td>${element.price} MAD</td>
                <td>${element.price * element.quantity} MAD</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p><strong>Date de la commande:</strong> ${date}</p>
        <p style="color:#555;">Merci pour votre confiance 🙏</p>
      `,
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export async function POST(req: NextRequest) {
  const dataUser = await req.json();
  console.log(dataUser);
  await sendMailAbdjalil(dataUser);
  await sendMailZakaria(dataUser);
  return NextResponse.json(
    `Votre été bien enregistrer, et Merci pour votre confience ${dataUser.name + ' ' + dataUser.lastName}`
  );
}
