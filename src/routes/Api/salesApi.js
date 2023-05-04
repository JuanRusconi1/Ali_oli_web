//Requires
const express = require("express");
const router = express.Router();
const salesApi = require("../../controllers/Api/salesApi");


router.get("/", salesApi.list)

// Obtener la informacion de una comanda http://localhost:3500/api/sales/detail/:id
router.get("/detail/:id", salesApi.detail)

// Crear una nueva comanda http://localhost:3500/api/sales/create
router.post("/create", salesApi.create)

module.exports = router