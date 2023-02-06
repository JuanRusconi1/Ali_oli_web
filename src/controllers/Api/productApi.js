const DB = require("../../database/models")

module.exports = {
    list: (req, res) => {
        DB.Product.findAll()
        .then((products) => {
            let response = {
                status: 200,
                data: products
            }
            res.json(response)
        }).catch((error) => res.json(error))
    },
    detail: (req, res) => {
        DB.Product.findByPk(req.params.id)
        .then((product) => {
            let response = {
                status: 200,
                data: product
            }
            res.json(response)
        }).catch((error) => res.json(error))
    }
}