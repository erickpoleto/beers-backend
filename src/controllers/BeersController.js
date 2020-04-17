const mongoose = require("mongoose");
const Beer = require('../models/BeersModel')

module.exports = {
    async indexSearch(req, res) {
        try{
            const { page = 1, search, sortName, sort, category} = req.query
            const regCat = new RegExp(category, "i")
            const regex = new RegExp(search, "i","^\d$")
            const paginate = await Beer.paginate({$or:[{category:regCat, name:regex}]}, {sort: {[sortName] : sort}, page:page, limit: 10})
            return res.json(paginate)
        }catch(err){
            console.info(err);
            return res.status(400).send({error: "something went wrong"});
        }
    },
    async indexNameBeer(req, res){
        const {search} = req.query
        const regex = new RegExp(search, "i")
        const beers = await Beer.find({name : search});
        return res.json(beers)
    },
    
}