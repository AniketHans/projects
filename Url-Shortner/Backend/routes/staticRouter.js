// This file is created to club all the paths which are going to render the UI using the views

import express from "express";
import { getAllUrls, getAllUserUrls } from "../service/url.js";
import {
  handleGenerateShortUrl,
  handleGetUrlsByUser,
} from "../handlers/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const username = req.session?.username;
  const url = req.session?.url;
  const { invalid_req, error, urls } = await handleGetUrlsByUser(req, res);
  return res.render("home", {
    url: url,
    urls: urls,
    username,
    invalid_req,
    error,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  const { invalid_creds, server_error } = req.session;
  return res.render("login", {
    invalid_creds,
    server_error,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session");
    } else {
      res.redirect("/");
    }
  });
});

export default router;
