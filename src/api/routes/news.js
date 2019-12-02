const express = require('express');
const newsController = require('../controllers/news');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', newsController.getAllNews);
router.get('/:newsId', newsController.getSpecificNews);
router.post('/', newsController.createNewNews);
router.patch('/:newsId', auth, newsController.modifySpecificNews);
router.delete('/:newsId', auth, newsController.deleteSpecificNews);

module.exports = router;
