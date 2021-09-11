const express = require('express');

const router = express.Router();
const { Ticket } = require('../db/models');

router.get('/tickets', async (req, res) => {
  const results = await Ticket.findAll();
  res.status(200).json({
    status: 'ok',
    results,
  });
});

router.get('/ticket/:id', async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  if (ticket === null) {
    res.status(404).send('Not found');
  } else {
    res.status(200).json({
      status: 'ok',
      results: ticket,
    });
  }
});
router.post('/ticket/create', async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(200).json({
      status: 'ok',
      results: ticket,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      errors: err.errors,
    });
  }
});

module.exports = router;
