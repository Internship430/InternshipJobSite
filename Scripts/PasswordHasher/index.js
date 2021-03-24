let crypto = require('crypto');
let util = require('util');

const HASH_ALGO = 'sha512';

const HASH_ITERATIONS = 100000;

const HASH_SALT_BYTES = 16;
const HASH_BYTES = 64;

const atob = input => Buffer.from(input, 'base64');
const btoa = input => input.toString('base64').replace(/\=+$/, '');

const h = util.promisify(crypto.pbkdf2);
const pbkdf2 = (input, salt) => h(input, salt, HASH_ITERATIONS, HASH_BYTES, HASH_ALGO);

const gs = util.promisify(crypto.randomBytes);
const generateSalt = () => gs(HASH_SALT_BYTES);

const normalize = str => Buffer.from(String(str).normalize('NFKC'));

const hash = async str => {
  const salt = await generateSalt();
  const result = await pbkdf2(normalize(str), salt);
  return `${btoa(salt)}.${btoa(result)}`;
};

const verify = async (hash, str) => {
  if (typeof hash !== 'string') return false; // invalid input
  if (typeof str !== 'string') return false; // invalid input
  if (hash.length > 120) return false; // hash is impossibly long

  const [salt, result] = hash.split('.');

  const result2 = await pbkdf2(normalize(str), atob(salt));
  return result === btoa(result2);
};

module.exports = {
    hash,
    verify
}