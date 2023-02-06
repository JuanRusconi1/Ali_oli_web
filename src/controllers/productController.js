const path = require("path");
const DB = require("../database/models")

const productController = {
    detail: (req, res) => {
        let { id } = req.params
        DB.Product.findByPk(id)
            .then(product => {
                res.render("productOrder", { product })
            })
    },
    order:  (req, res) => {
            res.render("userCart")
    }
}
module.exports = productController