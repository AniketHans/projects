import { generateShortUrl } from "../service/url.js";

async function handleGenerateShortUrl(req, res) {
  try {
    const { url } = req.body;
    if (url == undefined) {
      return res.status(400).json({ message: "url missing from request body" });
    }
    const shortenedUrl = await generateShortUrl(url);
    console.log(shortenedUrl);
    req.session.url = shortenedUrl;
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { handleGenerateShortUrl };
