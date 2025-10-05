import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { stderr, stdout } from "process";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
// multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuid() + path.extname(file.originalname));
  },
});

// multer configuration

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: ["http://localhost:7000", "http://localhost:5173"],
  })
);

app.use((req, res, next) => {
  res.header("Allow-Control-Access-Origin", "*");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // telling the express where to put and serve static files
app.get("/", (req, res) => {
  res.json("HIIII, Welcome");
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("file uploaded");
  const lessonId = uuid();
  const videoPath = req.file.path;
  const outputPath = `./uploads/courses/${lessonId}`;
  //HLS is unstiched video. It is like an index stating the information about different video segments and their timestamos
  /*
  An M3U8 file is a text-based playlist format used for streaming media, particularly with HTTP Live Streaming (HLS),
  that lists the locations of media file segments for playback. It is a UTF-8 encoded version of the older M3U format,
  supporting a wider range of characters and acting as a "map" to guide media players through the sequence of
  media chunks, often in different quality levels for adaptive bitrate streaming
  */
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("HLS path", hlsPath);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  //ffmpeg
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  exec(ffmpegCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Error in processing the video file",
      });
    }
    console.log(stdout);
    console.log(stderr);
    const videoUrl = `http://localhost:8090/uploads/courses/${lessonId}/index.m3u8`;
    res.json({
      message: "Video converted to HLS format",
      videoUrl,
      lessonId,
    });
  });
});
app.listen(8090, () => {
  console.log("App is running at 8090 PORT");
});
