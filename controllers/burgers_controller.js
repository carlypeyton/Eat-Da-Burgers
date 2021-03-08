const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post('/api/burgers', (req, res) => {
  burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
    res.json({ id: result.insertId });
  });
});

router.put('/api/burgers/:id', (req, res) => {
  var condition = `id = ${req.params.id}`;
  console.log('condition', condition);
  //Change condition to devoured true
  burger.update( { devoured: true }, condition, (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

module.exports = router;
