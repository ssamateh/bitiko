import { ReactElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = ({
  from,
  to,
  subject,
  template,
}: {
  from: string;
  to: string | string[];
  subject: string;
  template: ReactElement;
}) => resend.emails.send({ to, from, subject, react: template });
