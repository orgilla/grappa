import Hashids from 'hashids';
import type from './type';
import Adapter from './adapter';

export default options => {
  if (!options.uri) {
    throw new Error('Missing URI for mongodb');
  }

  const dictionary =
    options.dictionary ||
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._*';

  const adapter = new Adapter(options);

  return {
    resolvers: {
      ID: type(options.hash ? new Hashids(options.hash, 0, dictionary) : null)
    },
    context: async () => {
      const db = await adapter.connectToDatabase();
      return {
        updateOne: adapter.updateOne,
        findOne: adapter.findOne,
        find: adapter.find,
        done: adapter.done,
        transform: adapter.transform,
        toID: adapter.toID,

        adapter,
        collection: db.collection,
        db
      };
    }
  };
};
