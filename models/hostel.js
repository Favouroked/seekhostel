var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var HostelSchema = new Schema({
    agent : { type: Schema.Types.ObjectId, ref: 'User' },
    hostel_type: String,
    state: String,
    location: String,
    price_range: String,
    price: String,
    date: Date,
    nearest_school: String,
    images: [{ type: String }],
    description: String
});

HostelSchema.plugin(mongoosastic, {
    hosts: [
        'localhost:9200'
    ]
});

module.exports = mongoose.model('Hostel', HostelSchema);