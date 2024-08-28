const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type: mongoose.Schema.Types.ObjectId, require: true, ref:'Place'},
    user: {type: mongoose.Schema.Types.ObjectId, require: true},
    viewing: {type: Date, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;