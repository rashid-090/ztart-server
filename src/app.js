// framework
const express = require("express");
const fileUpload = require('express-fileupload');

// external packages
const helmet = require("helmet");
const cors = require("cors");

// app modules/packages/utils
const config = require("./config");
const database = require("./utils/database");
const routes = require("./routes");
const { exceptionConverter, exceptionHandler } = require("./utils/exception");
const { NotFoundException } = require("./utils/customExceptions");

const app = express();
// parse application/json
app.use(helmet.hsts({
    maxAge: 31536000,  // 1 year in seconds
    includeSubDomains: true,  // apply to all subdomains as well
    preload: true  // allows site to be preloaded by browsers
  }));

app.use(express.json({ limit: config?.bodyLimit ?? "" }));
app.use(express.urlencoded({ extended: false }));
// app.use(fileUpload());
// security level
// app.use(helmet());
app.use(cors(config?.corsOptions));

// database connection
database.connect();

// api routes
app.use("/api", routes);

// 404 error for any unknown api request
app.use((_, res, next) => {
    next(new NotFoundException());
});

app.use((req, res) => {
  res.status(400).send('Page not found')
})

// centralized error handler
app.use(exceptionConverter);
app.use(exceptionHandler);

module.exports = app;
