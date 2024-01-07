const express = require("express");
const router = express.Router();
const { createEnquiry } = require("./enquiry.controller");

router.post("/", createEnquiry);

module.exports = router;
