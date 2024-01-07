const enquiryModel = require("./enquiry.model");
const { createEnquiry } = require("./enquiry.controller");
const enquiryRoute = require("./enquiry.route");

module.exports = { enquiryModel, createEnquiry, enquiryRoute };
