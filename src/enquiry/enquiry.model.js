const mongoose = require('mongoose');

const validateEmail = (email) => {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const enquirySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required."]
	},
	email: {
		type: String, 
		required: [true, "Email is required"],
		validate: [validateEmail, "Please fill a valid email address"]
	},
	mobile: {
		type: String,
		maxLength: [10, "Invalid Mobile Number."],
		minLength: [10, "Invalid Mobile Number."],
		required: [true, "Mobile No. is required."]
	},
	message: {
		type: String,
		required: [true, "Message is required."],
	},
}, { timestamps: true });

const enquiryModel = mongoose.model('Enquiry', enquirySchema);

module.exports = enquiryModel;