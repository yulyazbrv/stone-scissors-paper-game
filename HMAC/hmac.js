const crypto = require('crypto');

class HMAC {
  static generateHmac(move, key) {
    return crypto.createHmac('sha256', key).update(move).digest('hex');
  }
}

module.exports = HMAC;