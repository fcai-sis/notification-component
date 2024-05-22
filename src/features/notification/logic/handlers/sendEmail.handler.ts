import { Request, Response } from "express";
import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "damn-thats-crazy",
});
const DOMAIN = process.env.MAILGUN_DOMAIN || "typescript shut up"; // STUPID NEED TO COPY FROM "How would you like to send emails from your domain?"

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
    from: `lol <postmaster@${DOMAIN}>`, // IDIOT NEEDS TO HAVE POSTMASTER BEFORE MAIL
    to: ["youssefgalalnazem@gmail.com"],
    subject: subject,
    text: text,
  };

  try {
    // Send email using Mailgun
    mg.messages.create(DOMAIN, data).then((msg) => {
      res.status(200).json({
        msg,
      });
    });
  } catch (error) {
    res.status(401).json("Error sending email");
  }
};
const sendEmailHandler = handler;
export default sendEmailHandler;
