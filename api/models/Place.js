const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    location: String,
    pictures: [String],
    description: String,
    features: [String],
    extraInfo: String,
    moveIn: Date,
    lease: String,
    maxStudents: Number,
    rent: Number,
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;