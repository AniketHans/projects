import { createUser, findUserWithEmailAndPassword } from "../db/user.js";
async function signup({ user_name, email_id, password }) {
  try {
    const userData = await createUser({ user_name, email_id, password });
    return userData;
  } catch (err) {
    throw err;
  }
}

async function login({ email_id, password }) {
  try {
    const userData = await findUserWithEmailAndPassword({ email_id, password });
    return userData;
  } catch (err) {
    throw err;
  }
}
export { signup, login };
