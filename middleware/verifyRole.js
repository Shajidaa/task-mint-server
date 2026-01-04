export const verifyRole = (role) => {
  return async (req, res, next) => {
    const user = await req.app.locals.db
      .collection("users")
      .findOne({ email: req.email });

    if (!user || user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};
