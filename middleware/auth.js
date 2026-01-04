export const verifyAuth = async (req, res, next) => {
  const email = req.headers.email;
  if (!email) return res.status(401).send("Unauthorized");
  req.email = email;
  next();
};
