import { nanoid } from "nanoid";
import {
  createURL,
  getAllUrlRecords,
  getandUpadteUrlRecordFromShortId,
} from "../db/url.js";

async function generateShortUrl(url) {
  try {
    const short_id = nanoid(8);
    const newUrlRecord = await createURL({ short_id, redirect_url: url });
    return `www.short-url.com/${short_id}`;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getRedirectUrlFromShortId(short_id) {
  try {
    const urlData = await getandUpadteUrlRecordFromShortId({ short_id });
    if (urlData) {
      return urlData.redirect_url;
    }
  } catch (err) {
    throw err;
  }
}

async function getAllUrls() {
  try {
    const allUrls = await getAllUrlRecords();
    return allUrls;
  } catch (err) {
    throw err;
  }
}

export { generateShortUrl, getRedirectUrlFromShortId, getAllUrls };
