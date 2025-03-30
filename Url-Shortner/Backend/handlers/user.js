import { login, signup } from "../service/user.js";
import { v4 as uuidv4 } from "uuid";
import { getUser, setUser } from "../utils/auth.js";
export async function handleSignup(req, res) {
  try {
    const { user_name, email_id, password } = req.body;
    const userdata = await signup({ user_name, email_id, password });
    req.session.username = userdata.user_name;
    if (userdata) {
      res.redirect(`/login`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function handleLogin(req, res) {
  try {
    const { email_id, password } = req.body;
    const userData = await login({ email_id, password });
    if (userData) {
      req.session.username = userData.user_name;
      const sessionID = uuidv4();
      setUser(sessionID, userData);
      res.cookie("uid", sessionID);
      return res.redirect("/");
    }
    req.session.invalid_creds = true;
    return res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.session.server_error = true;
    return res.redirect("/login");
  }
}
