const DB = require("../database/models")

const mainController = {
    index: async (req, res) => { 
           const products = await DB.Product.findAll({
                include: [{ association: "categories" }]
                })
            const categories = await DB.Category.findAll()
                res.render("home", {productos: products, categorias: categories})
           
    }
}

module.exports = mainController