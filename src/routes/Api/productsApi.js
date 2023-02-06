//Requires
const express = require("express");
const productApi = require("../../controllers/Api/productApi");
const router = express.Router();


// Todos los productos http://localhost:3500/api/products
router.get("/", productApi.list);

// Todos los productos http://localhost:3500/api/products/:id
router.get("/:id", productApi.detail)

module.exports = router