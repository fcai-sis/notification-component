import env from "../../../../env";
import { Request, Response } from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: env.MAILGUN_API_KEY!,
});
const DOMAIN = env.MAILGUN_DOMAIN!;

type HandlerRequest = Request<
  {},
  {},
  {
    subject: string;
    text: string;
  }
>;

/**
 * Handler for sending an email notification using Mailgun
 */
const handler = async (req: HandlerRequest, res: Response) => {
  const { subject, text } = req.body;

  // Prepare email data
  const data = {
    from: `lol <postmaster@${DOMAIN}>`,
    to: ["youssefgalalnazem@gmail.com"],
    subject: subject,
    text: text,
  };

  try {
    // Send email using Mailgun
    mg.messages.create(DOMAIN, data).then((msg) => {
      console.log(msg);
      res.status(200).json({
        message: "Email sent successfully",
      });
    });
  } catch (error: any) {
    res.status(401).json({
      errors: [
        {
          message: "Failed to send email",
          reason: error.message,
        },
      ],
    });
  }
};
const sendEmailHandler = handler;
export default sendEmailHandler;
