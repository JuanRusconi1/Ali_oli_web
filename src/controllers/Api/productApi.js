const DB = require("../../database/models");
const path = require("path");
const multer = require("multer");
const fs = require("fs")
const Op = DB.Sequelize.Op;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

module.exports = {
    list: (req, res) => {
        DB.Product.findAll({ include: [{ association: "categories" }] })
            .then((products) => {

                for (let i = 0; i < products.length; i++) {
                    products[i].setDataValue("pathImage", `http://localhost:3500/images/products/${products[i].image}`);
                    products[i].setDataValue("detail", `http://localhost:3500/api/products/${products[i].id}`)
                }
                let response = {
                    status: 200,
                    count: products.length,
                    data: products
                }
                res.json(response)
            }).catch((error) => res.json(error))
    },
    detail: (req, res) => {
        DB.Product.findByPk(req.params.id)
            .then((product) => {
                product.setDataValue("pathImage", `http://localhost:3500/images/products/${product.image}`)
                res.json({
                    status: 200,
                    data: product
                })
            }).catch((error) => res.json(error))
    },
    additionals: (req, res) => {
        DB.Additional.findAll()
            .then((additional) => {
                let response = {
                    status: 200,
                    data: additional
                }
                res.json(response)
            }).catch((error) => res.json(error))
    },
    additionDetail: (req, res) => {
        DB.Additional.findByPk(req.params.id)
            .then((additional) => {
                let response = {
                    status: 200,
                    data: additional
                }
                res.json(response)
            }).catch((error) => res.json(error))
    },
    listCategories: (req, res) => {
        DB.Category.findAll()
            .then((categories) => {
                let response = {
                    status: 200,
                    count: categories.length,
                    data: categories
                }
                res.json(response)
            })
            .catch(error => res.json(error))
    },
    create: (req, res) => {
        let image
        if (req.file !== undefined) {
            image = req.file.filename
        } else {
            image = null
        }
        let product = {
            ...req.body,
            image: image
        }
        DB.Product.create(product)

        res.json({ ok: true, status: 200, newProduct: product })
    },
    update: async (req, res) => {
        let { id } = req.params
        let product = await DB.Product.findByPk(id)
        let image
        if (req.file) {
            image = req.file.filename
            let pathImage = `public/images/products/${product.image}`
            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        } else {
            image == product.image
        }     
        let newProduct = {
            ...req.body,
            image: image
        }

        DB.Product.update(newProduct, { where: { id } })
        res.json({ ok: true, status: 200, newProduct: newProduct })
    },
    delete: async (req, res) => {
        if (req.body.secret === "admin") {
            let { id } = req.body
            let product = await DB.Product.findByPk(id)
            let destroy = await DB.Product.destroy({
                where: { id: id },
                force: true
            })
            if (destroy) {
                let pathImage = `public/images/products/${product.image}`
                if (fs.existsSync(pathImage)) {
                    fs.unlink(pathImage, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
                return res.json({ ok: true, status: 200 })
            }
        }
        return res.json({ ok: false, status: 401, error: "Unauthorized" })
    },
    listStock: (req, res) => {

        DB.Stock.findAll()
        .then(items =>  {
            let response = {
                status: 200,
                ok: true,
                data: items
            }
            res.json(response)
        }).catch((error) => res.json(error))
        
    },
    createRowStock: (req, res) => {
        DB.Stock.create(req.body)
        .then(response => {
            res.json({ ok:true, status:200, newRow: response})
        }).catch(error => res.json(error))
    },
    deleteStock: (req, res) => {
        let { id } = req.params
        DB.Stock.destroy({
            where: {id: id},
            force: true
        })
        .then(response =>  {
            res.json({ ok: true, status: 200 })
        }).catch(error => res.json(error))
    },
    updateStock: (req, res) => {
        let { id } = req.params
        DB.Stock.update(req.body, {
            where: { id }
        }).then(response => res.json({ ok: true, status: 200, newRow: response}))
            .catch(error => res.json(error))
    }
}