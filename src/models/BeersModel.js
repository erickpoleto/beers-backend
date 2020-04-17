const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate")

const BeerSchema = new mongoose.Schema({
    abv: {
        type: String
    },
    address: {
        type: String
    },
    category: {
        type: String
    },
    city: {
        type: String
    },
    coordinates: [Number],
    country: {
        type: String
    },
    description: {
        type: String
    },
    ibu: {
        type: Number
    },
    name: {
        type: String
    },
    state: {
        type: String
    },
    website: {
        type: String
    },
    rate : {
        type: Number
    }
})
BeerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Beers', BeerSchema);