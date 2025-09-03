/* Packages */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');

/* Dashboard Routes */
var indexRouter = require("./routes/index");
var configRouter = require("./routes/config");
var adminRouter = require("./routes/admin");
var teamRouter = require("./routes/team");
var galleryRouter = require("./routes/gallery");
var blogRouter = require("./routes/blog");
var sponsorRouter = require("./routes/sponsor");
var teamHistoryRouter = require("./routes/teamHistory");
var formRouter = require("./routes/form");
var reviewRouter = require("./routes/review");

/* Client Side Routes */
var teamClientRouter = require("./routes/teamClient");
var sponsorsClientRouter = require("./routes/sponsorsClient");
var teamHistoryClientRouter = require("./routes/teamHistoryClient");
var blogsClientRouter = require("./routes/blogsClient");
var galleryClientRouter = require("./routes/galleryClient");

/* Route Protection */
const AdminPrivileges = require("./middlewares/isAdmin");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require('./middlewares/errorHandler');

const AppError = require('./utils/appError');

/* Environment Variables Configuration */
require("dotenv").config();

/* Database Connection */
const mongoURI = process.env.MONGODB_URL;
if (!mongoURI) {
  console.error('MongoDB URL is undefined. Check your .env file.');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

var app = express();
app.use(cors());
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(rateLimiter);

/* Dashboard Routes */
app.use("/health", indexRouter);
app.use("/config", configRouter);
app.use("/admin", adminRouter);
app.use("/dashboard/teams", AdminPrivileges, teamRouter);
app.use("/dashboard/gallery", AdminPrivileges, galleryRouter);
app.use("/dashboard/blogs", AdminPrivileges, blogRouter);
app.use("/dashboard/sponsors", AdminPrivileges, sponsorRouter);
app.use("/dashboard/teamHistory", AdminPrivileges, teamHistoryRouter);
app.use("/form", formRouter);
app.use("/reviews", reviewRouter);

/* Client Side Routes */
app.use("/teamMembersClient", teamClientRouter);
app.use("/sponsorsClient", sponsorsClientRouter);
app.use("/teamHistoryClient", teamHistoryClientRouter);
app.use("/blogsClient", blogsClientRouter);
app.use("/galleryClient", galleryClientRouter);


// Catch-all route handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

var PORT = process.env.PORT || '3000';

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
