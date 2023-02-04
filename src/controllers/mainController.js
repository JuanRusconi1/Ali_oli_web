const DB = require("../database/models")

const mainController = {
    index:  (req, res) => {
        
            DB.Product.findAll({
                include: [{ association: "categories" }],
                })
            .then(productos => {
                res.render("home", {productos})
            } )
            
            



    }
}

module.exports = mainController