
import s from 'http-status';
import has from 'has-keys';

import webhookModel from './model';

export default {
    async getWebhook(req, res) {
        let data = await webhookModel.getAll();
        if (!data) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        res.json({ status: true, message: 'success', data });
    },
    
    async getWebhookById(req, res) {
        if (!has(req.params, 'id')) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let {id} = req.params;
        let data = await webhookModel.getById(id);
        if (!data) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        res.json({ status: true, message: 'success', data });
    },

    async writeWebhook(req, res) {
        if (!Array.isArray(req.body)) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let validElements = req.body.array.filter( element => {
            return has(element, ['authCookie', 'roomId', 'roomName', 'senderId']);
        });

        if (validElements.length == 0) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        var result = [];
        validElements.array.forEach(element => {
            let data = await webhookModel.create(element);
            result.push({_id: data._id});
        });


        res.json({ status: true, message: 'success', data._id });
    },

    async deleteWebhook(req, res) {
        if (!Array.isArray(req.body)) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let validElements = req.body.array.filter( element => {
            return has(element, ['_id']);
        });

        if (validElements.length == 0) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        validElements.array.forEach(element => {
            let data = await webhookModel.destory(element);
        });

        res.json({ status: true, message: 'success' });
    },

    async deleteWebhookById(req, res) {
        if (!has(req.params, 'id')) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let {id} = req.params;

        let data = await webhookModel.destory({where:{id}});

        res.json({ status: true, message: 'success' });
    },

}