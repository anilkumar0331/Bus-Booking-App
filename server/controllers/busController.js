const mongoose = require("mongoose");
const Bus = mongoose.model("Bus");

module.exports.getBusDetails = async (req, res, next) => {
	await Bus.find(
		{ from: req.body.from, to: req.body.to, available: { $gt: 0 } },
		(err, buses) => {
			if (err) {
				res.json({ success: false, message: err });
			} else if (buses < 1) {
				res.json({ success: false, message: "No busses are available" });
			} else {
				res.json({ success: true, buses: buses });
			}
		}
	);
};

module.exports.updateBusDetails = async (req, res, next) => {
	if (!req.body.id) {
		res.json({ success: false, message: "No ID" });
	} else {
		await Bus.findOne({ _id: req.body.id }, (err, bus) => {
			if (err) {
				res.json({ success: false, message: "Invalid Bus id" });
			} else {
				bus.reservedSeats = bus.reservedSeats.concat(req.body.booked);
				bus.available = bus.totalSeats - bus.reservedSeats.length;
				bus.save((err) => {
					if (err) {
						res.json({ success: false, message: err });
					} else {
						res.json({ success: true, message: "Seats Reserved!" });
					}
				});
			}
		});
	}
};
