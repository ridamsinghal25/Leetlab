import { resend } from "../resend.js";

export async function sendEmail(options) {
  try {
    await resend.emails.send({
      from: "LeetLab <support@leetlabs.tech>",
      to: [options.email],
      subject: options.subject,
      html: options.htmlContent,
      text: options.textContent,
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.log("Error occured while sending email: ", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
