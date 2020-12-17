export default {
  cookieSecret: process.env.COOKIE_SECRET || "a-cookie-secret",
  port: parseInt(process.env.PORT || "8080", 10),
};
