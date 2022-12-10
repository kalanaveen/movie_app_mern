const crypto = require('crypto');

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(127, (err, buf) => {
      if (err) return reject(err);

        const bufString = buf.toString('hex');
        
        resolve(bufString)
    });
  });
};
