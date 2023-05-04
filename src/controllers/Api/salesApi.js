const DB = require("../../database/models");

module.exports = {
  list: (req, res) => {
    DB.Sale.findAll({ include: DB.Sale.OrderItem })
    .then(sales => res.json(sales))
    .catch(error => res.json(error))
  },
  create: async (req, res) => {
   let order = await DB.Sale.create({...req.body, createdAt: '2002-06-15'},{
    include: DB.Sale.OrderItem
   })
   res.json({ok: true, status: 200, order: order})
  },
  detail: (req, res) => {
    const {id} = req.params
    DB.Sale.findByPk(id, {
      include: DB.Sale.OrderItem
    })
    .then(saleDetail => {
      let response = {
        status: 200,
        data: saleDetail
      }

      res.json(response)
    })
  }
}