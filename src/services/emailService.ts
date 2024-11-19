import sgMail from '@sendgrid/mail';
import axios from 'axios';

const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error('Missing SendGrid API Key');
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const emailService = { 
  async sendWelcomeEmail(to: string, username: string) {
    const msg = {
      to,
      from: 'tu-email@dominio.com', // Reemplaza con tu email verificado en SendGrid
      subject: '¡Bienvenido a CyberKids!',
      text: `Hola ${username}, ¡Bienvenido a CyberKids! Estamos emocionados de tenerte con nosotros.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>¡Bienvenido a CyberKids!</h1>
          <p>Hola ${username},</p>
          <p>Estamos emocionados de tenerte con nosotros. Comienza tu viaje de aprendizaje en ciberseguridad ahora:</p>
          <ul>
            <li>Explora nuestras lecciones interactivas</li>
            <li>Juega y aprende sobre seguridad</li>
            <li>Gana logros mientras aprendes</li>
          </ul>
          <p>¡Esperamos que disfrutes aprendiendo con nosotros!</p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const msg = {
      to,
      from: 'tu-email@dominio.com',
      subject: 'Restablecer contraseña - CyberKids',
      text: `Usa este enlace para restablecer tu contraseña: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Restablecer contraseña</h1>
          <p>Has solicitado restablecer tu contraseña. Usa el siguiente enlace:</p>
          <p>
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Restablecer Contraseña
            </a>
          </p>
          <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

// Export the api object for use in AuthContext.tsx
export const api = axios.create({
  baseURL: 'https://your-api-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
});