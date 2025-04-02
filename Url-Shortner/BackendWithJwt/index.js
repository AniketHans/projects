import express from "express";
import urlRoute from "./routes/url.js";
import path from "path";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
import { getAllUrls } from "./service/url.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { restrictToLoggedinUser, checkAuth } from "./middlewares/auth.js";

const app = express();
const PORT = 3006;
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // To support the form data
app.use(cookieParser());

app.use("/url", restrictToLoggedinUser, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/urls", async (req, res) => {
  const urls = await getAllUrls();
  return res.render("allUrls", {
    urls,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
