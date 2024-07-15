const RESPONSE_MESSAGES = require("./constants/responseMessages");
const express = require("express");
const routeHandler = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: RESPONSE_MESSAGES.REQUEST_DETAILS(req),
  });
});

app.use("/v1", routeHandler);

app.use((req, res, next) => {
  const err = new Error(RESPONSE_MESSAGES.NEW_ERROR(req));
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(RESPONSE_MESSAGES.REQUEST_DETAILS_FAIL(req, err));
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      err.status === 404
        ? RESPONSE_MESSAGES.NOT_FOUND
        : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR(err),
  });
});

module.exports = app;
