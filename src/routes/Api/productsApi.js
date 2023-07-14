//Requires
const express = require("express");
const router = express.Router();
const productApi = require("../../controllers/Api/productApi");
const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "public/images/products")
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({storage: storage})
// Todos los productos http://localhost:3500/api/products
router.get("/", productApi.list);

// Todos las salsas adicionales http://localhost:3500/api/products/additionals
router.get("/additional", productApi.additionals)

// Detalle del producto http://localhost:3500/api/products/additional/:id
router.get("/additional/:id", productApi.additionDetail)

// Crear un nuevo producto https://localhost:3500/api/products/create
router.post("/create", upload.single("image"), productApi.create)

// Modificar un producto https://localhost:3500/api/products/update/:id
router.post("/update/:id", upload.single("image"), productApi.update)

// Todas las categorias http://localhost:3500/api/products/categories
router.get("/categories", productApi.listCategories)

// Eliminar un producto http://localhost:3500/api/products/delete/:id
router.get("/delete/:id", productApi.delete)

// Obtener la tabla de stock http://localhost:3500/api/products/stock
router.get("/stock", productApi.listStock)

// Eliminar una fila de la tabla de stock http://localhost:3500/api/products/stock/delete/:id
router.get("/stock/delete/:id", productApi.deleteStock)

// Añadir una fila a la tabla de stock http://localhost:3500/api/products/stock/create
router.post("/stock/create", productApi.createRowStock)

// modificar una fila de la tabla de stock http://localhost:3500/api/products/stock/update/:id
router.post("/stock/update/:id", productApi.updateStock)

// Detalle del producto http://localhost:3500/api/products/:id
router.get("/:id", productApi.detail)

module.exports = router