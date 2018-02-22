import Hashids from 'hashids';
import type from './type';
import {
  connectionString,
  connectToDatabase,
  updateOne,
  findOne,
  find,
} from './db';
export * from './db';

export default options => {
  if (!options.uri) {
    throw new Error('Missing URI for mongodb');
  }

  const password = options.password;
  const dictionary =
    options.dictionary ||
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._*';

  const promise = connectToDatabase(options.uri);
  return {
    resolvers: {
      ID: type(options.hash ? new Hashids(options.hash, 0, dictionary) : null),
    },
    context: async props => {
      const db = await promise;
      return {
        updateOne,
        findOne,
        find,
        db,
      };
    },
  };
};
