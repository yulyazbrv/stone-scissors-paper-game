const { randomBytes } = require('crypto');

class KeyGenerator {
  static generateKey(length) {
    return randomBytes(length).toString('hex');
  }
}

module.exports = KeyGenerator;