const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // You can also get additional user information from payload
    return payload;
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Error verifying Google token.");
  }
}

module.exports = { verifyGoogleToken };
