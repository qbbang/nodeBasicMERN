import IDatabaseProvider from "./database.provider";
import admin from 'firebase-admin';


export default class FirebaseRealTimeDBProvider implements IDatabaseProvider{
    _db = admin.database();
    _path?: string;
    constructor(path) {
        this._path = path;
    }

    async find<T>(query?: Object, option?: Object): Promise<[T]> {
        var fbQuery = this._db.ref(this._path).orderByKey();

		for (let key in query) {
			fbQuery = fbQuery.ref.orderByChild(key).equalTo(query[key]);
		}
        return new Promise((resolve, reject) => {
    		// query.startAt("1614607116008").limitToFirst(20).once('value', function (snapshot) {
            fbQuery.once('value', function (snapshot) {
                var value = snapshot.val();
                var list = [] as unknown as [T];
                for (let key in value) {
                    list.push(value[key]);
                }
                resolve(list);
            }, function (error) {
                reject(error);
            });
        });
    }
    async insertOne<T>(doc: T, option?: Object, callback?: () => {}): Promise<T> {
        let ref = this._db.ref(this._path);
        let id = doc['_id'] || ref.getKey();
        doc['_id'] = id;
		return ref.set(doc);
    }
    async findOneAndUpdate<T>(filter: Object, update: Object, option?: object, callback?: () => {}): Promise<T> {
		var thisRef = this;
		var query = this._db.ref(this._path).orderByKey();
		for (let key in filter) {
			query = query.ref.orderByChild(key).equalTo(filter[key]);
		}

        return new Promise((resolve, reject) => {
            query.limitToFirst(1).once('value', function (snapshot) {
                var newPostKey = option['new'];
                var data = update['createValue'];
                console.log('snapshot: ' + JSON.stringify(snapshot.val()));
                if (snapshot.exists()) {
                    data = snapshot.val();
                    newPostKey = Object.keys(data)[0];
                    data = data[newPostKey];
                    console.log('data: ' + JSON.stringify(newPostKey));
                    for (var key in update['updateValue']) {
                        if (data[key] === '+') {
                            data[key] = data[key] + 1;
                        } else {
                            data[key] = update['updateValue'][key];
                        }
                    }
                }
                var updates = {} as T;
                updates['/' + newPostKey] = data;
                console.log('data: ' + JSON.stringify(data));
                thisRef._db.ref(this._path).update(updates);
                resolve(updates);
            }, function (error) {
                reject(error);
            });
        });
    }
    async deleteOne(filter: Object, option?: Object, callback?: () => {}): Promise<Object> {
		var ref = this._db.ref(this._path +'/'+ filter['_id']);
		if (ref) {
			return ref.remove();
		} else {
			return Promise.reject();
		}
    }
}