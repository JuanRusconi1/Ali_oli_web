const { log } = require("console");
const DB = require("../../database/models");
const jwt = require("jsonwebtoken")


module.exports = {
  login: async (req, res) => {
    const {name, password} = req.body
    const user = await DB.Admin.findOne({ where: { name: name } })
      if (user) {
        if (password === user.password) {
          // const token = jwt.sign({
          //   exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
          //   username: user.name
            
          // },'catamarca661',{
          //   algorithm: 'HS256'
          // })
          res.json({ok: true, status: 200})
        } else {
          res.json({ok: false, status: 401})
        }
      } else {
        res.json({ok: false, status: 401})
      }
  }
}