const mongoose = require('mongoose');
const News = require('../models/news');

// get: '/'
exports.getAllNews = (req, res) => {
  News.find()
    .select('_id author content date imageUrl')
    .then((result) => res.status(200).json({ count: result.length, news: result }))
    .catch((err) => res.status(500).json({ error: err }));
};

// get: '/newsId'
exports.getSpecificNews = (req, res) => {
  News.findById(req.params.newsId)
    .select('_id author content date imageUrl')
    .then((result) => {
      result
        ? res.status(200).json(result)
        : res.status(404).json({ message: 'Sorry, specific news not found in DB' });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// post: '/'
exports.createNewNews = (req, res) => {
  const newNews = new News({
    _id: new mongoose.Types.ObjectId(),
    author: req.body.author,
    content: req.body.content,
    date: req.body.date,
    imageUrl: req.body.imageUrl,
  });

  newNews
    .save()
    .then((result) => res.status(201).json({ message: 'News was created and saved in DB', createdNews: result }))
    .catch((err) => res.status(500).json({ error: err }));
};

/**
 * patch: '/newsId'
 *
 * We need to send an array in req.body instead an object as usual. Because obj is not iterable in for-of cycle.
 * Example:
 *          [
 *            {"name": "imageUrl", "value": "/chemistry.png"},
 *            {"name": "content", "value": "some recipes on about how to make meth"}
 *          ]
 */
exports.modifySpecificNews = (req, res) => {
  const updateProps = {};
  for (const prop of req.body) {
    updateProps[prop.name] = prop.value;
  }

  News.updateOne({ _id: req.params.newsId }, { $set: updateProps })
    .then((result) => {
      if (result.nModified > 0 && result.n > 0) {
        res.status(200).json({ message: 'Specific news was updated', 'Low-level information': result });
      } else if (result.nModified === 0 && result.n > 0) {
        res.status(208).json({ message: 'Specific news already has these params' });
      } else {
        res.status(404).json({ message: 'Sorry, specific news not found in DB' });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// delete: '/newsId'
exports.deleteSpecificNews = (req, res) => {
  News.deleteOne({ _id: req.params.newsId })
    .then((result) => {
      result.deletedCount > 0
        ? res.status(200).json({ message: 'Specific news was deleted', 'Low-level information': result })
        : res.status(404).json({ message: 'Sorry, specific news not found in DB' });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
