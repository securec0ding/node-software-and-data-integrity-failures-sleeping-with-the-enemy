
module.exports = function (tokens, req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  return [
    tokens.date(req, res, 'iso'),
    tokens.method(req, res),
    fullUrl,
    tokens.status(req, res),
  ].join(' ')
};