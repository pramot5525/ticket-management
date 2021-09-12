const express = require('express');

const router = express.Router();
const { Ticket } = require('../db/models');

router.get('/tickets', async (req, res) => {
  let orderBy = 'updatedAt';
  if (req.query.sort === 'status') {
    orderBy = 'status';
  } else if (req.query.sort && req.query.sort !== 'latest') {
    throw new Error('Wrong status');
  }
  let status = ['pending', 'accepted', 'resolved', 'rejected'];
  if (req.query.filter && ['all', 'pending', 'accepted', 'resolved', 'rejected'].includes(req.query.filter)) {
    if (req.query.filter !== 'all') {
      status = [req.query.filter];
    }
  } else if (req.query.filter) {
    throw new Error('Wrong status');
  }

  const results = await Ticket.findAll({ where: { status }, order: [[orderBy, 'DESC']] });
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

router.patch('/ticket/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title, description, contactInformation, status,
  } = req.body;
  try {
    await Ticket.update(
      {
        title, description, contact_information: contactInformation, status,
      },
      {
        where: { id },
      },
    );
    const ticket = await Ticket.findByPk(id);
    res.status(200).json({
      status: 'ok',
      results: { ticket },

    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      errors: err.errors,
    });
  }
});
module.exports = router;
