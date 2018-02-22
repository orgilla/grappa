import { MongoClient, ObjectID } from 'mongodb';
import { parse } from 'querystring';

const transform = item => {
  if (Array.isArray(item)) {
    return item.map(transform);
  } else if (item && item._id) {
    return { ...item, id: item._id };
  }
  return item;
};

const done = async x => {
  if (x && x.toArray) {
    x = x.toArray();
  }
  x = await Promise.resolve(x);
  return transform(x);
};

const toID = x => {
  if (!x) {
    return x;
  }
  return new ObjectID(x);
};

export default class Adapter {
  done = done;
  transform = transform;
  toID = toID;

  cachedDb = null;
  _cachedDb = null;
  uri = null;

  constructor({ uri, before, after }) {
    this.uri = uri;
    this.before = before;
    this.after = after;
    this.connectToDatabase();
  }

  // Connection
  connectToDatabase = () => {
    if (this.cachedDb && this.cachedDb.serverConfig.isConnected()) {
      return Promise.resolve(this.cachedDb);
    }

    const split = this.uri.split('/');
    const dbNamePart = split.pop();
    const [dbName, queryStr] = dbNamePart.split('?');
    const query = (queryStr && parse(queryStr)) || {};
    if (query.ssl == 'true') {
      query.ssl = true;
    }
    return MongoClient.connect(this.uri, query).then(async db => {
      this._cachedDb = db;
      this.cachedDb = db.db(dbName);
      return this.cachedDb;
    });
  };
  getDB = async () => {
    await this.connectToDatabase();
    return this.cachedDb;
  };
  close = () => {
    if (this.cachedDb && this.cachedDb.serverConfig.isConnected()) {
      return this._cachedDb.close();
    }
    return Promise.resolve();
  };

  // Methods
  enhance = async (method, collection, ...args) => {
    if (this.before) {
      await Promise.resolve(this.before(method, collection, ...args));
    }
    let result;
    if (typeof collection === 'string') {
      const db = await this.connectToDatabase();
      result = await db.collection(collection)[method](...args);
    } else {
      result = await collection()[method](...args);
    }
    return result;
  };
  finish = async (method, collection, result) => {
    result = await done(result);
    if (this.after) {
      result =
        (await Promise.resolve(this.after(method, collection, result))) ||
        result;
    }
    return result;
  };
  findOne = async (collection, filter) => {
    let result;
    if (typeof filter === 'string') {
      result = await this.enhance('findOne', collection, {
        _id: new ObjectID(filter)
      });
    } else {
      result = this.enhance('findOne', collection, filter);
    }
    return this.finish('findOne', collection, result);
  };
  updateOne = async (collection, query, data) => {
    if (!data) {
      data = query || {};
      query = null;
    } else if (query && typeof query === 'string') {
      query = { _id: new ObjectID(query) };
    } else if (query && query instanceof ObjectID) {
      query = { _id: query };
    }

    let result;
    if (query) {
      result = (await this.enhance(
        'findAndModify',
        collection,
        query,
        [],
        { $set: data },
        {
          remove: false,
          new: true,
          upsert: true
        }
      )).value;
    } else {
      result = (await this.enhance('insertOne', collection, data)).ops[0];
    }
    return this.finish('insertOne', collection, result);
  };
  find = async (collection, filter, ...args) => {
    let result;
    if (filter && Array.isArray(filter)) {
      result = (await this.enhance('find', collection, {
        _id: { $in: filter.map(x => new ObjectID(x)) }
      })).toArray();
    } else {
      result = (await this.enhance(
        'find',
        collection,
        filter,
        ...args
      )).toArray();
    }
    return this.finish('find', collection, result);
  };
}
