const path = require("path");
const DB = require("../database/models")

const productController = {
    detail: (req, res) => {
        let {id} = req.params
        DB.Product.findByPk(id)
        .then(product => {

            res.render("productOrder", {product})
        })
     
    },
    order: async (req, res) => {
        try {
           
            res.render("userCart")
            

        } catch (error) {
           console.log(error);
        }


    }
}
module.exports = productController