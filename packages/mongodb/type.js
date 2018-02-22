'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _mongodb = require('mongodb');

var _language = require('graphql/language');

exports.default = function (hashids) {
  return new _graphql.GraphQLScalarType({
    name: 'ID',
    description: 'ID type',
    parseValue: function parseValue(value) {
      try {
        if (!hashids) {
          return new _mongodb.ObjectID(value);
        }
        return new _mongodb.ObjectID(hashids.decodeHex(value)); // value from the client
      } catch (err) {
        return value; // value from the client
      }
    },
    serialize: function serialize(value) {
      if (!hashids) {
        return value.toString();
      }
      return hashids.encodeHex(value.toString()); // value sent to the client
    },
    parseLiteral: function parseLiteral(ast) {
      /*
      if (ast.kind === Kind.STRING && ast.value.length === 24) {
      return new ObjectID(ast.value); // ast value is always in string format
      } else 
      */
      if (ast.kind === _language.Kind.STRING) {
        try {
          if (!hashids) {
            return new _mongodb.ObjectID(ast.value);
          }
          return new _mongodb.ObjectID(hashids.decodeHex(ast.value)); // value from the client
        } catch (err) {
          return ast.value; // value from the client
        }
      }
      return null;
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL21vbmdvZGIvdHlwZS5lczYiXSwibmFtZXMiOlsibmFtZSIsImRlc2NyaXB0aW9uIiwicGFyc2VWYWx1ZSIsInZhbHVlIiwiaGFzaGlkcyIsImRlY29kZUhleCIsImVyciIsInNlcmlhbGl6ZSIsInRvU3RyaW5nIiwiZW5jb2RlSGV4IiwicGFyc2VMaXRlcmFsIiwiYXN0Iiwia2luZCIsIlNUUklORyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O2tCQUVlO0FBQUEsU0FDYiwrQkFBc0I7QUFDcEJBLFVBQU0sSUFEYztBQUVwQkMsaUJBQWEsU0FGTztBQUdwQkMsY0FIb0Isc0JBR1RDLEtBSFMsRUFHRjtBQUNoQixVQUFJO0FBQ0YsWUFBSSxDQUFDQyxPQUFMLEVBQWM7QUFDWixpQkFBTyxzQkFBYUQsS0FBYixDQUFQO0FBQ0Q7QUFDRCxlQUFPLHNCQUFhQyxRQUFRQyxTQUFSLENBQWtCRixLQUFsQixDQUFiLENBQVAsQ0FKRSxDQUk2QztBQUNoRCxPQUxELENBS0UsT0FBT0csR0FBUCxFQUFZO0FBQ1osZUFBT0gsS0FBUCxDQURZLENBQ0U7QUFDZjtBQUNGLEtBWm1CO0FBYXBCSSxhQWJvQixxQkFhVkosS0FiVSxFQWFIO0FBQ2YsVUFBSSxDQUFDQyxPQUFMLEVBQWM7QUFDWixlQUFPRCxNQUFNSyxRQUFOLEVBQVA7QUFDRDtBQUNELGFBQU9KLFFBQVFLLFNBQVIsQ0FBa0JOLE1BQU1LLFFBQU4sRUFBbEIsQ0FBUCxDQUplLENBSTZCO0FBQzdDLEtBbEJtQjtBQW1CcEJFLGdCQW5Cb0Isd0JBbUJQQyxHQW5CTyxFQW1CRjtBQUNoQjs7Ozs7QUFLQSxVQUFJQSxJQUFJQyxJQUFKLEtBQWEsZUFBS0MsTUFBdEIsRUFBOEI7QUFDNUIsWUFBSTtBQUNGLGNBQUksQ0FBQ1QsT0FBTCxFQUFjO0FBQ1osbUJBQU8sc0JBQWFPLElBQUlSLEtBQWpCLENBQVA7QUFDRDtBQUNELGlCQUFPLHNCQUFhQyxRQUFRQyxTQUFSLENBQWtCTSxJQUFJUixLQUF0QixDQUFiLENBQVAsQ0FKRSxDQUlpRDtBQUNwRCxTQUxELENBS0UsT0FBT0csR0FBUCxFQUFZO0FBQ1osaUJBQU9LLElBQUlSLEtBQVgsQ0FEWSxDQUNNO0FBQ25CO0FBQ0Y7QUFDRCxhQUFPLElBQVA7QUFDRDtBQXBDbUIsR0FBdEIsQ0FEYTtBQUFBLEMiLCJmaWxlIjoicGFja2FnZXMvbW9uZ29kYi90eXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTFNjYWxhclR5cGUgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCB7IE9iamVjdElEIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgeyBLaW5kIH0gZnJvbSAnZ3JhcGhxbC9sYW5ndWFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hpZHMgPT5cbiAgbmV3IEdyYXBoUUxTY2FsYXJUeXBlKHtcbiAgICBuYW1lOiAnSUQnLFxuICAgIGRlc2NyaXB0aW9uOiAnSUQgdHlwZScsXG4gICAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFoYXNoaWRzKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RJRCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBPYmplY3RJRChoYXNoaWRzLmRlY29kZUhleCh2YWx1ZSkpOyAvLyB2YWx1ZSBmcm9tIHRoZSBjbGllbnRcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gdmFsdWU7IC8vIHZhbHVlIGZyb20gdGhlIGNsaWVudFxuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWFsaXplKHZhbHVlKSB7XG4gICAgICBpZiAoIWhhc2hpZHMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzaGlkcy5lbmNvZGVIZXgodmFsdWUudG9TdHJpbmcoKSk7IC8vIHZhbHVlIHNlbnQgdG8gdGhlIGNsaWVudFxuICAgIH0sXG4gICAgcGFyc2VMaXRlcmFsKGFzdCkge1xuICAgICAgLypcbmlmIChhc3Qua2luZCA9PT0gS2luZC5TVFJJTkcgJiYgYXN0LnZhbHVlLmxlbmd0aCA9PT0gMjQpIHtcbiAgICAgIHJldHVybiBuZXcgT2JqZWN0SUQoYXN0LnZhbHVlKTsgLy8gYXN0IHZhbHVlIGlzIGFsd2F5cyBpbiBzdHJpbmcgZm9ybWF0XG4gICAgfSBlbHNlIFxuICAgICovXG4gICAgICBpZiAoYXN0LmtpbmQgPT09IEtpbmQuU1RSSU5HKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFoYXNoaWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9iamVjdElEKGFzdC52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgT2JqZWN0SUQoaGFzaGlkcy5kZWNvZGVIZXgoYXN0LnZhbHVlKSk7IC8vIHZhbHVlIGZyb20gdGhlIGNsaWVudFxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gYXN0LnZhbHVlOyAvLyB2YWx1ZSBmcm9tIHRoZSBjbGllbnRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgfSk7XG4iXX0=
