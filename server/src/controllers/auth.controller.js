const cookieConfig = require("../config/cookie.config");
const AuthService = require("../serivces/auth.service");
const generateTokens = require("../utils/generateTokens");
const jwt = require('jsonwebtoken')

class AuthController {
  static async registration(req, res) {
    const data = req.body;
    const user = await AuthService.registrate(data);

    const { refreshToken, accessToken } = generateTokens({ user })

    res.status(201).cookie("refreshToken", refreshToken, cookieConfig.refreshToken).json({ user, accessToken })
  }

  static async refresh(req, res) {
    try {

      const { refreshToken: oldRefreshToken } = req.cookies;
      const { user } = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      const { refreshToken, accessToken } = generateTokens({ user });
      res.cookie("refreshToken", refreshToken, cookieConfig.refreshToken).json({ user, accessToken })
    } catch (err) {
      console.log(err);
      res.sendStatus(401)
    }

  }

  static async logout(req, res) {
    res.clearCookie("refreshToken").sendStatus(204);
  }
}

module.exports = AuthController;