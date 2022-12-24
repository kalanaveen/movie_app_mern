const crypto = require('crypto');

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buf) => {
      if (err) reject(err);

        const bufString = buf.toString('hex');
        
        resolve(bufString)
    });
  });
};

exports.handleNotFound = (req,res) => {
    this.sendError(res,'Not Found')
}