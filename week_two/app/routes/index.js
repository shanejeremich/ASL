const RESPONSE_MESSAGES = require("../constants/responseMessages");
const contactRoutes = require("./contactRoutes");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: RESPONSE_MESSAGES.REQUEST_DETAILS(req) });
});

router.use("/contacts", contactRoutes);

module.exports = router;
