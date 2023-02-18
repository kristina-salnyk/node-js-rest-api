const queryString = require("node:querystring");
const axios = require("axios");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const googleAuth = async (req, res) => {
  const {
    protocol,
    headers: { host },
  } = req;

  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${protocol}://${host}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  };

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${queryString.stringify(
      params
    )}`
  );
};

const googleRedirect = async (req, res) => {
  const {
    protocol,
    headers: { host },
    originalUrl,
  } = req;

  const fullUrl = `${protocol}://${host}${originalUrl}`;
  const urlObj = new URL(fullUrl);

  const code = urlObj.searchParams.get("code");

  const token = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${protocol}://${host}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
    },
  });

  return res.redirect(
    `${protocol}://${host}/api/link?email=${userData.data.email}` // token instead of email
  );
};

module.exports = { googleAuth, googleRedirect };
