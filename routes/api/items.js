const router = require("express").Router();

// Item Model
const Item = require("../../models/Item");

// @Route GET api/items
// @desc GET All Items
// @access Public
router.get("/", async (req, res) => {
  await Item.find()
    .then(items => res.json(items))
    .catch(err => res.json(res.status + ", Error: " + err));
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
    .catch(err => res.json(res.status + ", Error: " + err));
});

module.exports = router;
