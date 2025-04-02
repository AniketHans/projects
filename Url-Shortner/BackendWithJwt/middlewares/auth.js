import { getUser } from "../utils/auth.js";
async function restrictToLoggedinUser(req, res, next) {
  const jwtToken = req.cookies?.token;
  if (!jwtToken) return res.redirect("/login");

  const user = getUser(jwtToken);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const jwtToken = req.cookies?.token;
  const user = getUser(jwtToken);
  req.user = user;
  next();
}

export { restrictToLoggedinUser, checkAuth };
