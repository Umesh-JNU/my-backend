const catchAsyncError = require("../utils/catchAsyncError");
const { enquiryRoute } = require("./enquiry");
const mongoose = require('mongoose');
const express = require('express');
const visitRoute = express.Router();

const visitSchema = new mongoose.Schema({
  visit: {
    type: Number,
    require: true
  },
  page_view: {
    type: Number,
    require: true
  }
});

const visitModel = mongoose.model("Visit", visitSchema);

visitRoute.put("/", catchAsyncError(async (req, res, next) => {
  let visitData = (await visitModel.find())[0];
  if (!visitData) {
    await visitModel.create({ visit: 1, page_view: 1 });
  } else {
    if (req.query.TYPE === 'visit') {
      visitData.visit = visitData.visit + 1;
    }
    visitData.page_view = visitData.page_view + 1;
    await visitData.save();
  }

  res.status(200).json({ success: true });
}));

module.exports = { visitRoute, enquiryRoute } 