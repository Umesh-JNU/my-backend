const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");

const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncError = require("../../utils/catchAsyncError");
const APIFeatures = require("../../utils/apiFeatures");
const enquiryModel = require("./enquiry.model");
const sendEmail = require('../../utils/sendEmail');


// Create a new document
exports.createEnquiry = catchAsyncError(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {

    const enquiry = (await enquiryModel.create([req.body], { session }))[0];
    console.log({ file: path.join(__dirname + "/template.html")})
    const template = fs.readFileSync(path.join(__dirname + "/template.html"), "utf-8");

    console.log({ template })
    // /{{(\w+)}}/g - match {{Word}} globally
    const renderedTemplate = template.replace(/{{(\w+)}}/g, (match, key) => {
      console.log({ match, key })
      return req.body[key] || match;
    });

    await sendEmail({
      email: process.env.TO_EMAIL,
      subject: 'Contact Notification',
      message: renderedTemplate
    });
    // --------------------------------------------------------
    await session.commitTransaction();
    res.status(200).json({ message: "Thank you for contacting me!" });

  } catch (error) {
    await session.abortTransaction();
    next(new ErrorHandler(error.message, 400));
  } finally {
    session.endSession();
  }
});
