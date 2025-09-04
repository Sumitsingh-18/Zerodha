// turns "9876543210" -> "+919876543210", "+91 98765 43210" -> "+919876543210"
function normalizeToE164India(raw) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 10) return "+91" + digits;
  if (digits.length === 12 && digits.startsWith("91")) return "+" + digits;
  if (digits.length === 11 && digits.startsWith("0")) return "+91" + digits.slice(1);
  if (digits.startsWith("+" )) return raw.replace(/\s+/g, "");
  throw new Error("Invalid Indian mobile number");
}
module.exports = { normalizeToE164India };
