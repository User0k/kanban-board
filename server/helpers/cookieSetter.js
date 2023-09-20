const cookieSetter = (res, field, token) => {
  res.cookie(field, token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

module.exports = cookieSetter;
