const express = require('express');

const router = express.Router();
const { Ticket } = require('../db/models');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const result = await Ticket.findAll();
  res.json(result);
});

module.exports = router;
