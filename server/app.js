require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const indexRouter = require("./routes/index.router");
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", indexRouter);

//Error Handler
app.use((err, req, res, next) => {
	if (err.name === "ValidationError") {
		var valErrors = [];
		Object.keys(err.errors).forEach((key) =>
			valErrors.push(err.errors[key].message)
		);
		res.status(422).send(valErrors);
	}
});

//start server
app.listen(process.env.PORT, () =>
	console.log(`Server started at port: ${process.env.PORT}`)
);
