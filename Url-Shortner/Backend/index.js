import express from "express";
import urlRoute from "./routes/url.js";
import path from "path";
import { getAllUrls, getRedirectUrlFromShortId } from "./service/url.js";
const app = express();
const PORT = 3006;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use("/url", urlRoute);

app.get("/urls", async (req, res) => {
  const urls = await getAllUrls();
  return res.render("allUrls", {
    urls,
  });
});
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
