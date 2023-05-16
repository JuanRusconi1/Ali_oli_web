//Requires
const express = require("express");
const router = express.Router();
const salesApi = require("../../controllers/Api/salesApi");

// Obtener todas las comandas http://localhost:3500/api/sales
router.get("/", salesApi.list)

// Obtener la informacion de una comanda http://localhost:3500/api/sales/detail/:id
router.get("/detail/:id", salesApi.detail)

// Eliminar una comanda http://localhost:3500/api/sales/delete/:id
router.get("/delete/:id", salesApi.delete)

// obtener comandas divido en paginas http://localhost:3500/api/sales/page/:id
router.get("/page/:id", salesApi.pagination)

// buscar comandas por fecha http://localhost:3500/api/sales/search
router.post("/search", salesApi.search)

// Crear una nueva comanda http://localhost:3500/api/sales/create
router.post("/create", salesApi.create)
module.exports = router