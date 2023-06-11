const jwt = require('jsonwebtoken');

const tokenGenerator = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

module.exports = tokenGenerator;
