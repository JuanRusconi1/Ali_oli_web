const DB = require("../../database/models");
const Op = DB.Sequelize.Op;
module.exports = {
  list: (req, res) => {
    DB.Sale.findAll({ include: DB.Sale.OrderItem })
      .then(sales => {
        const response = {
          status: 200,
          ok: true,
          count: sales.length,
          data:sales
        }
        res.json(response)
      })
      .catch(error => res.json(error))
  },
  create: async (req, res) => {
    let date = new Date()
    let newDate = () => {
      let day = `0${date.getDate()}`.slice(-2)
      let month = `0${date.getMonth() + 1}`.slice(-2)
      let year = date.getFullYear()
      return `${year}-${month}-${day}`
    }
    let order = await DB.Sale.create({ ...req.body, date: newDate() }, {
      include: DB.Sale.OrderItem
    })
    res.json({ ok: true, status: 200, order: order })

  },
  detail: (req, res) => {
    const { id } = req.params
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
  },
  delete: async (req, res) => {
    const { id } = req.params
    DB.Sale.destroy({
      where: { id: id },
      force: true
    })
    DB.OrderItem.destroy({
      where: { salesId: id },
      force: true
    })
    return res.json({ ok: true, status: 200 })
  },
  pagination: async (req, res) => {
    try {
      const page = req.params.id
      const limit = 10
      const offset = (page - 1) * limit
      const totalSales = await DB.Sale.findAll()
      const totalPages = await Math.ceil(totalSales.length / limit)
      const salesPerPage = await DB.Sale.findAll({
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]]
      }) 
      const ok = salesPerPage.length > 0 ? true : false
      const response = {
        ok: ok,
        status: 200,
        page: page,
        totalPages: totalPages,
        data: salesPerPage
      }
      return res.json(response)
      
    } catch (error) {
      res.json(error)
    }  
      
  },
  search: (req, res) => {
    const { keyword } = req.body
    DB.Sale.findAll({
      where: {
        date: { [Op.like]: `%${keyword}%` }
      }   
    })
      .then(results => {
        if (results.length > 0) {
          const response = {
            ok: true,
            status: 200,
            data: results
          }
          res.json(response)
        } else {
          res.json({ok: false, status: 500})
        }
      })
  }
}
