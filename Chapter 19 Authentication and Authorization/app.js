//core module
const path = require("path");

// External module
const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);

const DB_PATH =
  "mongodb+srv://1234:1234@cluster0.zhhf9pj.mongodb.net/airbnb?appName=Cluster0";

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const { pageNotFound } = require("./controllers/error");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const store = new mongodbStore({
  uri: DB_PATH,
  collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(
  session({
    secret: "kaushal is the best",
    resave: false,
    saveUninitialized: true,
    store: store,
  }),
);

app.use((req, res, next) => {
  req.session.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(storeRouter);
app.use("/host", () => {
  if (req.session.isLoggedIn) {
    hostRouter(req, res, next);
  } else {
    res.redirect("/login");
  }
});

app.use(authRouter);
app.use(express.static(path.join(rootDir, "public")));

app.use(pageNotFound);

const PORT = 3001;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongodb", err);
  });
