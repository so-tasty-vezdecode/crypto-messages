const functions = require("firebase-functions");
const cryptoJS = require('crypto-js');
const nodeCrypto = require('crypto');
const promisify = require('util').promisify;
const cors = require('cors')({
    origin: true,
});

const admin = require('firebase-admin');
admin.initializeApp();

const promisifiedRandmBytes = promisify(nodeCrypto.randomBytes);

exports.encrypt = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        const body = request.body;

        const secretKeyBuffer = await promisifiedRandmBytes(48);
        const secretKey = secretKeyBuffer.toString('hex');

        const encryptedMessage = cryptoJS.AES.encrypt(body, secretKey).toString();

        await admin.firestore().collection('crypto-messages').doc().set({
            'encrypted-message': encryptedMessage,
            'secret-key': secretKey,
        })

        response.json({ encryptedMessage, secretKey });
    });
});

exports.decrypt = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        const { secretKey, encryptedMessage } = request.body;

        const document = await admin.firestore()
            .collection('crypto-messages')
            .where('encrypted-message', '==', encryptedMessage)
            .where('secret-key', '==', secretKey)
            .get();

        if (!document.empty) {
            const decryptedMessage = cryptoJS.AES.decrypt(encryptedMessage, secretKey).toString(cryptoJS.enc.Utf8);

            response.json({ decryptedMessage });

            return;
        }

        response.statusCode = 404;
        response.send('Not found');
    });
});