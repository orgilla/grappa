'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _db = require('./db');

Object.keys(_db).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _db[key];
    }
  });
});

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (options) {
  if (!options.uri) {
    throw new Error('Missing URI for mongodb');
  }

  var password = options.password;
  var dictionary = options.dictionary || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._*';

  var promise = (0, _db.connectToDatabase)(options.uri);
  return {
    resolvers: {
      ID: (0, _type2.default)(options.hash ? new _hashids2.default(options.hash, 0, dictionary) : null)
    },
    context: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
        var db;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return promise;

              case 2:
                db = _context.sent;
                return _context.abrupt('return', {
                  updateOne: _db.updateOne,
                  findOne: _db.findOne,
                  find: _db.find,
                  db: db
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function context(_x) {
        return _ref.apply(this, arguments);
      }

      return context;
    }()
  };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL21vbmdvZGIvaW5kZXguZXM2Il0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmkiLCJFcnJvciIsInBhc3N3b3JkIiwiZGljdGlvbmFyeSIsInByb21pc2UiLCJyZXNvbHZlcnMiLCJJRCIsImhhc2giLCJjb250ZXh0IiwicHJvcHMiLCJkYiIsInVwZGF0ZU9uZSIsImZpbmRPbmUiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUE7O0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVRBOzs7O0FBQ0E7Ozs7Ozs7O2tCQVVlLG1CQUFXO0FBQ3hCLE1BQUksQ0FBQ0EsUUFBUUMsR0FBYixFQUFrQjtBQUNoQixVQUFNLElBQUlDLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ0Q7O0FBRUQsTUFBTUMsV0FBV0gsUUFBUUcsUUFBekI7QUFDQSxNQUFNQyxhQUNKSixRQUFRSSxVQUFSLElBQ0Esb0VBRkY7O0FBSUEsTUFBTUMsVUFBVSwyQkFBa0JMLFFBQVFDLEdBQTFCLENBQWhCO0FBQ0EsU0FBTztBQUNMSyxlQUFXO0FBQ1RDLFVBQUksb0JBQUtQLFFBQVFRLElBQVIsR0FBZSxzQkFBWVIsUUFBUVEsSUFBcEIsRUFBMEIsQ0FBMUIsRUFBNkJKLFVBQTdCLENBQWYsR0FBMEQsSUFBL0Q7QUFESyxLQUROO0FBSUxLO0FBQUEsNEVBQVMsaUJBQU1DLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDVUwsT0FEVjs7QUFBQTtBQUNETSxrQkFEQztBQUFBLGlEQUVBO0FBQ0xDLDBDQURLO0FBRUxDLHNDQUZLO0FBR0xDLGdDQUhLO0FBSUxIO0FBSkssaUJBRkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBVDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUpLLEdBQVA7QUFjRCxDIiwiZmlsZSI6InBhY2thZ2VzL21vbmdvZGIvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFzaGlkcyBmcm9tICdoYXNoaWRzJztcbmltcG9ydCB0eXBlIGZyb20gJy4vdHlwZSc7XG5pbXBvcnQge1xuICBjb25uZWN0aW9uU3RyaW5nLFxuICBjb25uZWN0VG9EYXRhYmFzZSxcbiAgdXBkYXRlT25lLFxuICBmaW5kT25lLFxuICBmaW5kLFxufSBmcm9tICcuL2RiJztcbmV4cG9ydCAqIGZyb20gJy4vZGInO1xuXG5leHBvcnQgZGVmYXVsdCBvcHRpb25zID0+IHtcbiAgaWYgKCFvcHRpb25zLnVyaSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBVUkkgZm9yIG1vbmdvZGInKTtcbiAgfVxuXG4gIGNvbnN0IHBhc3N3b3JkID0gb3B0aW9ucy5wYXNzd29yZDtcbiAgY29uc3QgZGljdGlvbmFyeSA9XG4gICAgb3B0aW9ucy5kaWN0aW9uYXJ5IHx8XG4gICAgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVoxMjM0NTY3ODkwLS5fKic7XG5cbiAgY29uc3QgcHJvbWlzZSA9IGNvbm5lY3RUb0RhdGFiYXNlKG9wdGlvbnMudXJpKTtcbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlcnM6IHtcbiAgICAgIElEOiB0eXBlKG9wdGlvbnMuaGFzaCA/IG5ldyBIYXNoaWRzKG9wdGlvbnMuaGFzaCwgMCwgZGljdGlvbmFyeSkgOiBudWxsKSxcbiAgICB9LFxuICAgIGNvbnRleHQ6IGFzeW5jIHByb3BzID0+IHtcbiAgICAgIGNvbnN0IGRiID0gYXdhaXQgcHJvbWlzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZU9uZSxcbiAgICAgICAgZmluZE9uZSxcbiAgICAgICAgZmluZCxcbiAgICAgICAgZGIsXG4gICAgICB9O1xuICAgIH0sXG4gIH07XG59O1xuIl19
