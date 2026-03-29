import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { name, email, subject, message } = req.body;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "prachishoree@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New message from portfolio</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}