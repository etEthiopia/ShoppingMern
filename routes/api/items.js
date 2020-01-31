const router = require("express").Router();

// Item Model
const Item = require("../../models/Item");

// @Route GET api/items
// @desc GET All Items
// @access Public
router.get("/", async (req, res) => {
    await Item.find()
        .sort({
            date: -1
        })
        .then(items => res.json(items))

        .catch(err => res.json({
            Error: err,
            success: false
        }))
});

// @Route POST api/items
// @desc Create an Item
// @access Public
router.post("/", async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    await newItem
        .save()
        .then(item => res.json(item))
        .catch(err => res.json({
            Error: err,
            success: false
        }))
});

// @Route DELETE api/items
// @desc Delete an Item
// @access Public
router.delete("/:id", async (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => {
            res.json({
                success: true
            })
        }).catch(err => res.json({
            Error: err,
            success: false
        })))
        .catch(err => res.json({
            Error: err,
            success: false
        }))
});

module.exports = router;