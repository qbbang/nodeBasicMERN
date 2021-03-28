
import {ObjectId} from "mongodb"
import { isObjectBindingPattern } from 'typescript';
import MongoDBProvider from "../../provider/mongo.database.provider";

const dbo = new MongoDBProvider('webhook');

interface Webhook {
    _id: string;
    authCookie: string;
    category: string;
    roomId: string;
    roomName: string;
    senderId: string;
}

const webhook = {
    async getAll() {
        let result = await dbo.find<Webhook>(null);
        return result;
    },
    
    async getById(id) {
        let result = await dbo.find<Webhook>({_id: new ObjectId(id)});
        return result.length > 0 ? result[0] : {};
    },

    async create(hook) {
        return await dbo.insertOne<Webhook>(hook)
    },

    async update(id, hook) {
        return await dbo.findOneAndUpdate<Webhook>({_id: new ObjectId(id)}, {$set: hook}, { returnNewDocument: true });
    },

    async delete(id) {
        return dbo.deleteOne({_id: new ObjectId(id)});
    }
}

export default webhook;