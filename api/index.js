const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mysql = require('mysql');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const smsRoute = require("./routes/sms/Sms");
const validateSmsRoute = require("./routes/sms/ValidateSms");
const deleteSmsRoute = require("./routes/sms/DeleteSms");
const insertUserRoute = require("./routes/user/InsetUser");
const getUserRoute = require("./routes/user/GetUser");

dotenv.config();

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// }).then(() => console.log("Success")).catch((err) => console.log(err));

app.use(express.static("uploads"));

app.use(express.json());
// app.use("/api/auth", authRoute)
// app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
// app.use("/api/lists", listRoute);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/insertSms", smsRoute);
app.use("/api/validateSms", validateSmsRoute);
app.use("/api/deleteSms", deleteSmsRoute);
app.use("/api/insertUser", insertUserRoute);
app.use("/api/getUser", getUserRoute);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./assets/videoo1.mp4";
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.listen(8800, () => {
  console.log("backend is running!");
})


// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

var db_config = {
  host: 'localhost',
  user: 'root',
  password: "",
  database: "irnetflix",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
    console.log("Connected!");            // process asynchronous requests in the meantime.
  });
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();