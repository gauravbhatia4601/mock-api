const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: JSON,
        required: true
    },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
