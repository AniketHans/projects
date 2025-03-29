import { userSchema } from "../models/user.js";

async function createUser({ user_name, email_id, password }) {
  try {
    const userData = await userSchema.create({ user_name, email_id, password });
    return userData;
  } catch (err) {
    throw err;
  }
}

async function findUserWithEmailAndPassword({ email_id, password }) {
  try {
    const userData = await userSchema.findOne({
      where: { email_id, password },
    });
    return userData;
  } catch (err) {
    throw err;
  }
}

export { createUser, findUserWithEmailAndPassword };
