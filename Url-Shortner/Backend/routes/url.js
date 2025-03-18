import express from "express";
import { handleGenerateShortUrl } from "../handlers/url.js";
const router = express.Router();

router.post("/", handleGenerateShortUrl);

export default router;
