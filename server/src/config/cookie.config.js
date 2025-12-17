const jwtConfig = require("./jwt.config");

module.exports = {
  refreshToken: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true
  }
}