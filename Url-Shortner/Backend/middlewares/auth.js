import { getUser } from "../utils/auth.js";
async function restrictToLoggedinUser(req, res, next) {
  const userUID = req.cookies?.uid;
  if (!userUID) return res.redirect("/login");

  const user = getUser(userUID);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUID = req.cookies?.uid;
  const user = getUser(userUID);
  req.user = user;
  next();
}

export { restrictToLoggedinUser, checkAuth };
