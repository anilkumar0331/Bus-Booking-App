const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const busController = require("../controllers/busController");

router.post("/register", userController.register);
router.post("/authenticate", userController.authenticate);
router.post("/busdetails", busController.getBusDetails);
router.patch("/updatebusdetails", busController.updateBusDetails);

module.exports = router;
