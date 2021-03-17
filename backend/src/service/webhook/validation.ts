var Joi = require('joi');

module.exports = {
    Webhook: {
        roomName: Joi.string().required(),
        roomId: Joi.string().required(),
        senderId: Joi.string().required(),
        authCookie: Joi.string().required(),
    },
    WebhookArray:[
        Joi.object({
            roomName: Joi.string().required(),
            roomId: Joi.string().required(),
            senderId: Joi.string().required(),
            authCookie: Joi.string().required(),
        })
    ],
    WebhookID: Joi.string().required(),
    WebhookIDArray: [
        Joi.object({
            _id: Joi.string().required()
        }),
    ],
};
