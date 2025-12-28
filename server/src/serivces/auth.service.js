const bcrypt = require('bcrypt');
const { User } = require('../../db/models')

class AuthService {
  static async registrate({ name, email, password }) {
    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        hashpass
      }
    })

    if (!created) {
      throw new Error("email уже занят")
    }

    const plainUser = user.get();

    delete plainUser.hashpass

    return plainUser

  }
}

module.exports = AuthService;