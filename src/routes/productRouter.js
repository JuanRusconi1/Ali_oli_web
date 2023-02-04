//Requires
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/buy/:id", productController.detail)
router.get("/order-detail", productController.order)

module.exports = router