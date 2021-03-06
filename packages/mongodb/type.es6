import { GraphQLScalarType } from 'graphql';
import { ObjectID } from 'mongodb';
import { Kind } from 'graphql/language';

export default hashids =>
  new GraphQLScalarType({
    name: 'ID',
    description: 'ID type',
    parseValue(value) {
      try {
        if (!hashids) {
          return new ObjectID(value);
        }
        return new ObjectID(hashids.decodeHex(value)); // value from the client
      } catch (err) {
        return value; // value from the client
      }
    },
    serialize(value) {
      if (!hashids) {
        return value.toString();
      }
      return hashids.encodeHex(value.toString()); // value sent to the client
    },
    parseLiteral(ast) {
      /*
if (ast.kind === Kind.STRING && ast.value.length === 24) {
      return new ObjectID(ast.value); // ast value is always in string format
    } else 
    */
      if (ast.kind === Kind.STRING) {
        try {
          if (!hashids) {
            return new ObjectID(ast.value);
          }
          return new ObjectID(hashids.decodeHex(ast.value)); // value from the client
        } catch (err) {
          return ast.value; // value from the client
        }
      }
      return null;
    },
  });
