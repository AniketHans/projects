import jwt from "jsonwebtoken";

function setUser(user) {
  //This function will generate the token for you.
  const secret = "Ah@Aloo"; // This will act as the stamp.
  const payload = {
    ...user,
    permissions: ["read", "write"],
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { setUser, getUser };
