
import s from 'http-status';
import has from 'has-keys';

import webhookModel from './model';
import daouMessangerProvider from '../../provider/daou.messanger.provider';

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

        let validElements = req.body.filter( element => {
            return has(element, ['authCookie', 'roomId', 'roomName', 'senderId']);
        });

        if (validElements.length == 0) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        var data = [];
        try {
            validElements.forEach(async element => {
                let hook = await webhookModel.create(element);
                data.push({_id: hook._id});
            });
        } catch (e) {
            throw { code: s.INTERNAL_SERVER_ERROR, message: e.message }
        }

        res.json({ status: true, message: 'success', data } );
    },

    async writeWebhookById(req, res) {
        if (!has(req.params, 'id') || 
            !has(req.body, ['authCookie', 'roomId', 'roomName', 'senderId'])) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let {id} = req.params;
        let data = await webhookModel.update(id, req.body);

        res.json({ status: true, message: 'success', data });
    },

    async deleteWebhook(req, res) {
        if (!Array.isArray(req.body)) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let validElements = req.body.filter( element => {
            return has(element, ['_id']);
        });

        if (validElements.length == 0) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        validElements.forEach(async element => {
            let data = await webhookModel.delete(element._id);
        });

        res.json({ status: true, message: 'success' });
    },

    async deleteWebhookById(req, res) {
        if (!has(req.params, 'id')) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let {id} = req.params;

        let data = await webhookModel.delete(id);

        res.json({ status: true, message: 'success' });
    },

    async sendHookMessage(req, res) {
        if (!has(req.params, 'id') || !has(req.body, 'messsage')) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let {message} = req.body;
        let {id} = req.params;
        
        let hook = webhookModel.getById(id);

        if (!hook) {
            throw { code: s.BAD_REQUEST, message: 'You must check fields' };
        }

        let data = await daouMessangerProvider.sendMessage(hook, message);
        
        res.json({ status: true, message: 'success', data });
    }
}