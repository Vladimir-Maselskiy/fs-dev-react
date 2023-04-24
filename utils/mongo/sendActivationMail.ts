import { Html } from 'next/document';
import { getMailTransport } from './getMailTranport';

export const sendActivationMail = async (to: string, link: string) => {
  const transport = getMailTransport();
  await transport.sendMail({
    from: `FS-Dev <${process.env.SMTP_USER}>`,
    to,
    subject: 'Account confirm',
    text: '',
    html: `
            <div>
                <h1> Confirm email </h1>
                <a href="${link}">${link}</a>
            </div>
        `,
  });
};
