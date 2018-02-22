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
      plugins = _ref2$plugins === undefined ? [] : _ref2$plugins;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FwaS9pbmRleC5lczYiXSwibmFtZXMiOlsiY29tYmluZSIsInByb3BzIiwiUHJvbWlzZSIsImFsbCIsInBsdWdpbnMiLCJmaWx0ZXIiLCJ4IiwiY29udGV4dCIsIm1hcCIsImNvbnRleHRzIiwicmVkdWNlIiwic3RvcmUiLCJpdGVtIiwiT2JqZWN0IiwiYXNzaWduIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJsYW1iZGEiLCJvcHRpb25zIiwiZW5kcG9pbnQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZXJ2ZXIiLCJldmVudCIsImNhbGxiYWNrIiwiY2FsbGJhY2tXYWl0c0ZvckVtcHR5RXZlbnRMb29wIiwiaGVhZGVycyIsImdyYXBocWxIYW5kbGVyIiwicGxheWdyb3VuZCIsInBsYXlncm91bmRIYW5kbGVyIiwidm95YWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVO0FBQUE7QUFBQSwwRUFBVyxpQkFBTUMsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNGQyxRQUFRQyxHQUFSLENBQ3JCQyxRQUFRQyxNQUFSLENBQWU7QUFBQSx1QkFBS0MsRUFBRUMsT0FBUDtBQUFBLGVBQWYsRUFBK0JDLEdBQS9CLENBQW1DO0FBQUEsdUJBQUtGLEVBQUVDLE9BQUYsQ0FBVU4sS0FBVixDQUFMO0FBQUEsZUFBbkMsQ0FEcUIsQ0FERTs7QUFBQTtBQUNuQlEsc0JBRG1CO0FBQUEsK0NBSWxCQSxTQUFTQyxNQUFULENBQWdCLFVBQUNDLEtBQUQsRUFBUUMsSUFBUjtBQUFBLHVCQUFpQkMsT0FBT0MsTUFBUCxDQUFjSCxLQUFkLEVBQXFCQyxRQUFRLEVBQTdCLENBQWpCO0FBQUEsZUFBaEIsRUFBbUUsRUFBbkUsQ0FKa0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQWhCOztrQkFPZSxpQkFBOEQ7QUFBQSw2QkFBM0RHLFFBQTJEO0FBQUEsTUFBM0RBLFFBQTJELGtDQUFoRCxFQUFnRDtBQUFBLDhCQUE1Q0MsU0FBNEM7QUFBQSxNQUE1Q0EsU0FBNEMsbUNBQWhDLEVBQWdDO0FBQUEsTUFBNUJULE9BQTRCLFNBQTVCQSxPQUE0QjtBQUFBLDRCQUFuQkgsT0FBbUI7QUFBQSxNQUFuQkEsT0FBbUIsaUNBQVQsRUFBUzs7QUFDM0UsTUFBSWEsZUFBSjtBQUNBYixhQUFXLEVBQUVHLGdCQUFGLEVBQVdRLGtCQUFYLEVBQXFCQyxvQkFBckIsRUFBWCw0QkFBZ0RaLE9BQWhEO0FBQ0EsTUFBSTtBQUNGWSxnQkFBWVosUUFDVEMsTUFEUyxDQUNGO0FBQUEsYUFBS0MsRUFBRVUsU0FBUDtBQUFBLEtBREUsRUFFVE4sTUFGUyxDQUVGLFVBQUNDLEtBQUQsRUFBUUMsSUFBUjtBQUFBLGFBQWlCQyxPQUFPQyxNQUFQLENBQWNILEtBQWQsRUFBcUJDLEtBQUtJLFNBQTFCLENBQWpCO0FBQUEsS0FGRSxFQUVxRCxFQUZyRCxDQUFaO0FBR0FELGVBQVdYLFFBQVFDLE1BQVIsQ0FBZTtBQUFBLGFBQUtDLEVBQUVTLFFBQVA7QUFBQSxLQUFmLEVBQWdDTCxNQUFoQyxDQUNULFVBQUNDLEtBQUQsRUFBUUMsSUFBUjtBQUFBLDRCQUNJQSxLQUFLRyxRQURULGtCQUVJSixLQUZKO0FBQUEsS0FEUyxFQUtULEVBTFMsQ0FBWDtBQU9BSixjQUFVUCxRQUFRSSxPQUFSLENBQVY7QUFDQWEsYUFBUyxxQ0FBd0I7QUFDL0JGLHdCQUQrQjtBQUUvQkMsMEJBRitCO0FBRy9CRSxlQUFTO0FBQ1BDLGtCQUFVO0FBREgsT0FIc0I7QUFNL0JaO0FBTitCLEtBQXhCLENBQVQ7QUFRRCxHQXBCRCxDQW9CRSxPQUFPYSxHQUFQLEVBQVk7QUFDWkMsWUFBUUMsS0FBUixDQUFjLE9BQWQsRUFBdUJGLEdBQXZCO0FBQ0FILGFBQVMscUNBQXdCO0FBQy9CRixnQkFBVSxFQURxQjtBQUUvQkMsaUJBQVcsRUFGb0I7QUFHL0JFLGVBQVM7QUFDUEMsa0JBQVU7QUFESDtBQUhzQixLQUF4QixDQUFUO0FBT0Q7QUFDRCxTQUFPO0FBQ0xJLFlBQVEsZ0JBQUNDLEtBQUQsRUFBUWpCLE9BQVIsRUFBaUJrQixRQUFqQixFQUE4QjtBQUNwQ2xCLGNBQVFtQiw4QkFBUixHQUF5QyxLQUF6QztBQUNBLFVBQUksQ0FBQ25CLFFBQVFvQixPQUFiLEVBQXNCO0FBQ3BCcEIsZ0JBQVFvQixPQUFSLEdBQWtCLEVBQWxCO0FBQ0Q7QUFDRHBCLGNBQVFvQixPQUFSLENBQWdCLGtDQUFoQixJQUFzRCxJQUF0RDtBQUNBVixhQUFPVyxjQUFQLENBQXNCSixLQUF0QixFQUE2QmpCLE9BQTdCLEVBQXNDa0IsUUFBdEM7QUFDRCxLQVJJO0FBU0xJLGdCQUFZWixPQUFPYSxpQkFUZDtBQVVMQyxhQUFTLHVCQUFRLEVBQVI7QUFWSixHQUFQO0FBWUQsQyIsImZpbGUiOiJwYWNrYWdlcy9hcGkvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMU2VydmVyTGFtYmRhIH0gZnJvbSAnZ3JhcGhxbC15b2dhJztcbmltcG9ydCB2b3lhZ2VyIGZyb20gJy4vdm95YWdlcic7XG5cbmNvbnN0IGNvbWJpbmUgPSBwbHVnaW5zID0+IGFzeW5jIHByb3BzID0+IHtcbiAgY29uc3QgY29udGV4dHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBwbHVnaW5zLmZpbHRlcih4ID0+IHguY29udGV4dCkubWFwKHggPT4geC5jb250ZXh0KHByb3BzKSlcbiAgKTtcbiAgcmV0dXJuIGNvbnRleHRzLnJlZHVjZSgoc3RvcmUsIGl0ZW0pID0+IE9iamVjdC5hc3NpZ24oc3RvcmUsIGl0ZW0gfHwge30pLCB7fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoeyB0eXBlRGVmcyA9ICcnLCByZXNvbHZlcnMgPSB7fSwgY29udGV4dCwgcGx1Z2lucyA9IFtdIH0pID0+IHtcbiAgbGV0IGxhbWJkYTtcbiAgcGx1Z2lucyA9IFt7IGNvbnRleHQsIHR5cGVEZWZzLCByZXNvbHZlcnMgfSwgLi4ucGx1Z2luc107XG4gIHRyeSB7XG4gICAgcmVzb2x2ZXJzID0gcGx1Z2luc1xuICAgICAgLmZpbHRlcih4ID0+IHgucmVzb2x2ZXJzKVxuICAgICAgLnJlZHVjZSgoc3RvcmUsIGl0ZW0pID0+IE9iamVjdC5hc3NpZ24oc3RvcmUsIGl0ZW0ucmVzb2x2ZXJzKSwge30pO1xuICAgIHR5cGVEZWZzID0gcGx1Z2lucy5maWx0ZXIoeCA9PiB4LnR5cGVEZWZzKS5yZWR1Y2UoXG4gICAgICAoc3RvcmUsIGl0ZW0pID0+IGBcbiAgICAgICAgJHtpdGVtLnR5cGVEZWZzfVxuICAgICAgICAke3N0b3JlfVxuICAgICAgYCxcbiAgICAgICcnXG4gICAgKTtcbiAgICBjb250ZXh0ID0gY29tYmluZShwbHVnaW5zKTtcbiAgICBsYW1iZGEgPSBuZXcgR3JhcGhRTFNlcnZlckxhbWJkYSh7XG4gICAgICB0eXBlRGVmcyxcbiAgICAgIHJlc29sdmVycyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZW5kcG9pbnQ6IG51bGxcbiAgICAgIH0sXG4gICAgICBjb250ZXh0XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yJywgZXJyKTtcbiAgICBsYW1iZGEgPSBuZXcgR3JhcGhRTFNlcnZlckxhbWJkYSh7XG4gICAgICB0eXBlRGVmczogJycsXG4gICAgICByZXNvbHZlcnM6IHt9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBlbmRwb2ludDogbnVsbFxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB7XG4gICAgc2VydmVyOiAoZXZlbnQsIGNvbnRleHQsIGNhbGxiYWNrKSA9PiB7XG4gICAgICBjb250ZXh0LmNhbGxiYWNrV2FpdHNGb3JFbXB0eUV2ZW50TG9vcCA9IGZhbHNlO1xuICAgICAgaWYgKCFjb250ZXh0LmhlYWRlcnMpIHtcbiAgICAgICAgY29udGV4dC5oZWFkZXJzID0ge307XG4gICAgICB9XG4gICAgICBjb250ZXh0LmhlYWRlcnNbJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJ10gPSB0cnVlO1xuICAgICAgbGFtYmRhLmdyYXBocWxIYW5kbGVyKGV2ZW50LCBjb250ZXh0LCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICBwbGF5Z3JvdW5kOiBsYW1iZGEucGxheWdyb3VuZEhhbmRsZXIsXG4gICAgdm95YWdlcjogdm95YWdlcih7fSlcbiAgfTtcbn07XG4iXX0=
