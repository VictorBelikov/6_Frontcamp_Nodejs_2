const globaErrHandler = (err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    pageTitle: '!! ERROR !!',
    errName: err.name,
    errMessage: err.message,
    errDescr: err,
    path: '/error',
  });
};

module.exports = globaErrHandler;
