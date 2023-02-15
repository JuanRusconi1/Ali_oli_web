const path = require("path");
const DB = require("../database/models")

const productController = {
    detail: async (req, res) =>  {
        let { id } = req.params
        let product = await DB.Product.findByPk(id, {
            include: [{ association: "categories" }]
            })
        let salsas = await  DB.Additional.findAll()
        let productos = await DB.Product.findAll()
                res.render("productOrder", { product, salsas, productos})
    },
    order:  (req, res) => {
            res.render("userCart")
    }
}
module.exports = productController