'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _graphqlYoga = require('graphql-yoga');

var _voyager = require('./voyager');

var _voyager2 = _interopRequireDefault(_voyager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var combine = function combine(plugins) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
      var contexts;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all(plugins.filter(function (x) {
                return x.context;
              }).map(function (x) {
                return x.context(props);
              }));

            case 2:
              contexts = _context.sent;
              return _context.abrupt('return', contexts.reduce(function (store, item) {
                return Object.assign(store, item || {});
              }, {}));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.default = function (_ref2) {
  var _ref2$typeDefs = _ref2.typeDefs,
      typeDefs = _ref2$typeDefs === undefined ? '' : _ref2$typeDefs,
      _ref2$resolvers = _ref2.resolvers,
      resolvers = _ref2$resolvers === undefined ? {} : _ref2$resolvers,
      context = _ref2.context,
      _ref2$plugins = _ref2.plugins,
      plugins = _ref2$plugins === undefined ? [] : _ref2$plugins,
      fieldResolver = _ref2.fieldResolver;

  var lambda = void 0;
  plugins = [{ context: context, typeDefs: typeDefs, resolvers: resolvers }].concat(_toConsumableArray(plugins));
  try {
    resolvers = plugins.filter(function (x) {
      return x.resolvers;
    }).reduce(function (store, item) {
      return Object.assign(store, item.resolvers);
    }, {});
    typeDefs = plugins.filter(function (x) {
      return x.typeDefs;
    }).reduce(function (store, item) {
      return '\n        ' + item.typeDefs + '\n        ' + store + '\n      ';
    }, '');
    context = combine(plugins);
    lambda = new _graphqlYoga.GraphQLServerLambda({
      fieldResolver: fieldResolver,
      typeDefs: typeDefs,
      resolvers: resolvers,
      options: {
        endpoint: null
      },
      context: context
    });
  } catch (err) {
    console.error('Error', err);
    lambda = new _graphqlYoga.GraphQLServerLambda({
      typeDefs: '',
      resolvers: {},
      options: {
        endpoint: null
      }
    });
  }
  return {
    server: function server(event, context, callback) {
      context.callbackWaitsForEmptyEventLoop = false;
      if (!context.headers) {
        context.headers = {};
      }
      context.headers['Access-Control-Allow-Credentials'] = true;
      lambda.graphqlHandler(event, context, callback);
    },
    playground: lambda.playgroundHandler,
    voyager: (0, _voyager2.default)({})
  };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FwaS9pbmRleC5lczYiXSwibmFtZXMiOlsiY29tYmluZSIsInByb3BzIiwiUHJvbWlzZSIsImFsbCIsInBsdWdpbnMiLCJmaWx0ZXIiLCJ4IiwiY29udGV4dCIsIm1hcCIsImNvbnRleHRzIiwicmVkdWNlIiwic3RvcmUiLCJpdGVtIiwiT2JqZWN0IiwiYXNzaWduIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJmaWVsZFJlc29sdmVyIiwibGFtYmRhIiwib3B0aW9ucyIsImVuZHBvaW50IiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic2VydmVyIiwiZXZlbnQiLCJjYWxsYmFjayIsImNhbGxiYWNrV2FpdHNGb3JFbXB0eUV2ZW50TG9vcCIsImhlYWRlcnMiLCJncmFwaHFsSGFuZGxlciIsInBsYXlncm91bmQiLCJwbGF5Z3JvdW5kSGFuZGxlciIsInZveWFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFVBQVUsU0FBVkEsT0FBVTtBQUFBO0FBQUEsMEVBQVcsaUJBQU1DLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDRkMsUUFBUUMsR0FBUixDQUNyQkMsUUFBUUMsTUFBUixDQUFlO0FBQUEsdUJBQUtDLEVBQUVDLE9BQVA7QUFBQSxlQUFmLEVBQStCQyxHQUEvQixDQUFtQztBQUFBLHVCQUFLRixFQUFFQyxPQUFGLENBQVVOLEtBQVYsQ0FBTDtBQUFBLGVBQW5DLENBRHFCLENBREU7O0FBQUE7QUFDbkJRLHNCQURtQjtBQUFBLCtDQUlsQkEsU0FBU0MsTUFBVCxDQUFnQixVQUFDQyxLQUFELEVBQVFDLElBQVI7QUFBQSx1QkFBaUJDLE9BQU9DLE1BQVAsQ0FBY0gsS0FBZCxFQUFxQkMsUUFBUSxFQUE3QixDQUFqQjtBQUFBLGVBQWhCLEVBQW1FLEVBQW5FLENBSmtCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFoQjs7a0JBT2UsaUJBTVQ7QUFBQSw2QkFMSkcsUUFLSTtBQUFBLE1BTEpBLFFBS0ksa0NBTE8sRUFLUDtBQUFBLDhCQUpKQyxTQUlJO0FBQUEsTUFKSkEsU0FJSSxtQ0FKUSxFQUlSO0FBQUEsTUFISlQsT0FHSSxTQUhKQSxPQUdJO0FBQUEsNEJBRkpILE9BRUk7QUFBQSxNQUZKQSxPQUVJLGlDQUZNLEVBRU47QUFBQSxNQURKYSxhQUNJLFNBREpBLGFBQ0k7O0FBQ0osTUFBSUMsZUFBSjtBQUNBZCxhQUFXLEVBQUVHLGdCQUFGLEVBQVdRLGtCQUFYLEVBQXFCQyxvQkFBckIsRUFBWCw0QkFBZ0RaLE9BQWhEO0FBQ0EsTUFBSTtBQUNGWSxnQkFBWVosUUFDVEMsTUFEUyxDQUNGO0FBQUEsYUFBS0MsRUFBRVUsU0FBUDtBQUFBLEtBREUsRUFFVE4sTUFGUyxDQUVGLFVBQUNDLEtBQUQsRUFBUUMsSUFBUjtBQUFBLGFBQWlCQyxPQUFPQyxNQUFQLENBQWNILEtBQWQsRUFBcUJDLEtBQUtJLFNBQTFCLENBQWpCO0FBQUEsS0FGRSxFQUVxRCxFQUZyRCxDQUFaO0FBR0FELGVBQVdYLFFBQVFDLE1BQVIsQ0FBZTtBQUFBLGFBQUtDLEVBQUVTLFFBQVA7QUFBQSxLQUFmLEVBQWdDTCxNQUFoQyxDQUNULFVBQUNDLEtBQUQsRUFBUUMsSUFBUjtBQUFBLDRCQUNJQSxLQUFLRyxRQURULGtCQUVJSixLQUZKO0FBQUEsS0FEUyxFQUtULEVBTFMsQ0FBWDtBQU9BSixjQUFVUCxRQUFRSSxPQUFSLENBQVY7QUFDQWMsYUFBUyxxQ0FBd0I7QUFDL0JELGtDQUQrQjtBQUUvQkYsd0JBRitCO0FBRy9CQywwQkFIK0I7QUFJL0JHLGVBQVM7QUFDUEMsa0JBQVU7QUFESCxPQUpzQjtBQU8vQmI7QUFQK0IsS0FBeEIsQ0FBVDtBQVNELEdBckJELENBcUJFLE9BQU9jLEdBQVAsRUFBWTtBQUNaQyxZQUFRQyxLQUFSLENBQWMsT0FBZCxFQUF1QkYsR0FBdkI7QUFDQUgsYUFBUyxxQ0FBd0I7QUFDL0JILGdCQUFVLEVBRHFCO0FBRS9CQyxpQkFBVyxFQUZvQjtBQUcvQkcsZUFBUztBQUNQQyxrQkFBVTtBQURIO0FBSHNCLEtBQXhCLENBQVQ7QUFPRDtBQUNELFNBQU87QUFDTEksWUFBUSxnQkFBQ0MsS0FBRCxFQUFRbEIsT0FBUixFQUFpQm1CLFFBQWpCLEVBQThCO0FBQ3BDbkIsY0FBUW9CLDhCQUFSLEdBQXlDLEtBQXpDO0FBQ0EsVUFBSSxDQUFDcEIsUUFBUXFCLE9BQWIsRUFBc0I7QUFDcEJyQixnQkFBUXFCLE9BQVIsR0FBa0IsRUFBbEI7QUFDRDtBQUNEckIsY0FBUXFCLE9BQVIsQ0FBZ0Isa0NBQWhCLElBQXNELElBQXREO0FBQ0FWLGFBQU9XLGNBQVAsQ0FBc0JKLEtBQXRCLEVBQTZCbEIsT0FBN0IsRUFBc0NtQixRQUF0QztBQUNELEtBUkk7QUFTTEksZ0JBQVlaLE9BQU9hLGlCQVRkO0FBVUxDLGFBQVMsdUJBQVEsRUFBUjtBQVZKLEdBQVA7QUFZRCxDIiwiZmlsZSI6InBhY2thZ2VzL2FwaS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyYXBoUUxTZXJ2ZXJMYW1iZGEgfSBmcm9tICdncmFwaHFsLXlvZ2EnO1xuaW1wb3J0IHZveWFnZXIgZnJvbSAnLi92b3lhZ2VyJztcblxuY29uc3QgY29tYmluZSA9IHBsdWdpbnMgPT4gYXN5bmMgcHJvcHMgPT4ge1xuICBjb25zdCBjb250ZXh0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHBsdWdpbnMuZmlsdGVyKHggPT4geC5jb250ZXh0KS5tYXAoeCA9PiB4LmNvbnRleHQocHJvcHMpKVxuICApO1xuICByZXR1cm4gY29udGV4dHMucmVkdWNlKChzdG9yZSwgaXRlbSkgPT4gT2JqZWN0LmFzc2lnbihzdG9yZSwgaXRlbSB8fCB7fSksIHt9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh7XG4gIHR5cGVEZWZzID0gJycsXG4gIHJlc29sdmVycyA9IHt9LFxuICBjb250ZXh0LFxuICBwbHVnaW5zID0gW10sXG4gIGZpZWxkUmVzb2x2ZXJcbn0pID0+IHtcbiAgbGV0IGxhbWJkYTtcbiAgcGx1Z2lucyA9IFt7IGNvbnRleHQsIHR5cGVEZWZzLCByZXNvbHZlcnMgfSwgLi4ucGx1Z2luc107XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXJzID0gcGx1Z2luc1xuICAgICAgLmZpbHRlcih4ID0+IHgucmVzb2x2ZXJzKVxuICAgICAgLnJlZHVjZSgoc3RvcmUsIGl0ZW0pID0+IE9iamVjdC5hc3NpZ24oc3RvcmUsIGl0ZW0ucmVzb2x2ZXJzKSwge30pO1xuICAgIHR5cGVEZWZzID0gcGx1Z2lucy5maWx0ZXIoeCA9PiB4LnR5cGVEZWZzKS5yZWR1Y2UoXG4gICAgICAoc3RvcmUsIGl0ZW0pID0+IGBcbiAgICAgICAgJHtpdGVtLnR5cGVEZWZzfVxuICAgICAgICAke3N0b3JlfVxuICAgICAgYCxcbiAgICAgICcnXG4gICAgKTtcbiAgICBjb250ZXh0ID0gY29tYmluZShwbHVnaW5zKTtcbiAgICBsYW1iZGEgPSBuZXcgR3JhcGhRTFNlcnZlckxhbWJkYSh7XG4gICAgICBmaWVsZFJlc29sdmVyLFxuICAgICAgdHlwZURlZnMsXG4gICAgICByZXNvbHZlcnMsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGVuZHBvaW50OiBudWxsXG4gICAgICB9LFxuICAgICAgY29udGV4dFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvcicsIGVycik7XG4gICAgbGFtYmRhID0gbmV3IEdyYXBoUUxTZXJ2ZXJMYW1iZGEoe1xuICAgICAgdHlwZURlZnM6ICcnLFxuICAgICAgcmVzb2x2ZXJzOiB7fSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZW5kcG9pbnQ6IG51bGxcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHNlcnZlcjogKGV2ZW50LCBjb250ZXh0LCBjYWxsYmFjaykgPT4ge1xuICAgICAgY29udGV4dC5jYWxsYmFja1dhaXRzRm9yRW1wdHlFdmVudExvb3AgPSBmYWxzZTtcbiAgICAgIGlmICghY29udGV4dC5oZWFkZXJzKSB7XG4gICAgICAgIGNvbnRleHQuaGVhZGVycyA9IHt9O1xuICAgICAgfVxuICAgICAgY29udGV4dC5oZWFkZXJzWydBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyddID0gdHJ1ZTtcbiAgICAgIGxhbWJkYS5ncmFwaHFsSGFuZGxlcihldmVudCwgY29udGV4dCwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgcGxheWdyb3VuZDogbGFtYmRhLnBsYXlncm91bmRIYW5kbGVyLFxuICAgIHZveWFnZXI6IHZveWFnZXIoe30pXG4gIH07XG59O1xuIl19
