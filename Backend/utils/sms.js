const twilio = require("twilio");

const enabled = String(process.env.TWILIO_ENABLED || "false") === "true";

let client = null;
if (enabled) {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

async function sendSms(to, message) {
  if (!enabled) {
    console.log(`[DEV SMS to ${to}] ${message}`);
    return { sid: "dev-sid" };
  }
  return client.messages.create({
    to,
    from: process.env.TWILIO_FROM_NUMBER,
    body: message,
  });
}

module.exports = { sendSms, enabled };
