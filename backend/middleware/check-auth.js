const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // process.env.JWT_KEY
  try {
    console.log('Request Headers', req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = {
      email: decodedToken.email,
      fullName: decodedToken.fullName,
      userId: decodedToken.userId
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth Failed.'
    });
  }
};