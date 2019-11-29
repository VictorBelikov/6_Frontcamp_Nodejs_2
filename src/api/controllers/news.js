const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pathToNews = path.join(__dirname, '../../assets/data/news.json');

const getAllNews = () => readFile(pathToNews)
  .then((allNews) => JSON.parse(allNews))
  .catch((err) => console.log(`Read file error: ${err}`));

const getSpecificNews = (id, method) => getAllNews()
  .then((allNewsJson) => {
    if (method === 'get') {
      return allNewsJson.find((news) => news.id === id);
    }
    return allNewsJson.findIndex((news) => news.id === id);
  });

const saveAllNews = (allNews) => writeFile(pathToNews, JSON.stringify(allNews));

const saveNews = (news) =>
  getAllNews()
    .then((allNewsJson) => {
      const newId = allNewsJson[allNewsJson.length - 1].id + 1;
      // const newNews = Object.assign({}, news, { id: newId }); // old way
      const newNews = { ...news, id: newId };
      return saveAllNews(allNewsJson.concat(newNews));
    });

const delSpecificNews = (index) => {
  getAllNews()
    .then((allNewsJson) => {
      const allTheNews = [...allNewsJson];
      allTheNews.splice(index, 1);
      return saveAllNews(allTheNews);
    })
    .catch((err) => console.log(`Read file error: ${err}`));
};

const updateSpecificNews = (index, news) => {
  getAllNews()
    .then((allNewsJson) => {
      const allTheNews = [...allNewsJson];
      allTheNews[index] = { ...news, id: allTheNews[index].id };
      return saveAllNews(allTheNews);
    })
    .catch((err) => console.log(`Read file error: ${err}`));
};


module.exports = {
  getAllNews,
  saveNews,
  getSpecificNews,
  delSpecificNews,
  updateSpecificNews,
};
