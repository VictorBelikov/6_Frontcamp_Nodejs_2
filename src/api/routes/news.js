const express = require('express');
const newsController = require('../controllers/news');

const router = express.Router();

const getNewNews = (request) => {
  return {
    author: request.body.author,
    content: request.body.content,
    imageUrl: request.body.imageUrl,
  };
};

const commonNewsHandler = (req, res, newNews) => {
  const method = req.method.toLowerCase();
  newsController.getSpecificNews(+req.params.newsId, method)
    .then((index) => {
      if (index >= 0) {
        switch (method) {
          case 'put':
            return newsController.updateSpecificNews(index, newNews);
          case 'delete':
            return newsController.delSpecificNews(index);
          default:
            throw new Error('this route can\'t be proccessed');
        }
      }
      return 'not found';
    })
    .then((result) => {
      if (result === 'not found') {
        return res.status(404).json({ message: 'Specific news not found in DB' });
      }
      res.status(200).json({ message: `Specific news handled by ${method} method` });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

router.get('/', (req, res) => {
  newsController.getAllNews()
    .then((news) => res.status(200).json(news))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/:newsId', (req, res) => {
  newsController.getSpecificNews(+req.params.newsId, req.method.toLowerCase())
    .then((news) => {
      if (news) {
        res.status(200).json(news);
      } else {
        res.status(404).json({ message: 'Specific news not found in DB' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/', (req, res) => {
  const newNews = getNewNews(req);

  newsController.saveNews(newNews).then(() => {
    res.status(201).json({ message: 'News saved in DB' });
  })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put('/:newsId', (req, res) => {
  const newNews = getNewNews(req);
  commonNewsHandler(req, res, newNews);
});

router.delete('/:newsId', (req, res) => {
  commonNewsHandler(req, res);
});

module.exports = router;
