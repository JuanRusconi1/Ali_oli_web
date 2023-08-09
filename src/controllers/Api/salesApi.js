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
      let day = `0${date.getDate()}`.slice(-2);
      let month = `0${date.getMonth() + 1}`.slice(-2);
      let year = date.getFullYear();
      let hours = `0${date.getHours()}`.slice(-2);
      let minutes = `0${date.getMinutes()}`.slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`
    }
    const { orderitem } = req.body
    console.log({body: req.body, orderitem: orderitem[0].docena})
    let order = await DB.Sale.create({ ...req.body, date: newDate() })
    orderitem.forEach(item => {
      DB.OrderItem.create({ salesId: order.id, ...item }, {
        include: DB.OrderItem.Docena
      })
    })
    res.json({ ok: true, status: 200, order: order })

  },
  detail: async (req, res) => {
    const { id } = req.params
    let order = await DB.Sale.findByPk(id)
    let orderitem = await DB.OrderItem.findAll({
      where: {salesId : id},
      include: DB.OrderItem.Docena
    })
    if (order && orderitem) {
      order.setDataValue("orderitem", orderitem)
     return res.json({ok:true, status: 200, data: order})
    } 
    res.json({ok: false, status: 502})
  },
  delete: async (req, res) => {
    if (req.body.secret === "admin") {
      console.log("eliminar")
      let { id } = req.body
      DB.Sale.destroy({
        where: { id: id },
        force: true
      })
      DB.OrderItem.destroy({
        where: { salesId: id },
        force: true
      },{include: DB.OrderItem.Docena})
      res.json({ ok: true, status: 200 })
    } else {
      res.json({ ok: false, status: 401, error: "Unauthorized" })
    }
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
  },
  update: async (req, res) => {
    const { id } = req.params
    const { orderitem, buyerName, phoneNumber, paymentType, total } = req.body
    DB.OrderItem.destroy({
      where: { salesId: id },
      force: true
    })
    const sale = {buyerName: buyerName,phoneNumber: phoneNumber, paymentType: paymentType, total: total}
    DB.Sale.update(sale, {where: {id: id}})
    orderitem.forEach(item => {
      delete item.id
      DB.OrderItem.create({ salesId: id, ...item }, {
        include: DB.OrderItem.Docena
      })
    })
    let order = {id: id}
    res.json({ ok: true, status: 200, order: order})
  }
}
