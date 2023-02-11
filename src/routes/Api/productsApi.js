//Requires
const express = require("express");
const router = express.Router();
const productApi = require("../../controllers/Api/productApi");


// Todos los productos http://localhost:3500/api/products
router.get("/", productApi.list);

// Todos las salsas adicionales http://localhost:3500/api/products/additionals
router.get("/additional", productApi.additionals)

// Detalle del producto http://localhost:3500/api/products/additional/:id
router.get("/additional/:id", productApi.additionDetail)

// Detalle del producto http://localhost:3500/api/products/:id
router.get("/:id", productApi.detail)

module.exports = router