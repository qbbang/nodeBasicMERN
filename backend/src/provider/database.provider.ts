

export default interface IDatabaseProvider {
    find<T>(query?: Object, option?: Object): Promise<[T]>;
    insertOne<T>(doc: T, option?: Object, callback?:(()=>{})): Promise<T>;
    findOneAndUpdate<T>(filter: Object, update: Object, option?: object, callback?:(()=>{})): Promise<T>;
    deleteOne(filter: Object, option?: Object, callback?:(()=>{})): Promise<Object>;
}