const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		required: true,
		minlength: [4, "Password must be atleast four characters"],
	},
	salSecret: { type: String },
});

//Custom validation for email
userSchema.path("email").validate((val) => {
	emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(val);
}, "Invalid email");

// Events
userSchema.pre("save", function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(this.password, salt, (err, hash) => {
			this.password = hash;
			this.salSecret = salt;
			next();
		});
	});
});

//Methods
userSchema.methods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXP,
	});
};

mongoose.model("User", userSchema);
