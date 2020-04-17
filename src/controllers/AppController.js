const mongoose = require('mongoose')
module.exports = {
    async index(req, res){
        res.send({ ok: true, user: req.userId })
    }
}