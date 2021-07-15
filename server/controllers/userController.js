const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
module.exports.register = async (req, res, next) => {
	var user = new User();
	user.fullName = req.body.fullName;
	user.email = req.body.email;
	user.mobileNumber = req.body.mobileNumber;
	user.dob = req.body.dob;
	user.password = req.body.password;
	user.gender = req.body.gender;
	await user.save((err, doc) => {
		if (!err) {
			res.send(doc);
		} else {
			if (err.code === 11000) {
				res.status(422).send(["Duplicate email address found"]);
			} else {
				return next(err);
			}
		}
	});
};

module.exports.authenticate = async (req, res, next) => {
	await passport.authenticate("local", (err, user, info) => {
		if (err) return res.status(400).json(err);
		else if (user) return res.status(200).json({ token: user.generateJwt() });
		else return res.status(404).json(info);
	})(req, res);
};
