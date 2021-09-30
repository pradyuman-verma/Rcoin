const crypto = require('crypto');
const elliptic = require('elliptic');
const EdDSA = elliptic.eddsa;
const ec = new EdDSA('ed25519');

const chaincode = '0ffaa74d206930aaece253f090c88dbe6685b9e66ec49ad988d84fd7dff230d1';

class ECDSA{
    generateKey(password) {
        const key = crypto.pbkdf2Sync(password, chaincode, 100000, 512, 'sha512');
        console.debug(key);
        return key;
    }
 
    generatePair(key) {
        const keyPair = ec.keyFromSecret(key);
        console.debug(elliptic.utils.toHex(keyPair.getPublic()));
        return keyPair;
    }

    signHash(keyPair, message) {
        const signature = keyPair.sign(message).toHex().toLowerCase();
        console.log(signature);
        return signature;
    }

    verifySign(pubKey, signature, message) {
        
    }
}

module.exports = ECDSA;