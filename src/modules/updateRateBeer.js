const mongoose = require("mongoose")
const BeerRate = require("../models/BeerRateModel")
const Beer = require("../models/BeersModel")

const updateRateBeer = async (beerId) => {
    const beerRate = await BeerRate.find({beer: beerId}, async(err, beer) =>{ 
        var rate = 0
        var ind = 0
        var total = 0
        await beer.forEach(async (element, index) =>{
            rate = rate + element.rate
            ind = index;
        })
        total = rate / (ind+1)
        await Beer.findByIdAndUpdate(beerId, {$set: { rate : total}})
    });
}

module.exports = updateRateBeer