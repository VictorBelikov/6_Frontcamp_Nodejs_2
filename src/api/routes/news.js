const express = require('express');
const newsController = require('../controllers/news');

const router = express.Router();

router.get('/', newsController.getAllNews);

router.get('/:newsId', newsController.getSpecificNews);

router.post('/', newsController.createNewNews);

router.patch('/:newsId', newsController.modifySpecificNews);

router.delete('/:newsId', newsController.deleteSpecificNews);

module.exports = router;
