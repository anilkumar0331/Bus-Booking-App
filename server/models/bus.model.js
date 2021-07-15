const mongoose = require("mongoose");
const busSchema = new mongoose.Schema({
	from: {
		type: String,
	},
	to: {
		type: String,
	},
	busType: {
		type: String,
	},
	departure: {
		type: String,
	},
	arrival: {
		type: String,
	},
	seats: {
		type: Number,
	},
	fare: {
		type: Number,
	},
	totalSeats: {
		type: Number,
	},
	available: {
		type: Number,
	},
	reservedSeats: {
		type: Array,
	},
});

mongoose.model("Bus", busSchema, "bus-details");
