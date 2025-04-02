import express from "express";
import { handleGenerateShortUrl } from "../handlers/url.js";
import { getRedirectUrlFromShortId } from "../service/url.js";
const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortid", async (req, res) => {
  const { shortid } = req.params;
  const redirectUrl = await getRedirectUrlFromShortId(shortid);
  console.log(redirectUrl);
  if (redirectUrl) {
    res.redirect(redirectUrl);
  }
  res.status(404);
});
export default router;
