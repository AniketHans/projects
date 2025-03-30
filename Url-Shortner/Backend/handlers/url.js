import { generateShortUrl, getAllUserUrls } from "../service/url.js";
import { getUser } from "../utils/auth.js";

async function handleGenerateShortUrl(req, res) {
  try {
    const { url } = req.body;
    if (url == undefined) {
      return res.status(400).json({ message: "url missing from request body" });
    }
    const user_id = req.user.id;
    const shortenedUrl = await generateShortUrl(url, user_id);
    console.log(shortenedUrl);
    req.session.url = shortenedUrl;
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleGetUrlsByUser(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return { invalid_req: true, error: false, urls: [] };
    }
    const allUrls = await getAllUserUrls(user.id);
    return { invalid_req: false, error: false, urls: allUrls };
  } catch (err) {
    console.log(err);
    return { invalid_req: false, error: true, urls: [] };
  }
}

export { handleGenerateShortUrl, handleGetUrlsByUser };
