/* Packages */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

/* Dashboard Routes */
var indexRouter = require("./routes/index");
var configRouter = require("./routes/config");
var adminRouter = require("./routes/admin");
var teamRouter = require("./routes/team");
var galleryRouter = require("./routes/gallery");
var blogRouter = require("./routes/blog");
var sponsorRouter = require("./routes/sponsor");
var teamHistoryRouter = require("./routes/teamHistory");

/* Client Side Routes */
var teamClientRouter = require("./routes/teamClient");
var sponsorsClientRouter = require("./routes/sponsorsClient");
var teamHistoryClientRouter = require("./routes/teamHistoryClient");
var blogsClientRouter = require("./routes/blogsClient");
var galleryClientRouter = require("./routes/galleryClient");

/* Route Protection */
const AdminPrivileges = require("./middlewares/isAdmin");

/* Environment Variables Configuration */
require("dotenv").config();

/* Database Connection */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.error("MongoDB Connection Failed..", err));

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

/* Dashboard Routes */
app.use("/", indexRouter);
app.use("/config", configRouter);
app.use("/admin", adminRouter);
app.use("/dashboard/teams", AdminPrivileges, teamRouter);
app.use("/dashboard/gallery", AdminPrivileges, galleryRouter);
app.use("/dashboard/blogs", AdminPrivileges, blogRouter);
app.use("/dashboard/sponsors", AdminPrivileges, sponsorRouter);
app.use("/dashboard/teamHistory", AdminPrivileges, teamHistoryRouter);

/* Client Side Routes */
app.use("/teamMembersClient", teamClientRouter);
app.use("/sponsorsClient", sponsorsClientRouter);
app.use("/teamHistoryClient", teamHistoryClientRouter);
app.use("/blogsClient", blogsClientRouter);
app.use("/galleryClient", galleryClientRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
