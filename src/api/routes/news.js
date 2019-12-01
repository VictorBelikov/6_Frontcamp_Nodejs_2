const express = require('express');
const newsController = require('../controllers/news');

const router = express.Router();

router.get('/', (req, res) => {
  // .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:newsId', (req, res) => {});

router.post('/', (req, res) => {});

router.patch('/:newsId', (req, res) => {});

router.delete('/:newsId', (req, res) => {});

module.exports = router;
