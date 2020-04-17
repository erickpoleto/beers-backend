const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate")

const UsersRateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    beer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BeerRate',
            require: true
        }
    ]
})


UsersRateSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('UsersRate', UsersRateSchema);

