
import {ObjectId} from "mongodb"
import db from '../../provider/mongo.database.provider';
import { isObjectBindingPattern } from 'typescript';

const webhook = {
    async getAll() {
        let dbo = await db.getDbo();
        let result = await dbo.collection('webhook').find().toArray();
        return result;
    },
    
    async getById(id) {
        let dbo = await db.getDbo();
        let result = await dbo.collection('webhook').find({_id: new ObjectId(id)}).toArray();
        return result;
    },

    async create(hook) {
        let dbo = await db.getDbo();
        return (await dbo.collection('webhook').insertOne(hook)).ops[0];
    },

    async update(id, hook) {
        let dbo = await db.getDbo();
        return await dbo.collection('webhook').findOneAndUpdate( {_id: new ObjectId(id)}, {$set: hook}, { returnNewDocument: true });
    },

    async delete(id) {
        let dbo = await db.getDbo();
        return dbo.collection('webhook').deleteOne({_id: new ObjectId(id)});
    }
}

export default webhook;