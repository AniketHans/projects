import express from "express";
import urlRoute from "./routes/url.js";
import { getRedirectUrlFromShortId } from "./service/url.js";
const app = express();
const PORT = 3006;
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const { shortid } = req.params;
  const redirectUrl = await getRedirectUrlFromShortId(shortid);
  console.log(redirectUrl);
  if (redirectUrl) {
    res.redirect(redirectUrl);
  }
  res.status(404);
});
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
