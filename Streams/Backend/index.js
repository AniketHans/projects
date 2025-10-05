import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.get("/numbers", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // SSE MIME type
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  let counter = 1;

  const interval = setInterval(() => {
    res.write(`Package number ${counter}\n\n`);
    counter++;
    if (counter == 11) {
      clearInterval(interval);
      res.end();
    }
  }, 2000);
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.get("/numbers-and-alpha", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // SSE MIME type
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  let counter = 1;
  let { valtype } = req.query;
  valtype = valtype || "number";
  const interval = setInterval(() => {
    if (valtype == "number") {
      res.write(`Package number ${counter}\n\n`);
    } else {
      res.write(`Package number ${String.fromCharCode(counter + 96)}\n\n`);
    }
    counter++;
    if (counter == 27) {
      clearInterval(interval);
      res.end();
    }
  }, 2000);
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});
app.listen(4059, () => {
  console.log("Listening at PORT:4059");
});
