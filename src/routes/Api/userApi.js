//Requires
const express = require("express");
const router = express.Router();
const userApi = require("../../controllers/Api/userApi")

// Validar si el usuario/admin existe en la base de datos http://localhost:3500/api/user/login
router.post("/login", userApi.login)

module.exports = router