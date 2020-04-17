const mongoose = require('mongoose')

const update = async (beerRate, beer, rate, req ) => {
    
    await beerRate.updateOne({beer: beer, user: req.userId}, {rate: rate}, {new: true})
    
}

module.exports = update;

