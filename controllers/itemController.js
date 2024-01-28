const Item = require('../models/itemModel');

//Get single item from the database
exports.getSingleItems = async (req, res) => {
    try {
        const item = await Item.find({"slug" :req.params.id}); 
        return res.status(200).json(item); 
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

//List all the items in database
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Create a new item in database
exports.createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update existing item in database
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.find({"slug" :req.params.id}); 
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        if (req.body.name) {
            item.name = req.body.name;
        }
        
        if (req.body.description) {
            item.description = req.body.description;
        }
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete item using id
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.find({"slug" :req.params.id}); 
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
