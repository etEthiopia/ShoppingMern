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

module.exports = router;
