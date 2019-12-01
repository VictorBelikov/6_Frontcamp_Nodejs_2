const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const url = require('url');

const writeFile = promisify(fs.appendFile);
const fileUrl = path.join(__dirname, '../../assets/data/queryLog.txt');

const getFullUrl = (request) => url.format({
  protocol: request.protocol,
  host: request.get('host'),
  pathname: request.originalUrl,
});

const queryLogger = (req, res, next) => {
  const date = new Date();
  const logStr = `\n${date.toLocaleTimeString()} ${date.toLocaleDateString()}: req.method => ${req.method} / req.url => ${getFullUrl(req)}\n`;

  writeFile(fileUrl, logStr)
    .then(() => next())
    .catch((err) => console.log(`Write file error: ${err}`));
};

module.exports = queryLogger;
