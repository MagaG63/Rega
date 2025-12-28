const AuthController = require('../controllers/auth.controller');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models')
const generateTokens = require("../utils/generateTokens");
const cookieConfig = require("../config/cookie.config");

const authRouter = require('express').Router();

authRouter.post('/registration', AuthController.registration);
authRouter.get('/refresh', AuthController.refresh);
authRouter.get('/logout', AuthController.logout);
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'Fill fields' });
    }

const foundUser = await User.findOne({
  where: { email },
});
if (!foundUser) return res.status(401).json({ message: 'User not found' });

const valid = await bcrypt.compare(password, foundUser.hashpass);
if (!valid) return res.status(401).json({ message: 'Incorrect password' });

const user = foundUser.get();
delete user.hashpass;
const { accessToken, refreshToken } = generateTokens({ user });

return res
  .cookie('refreshToken', refreshToken, cookieConfig)
  .status(200)
  .json({ accessToken, user });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = authRouter;
