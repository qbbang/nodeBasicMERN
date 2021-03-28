import IDatabaseProvider from './database.provider';
import {ObjectId} from "mongodb"
import { isObjectBindingPattern } from 'typescript';


const {
    DB_URL
} = process.env;

import {MongoClient} from "mongodb"

let conn = new MongoClient(DB_URL, {useUnifiedTopology: true});

export default class MongoDBProvider implements IDatabaseProvider{
    collection: string;

    constructor(path) {
        this.collection = path;
    }
    /**
     * Singleton-like Database Object that connects to the mongodb database
     */
    async getDbo(){
        if(!conn.isConnected())
            await conn.connect();
        return conn.db();
    }

    async find<T>(query?: Object, option?: Object): Promise<[T]> {
        let dbo = await this.getDbo();
        if (query) { 
            return await dbo.collection(this.collection).find(query).toArray();
        } else {
            return await dbo.collection(this.collection).find().toArray();
        }
    }
    async insertOne<T>(doc: T, option?: Object, callback?: () => {}): Promise<T> {
        let dbo = await this.getDbo();
        return (await dbo.collection(this.collection).insertOne(doc)).ops[0];
    }
    async findOneAndUpdate<T>(filter: Object, update: Object, option?: object, callback?: () => {}): Promise<T> {
        let dbo = await this.getDbo();
        return await dbo.collection(this.collection).findOneAndUpdate( filter, update, option);
    }
    async deleteOne(filter: Object, option?: Object, callback?: () => {}): Promise<Object> {
        let dbo = await this.getDbo();
        return dbo.collection(this.collection).deleteOne(filter);
    }
}

