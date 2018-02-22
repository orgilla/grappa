'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = exports.updateOne = exports.findOne = exports.transform = exports.close = exports.connectToDatabase = exports.getDB = exports.ObjectID = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongodb = require('mongodb');

Object.defineProperty(exports, 'ObjectID', {
  enumerable: true,
  get: function get() {
    return _mongodb.ObjectID;
  }
});

var _querystring = require('querystring');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getDB = exports.getDB = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(str) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connectToDatabase(str);

          case 2:
            return _context.abrupt('return', cachedDb);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getDB(_x) {
    return _ref.apply(this, arguments);
  };
}();

var cachedDb = null;
var _cachedDb = null;
var CONNECTION_STRING = void 0;
var connectToDatabase = exports.connectToDatabase = function connectToDatabase(connectionString) {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return Promise.resolve(cachedDb);
  }

  if (connectionString) {
    CONNECTION_STRING = connectionString;
  }
  if (!CONNECTION_STRING) {
    return Promise.resolve(cachedDb);
  }
  var split = CONNECTION_STRING.split('/');
  var dbNamePart = split.pop();

  var _dbNamePart$split = dbNamePart.split('?'),
      _dbNamePart$split2 = _slicedToArray(_dbNamePart$split, 2),
      dbName = _dbNamePart$split2[0],
      queryStr = _dbNamePart$split2[1];

  var connection = split.join('/');
  var query = queryStr && (0, _querystring.parse)(queryStr) || {};
  if (query.ssl == 'true') {
    query.ssl = true;
  }
  return _mongodb.MongoClient.connect(CONNECTION_STRING, query).then(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(db) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _cachedDb = db;
              cachedDb = db.db(dbName);
              return _context2.abrupt('return', cachedDb);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var close = exports.close = function close() {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return _cachedDb.close();
  }
  return Promise.resolve();
};

var enhance = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(method, collection) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _collection;

    var _db$collection, db;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(typeof collection === 'string')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 3;
            return connectToDatabase(CONNECTION_STRING);

          case 3:
            db = _context3.sent;
            return _context3.abrupt('return', (_db$collection = db.collection(collection))[method].apply(_db$collection, _toConsumableArray(args)));

          case 5:
            return _context3.abrupt('return', (_collection = collection())[method].apply(_collection, _toConsumableArray(args)));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function enhance(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var transform = exports.transform = function transform(item) {
  if (Array.isArray(item)) {
    return item.map(transform);
  } else if (item && item._id) {
    return Object.assign({}, item, { id: item._id });
  }
  return item;
};

var findOne = exports.findOne = function findOne(collection, filter) {
  if (typeof filter === 'string') {
    return enhance('findOne', collection, { _id: new _mongodb.ObjectID(filter) }).then(transform);
  }
  return enhance('findOne', collection, filter).then(transform);
};

var updateOne = exports.updateOne = function updateOne(collection, query, data) {
  if (!data) {
    data = query || {};
    query = null;
  } else if (query && typeof query === 'string') {
    query = { _id: new _mongodb.ObjectID(query) };
  } else if (query && query instanceof _mongodb.ObjectID) {
    query = { _id: query };
  }
  if (query) {
    return enhance('findAndModify', collection, query, [], { $set: data }, {
      remove: false,
      new: true,
      upsert: true
    }).then(function (x) {
      return x.value;
    }).then(transform);
  }
  return enhance('insertOne', collection, data).then(function (x) {
    return x.ops[0];
  }).then(transform);
};

var find = exports.find = function find(collection, filter) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  if (filter && Array.isArray(filter)) {
    return enhance('find', collection, {
      _id: { $in: filter.map(function (x) {
          return new _mongodb.ObjectID(x);
        }) }
    }).then(function (x) {
      return x.toArray();
    }).then(transform);
  }
  return enhance.apply(undefined, ['find', collection, filter].concat(args)).then(function (x) {
    return x.toArray();
  }).then(transform);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLWFwaS1kYi1tb25nby9kYi5lczYiXSwibmFtZXMiOlsiT2JqZWN0SUQiLCJnZXREQiIsInN0ciIsImNvbm5lY3RUb0RhdGFiYXNlIiwiY2FjaGVkRGIiLCJfY2FjaGVkRGIiLCJDT05ORUNUSU9OX1NUUklORyIsInNlcnZlckNvbmZpZyIsImlzQ29ubmVjdGVkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb25uZWN0aW9uU3RyaW5nIiwic3BsaXQiLCJkYk5hbWVQYXJ0IiwicG9wIiwiZGJOYW1lIiwicXVlcnlTdHIiLCJjb25uZWN0aW9uIiwiam9pbiIsInF1ZXJ5Iiwic3NsIiwiY29ubmVjdCIsInRoZW4iLCJkYiIsImNsb3NlIiwiZW5oYW5jZSIsIm1ldGhvZCIsImNvbGxlY3Rpb24iLCJhcmdzIiwidHJhbnNmb3JtIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbSIsIm1hcCIsIl9pZCIsImlkIiwiZmluZE9uZSIsImZpbHRlciIsInVwZGF0ZU9uZSIsImRhdGEiLCIkc2V0IiwicmVtb3ZlIiwibmV3IiwidXBzZXJ0IiwieCIsInZhbHVlIiwib3BzIiwiZmluZCIsIiRpbiIsInRvQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFBU0EsUTs7OztBQUVUOzs7Ozs7OztBQUVPLElBQU1DO0FBQUEsd0VBQVEsaUJBQU1DLEdBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2JDLGtCQUFrQkQsR0FBbEIsQ0FEYTs7QUFBQTtBQUFBLDZDQUVaRSxRQUZZOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQVI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBTjs7QUFLUCxJQUFJQSxXQUFXLElBQWY7QUFDQSxJQUFJQyxZQUFZLElBQWhCO0FBQ0EsSUFBSUMsMEJBQUo7QUFDTyxJQUFNSCxnREFBb0IsU0FBcEJBLGlCQUFvQixtQkFBb0I7QUFDbkQsTUFBSUMsWUFBWUEsU0FBU0cs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QTs7QUFDbkQsTUFBSVMsVUFBVVAsTUFBTUMsT0FBTixDQUFjTSxNQUFkLENBQWQsRUFBcUM7QUFDbkMsV0FBT1osUUFBUSxNQUFSLEVBQWdCRSxVQUFoQixFQUE0QjtBQUNqQ08sV0FBSyxFQUFFYyxLQUFLWCxPQUFPSixHQUFQLENBQVc7QUFBQSxpQkFBSyxzQkFBYVcsQ0FBYixDQUFMO0FBQUEsU0FBWCxDQUFQO0FBRDRCLEtBQTVCLEVBR0p0QixJQUhJLENBR0M7QUFBQSxhQUFLc0IsRUFBRUssT0FBRixFQUFMO0FBQUEsS0FIRCxFQUlKM0IsSUFKSSxDQUlDTyxTQUpELENBQVA7QUFLRDtBQUNELFNBQU9KLDBCQUFRLE1BQVIsRUFBZ0JFLFVBQWhCLEVBQTRCVSxNQUE1QixTQUF1Q1QsSUFBdkMsR0FDSk4sSUFESSxDQUNDO0FBQUEsV0FBS3NCLEVBQUVLLE9BQUYsRUFBTDtBQUFBLEdBREQsRUFFSjNCLElBRkksQ0FFQ08sU0FGRCxDQUFQO0FBR0QsQ0FYTSIsImZpbGUiOiJwYWNrYWdlcy9vbHltcC1hcGktZGItbW9uZ28vZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBPYmplY3RJRCB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgTW9uZ29DbGllbnQsIE9iamVjdElEIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IGdldERCID0gYXN5bmMgc3RyID0+IHtcbiAgYXdhaXQgY29ubmVjdFRvRGF0YWJhc2Uoc3RyKTtcbiAgcmV0dXJuIGNhY2hlZERiO1xufTtcblxubGV0IGNhY2hlZERiID0gbnVsbDtcbmxldCBfY2FjaGVkRGIgPSBudWxsO1xubGV0IENPTk5FQ1RJT05fU1RSSU5HO1xuZXhwb3J0IGNvbnN0IGNvbm5lY3RUb0RhdGFiYXNlID0gY29ubmVjdGlvblN0cmluZyA9PiB7XG4gIGlmIChjYWNoZWREYiAmJiBjYWNoZWREYi5zZXJ2ZXJDb25maWcuaXNDb25uZWN0ZWQoKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkRGIpO1xuICB9XG5cbiAgaWYgKGNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgICBDT05ORUNUSU9OX1NUUklORyA9IGNvbm5lY3Rpb25TdHJpbmc7XG4gIH1cbiAgaWYgKCFDT05ORUNUSU9OX1NUUklORykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FjaGVkRGIpO1xuICB9XG4gIGNvbnN0IHNwbGl0ID0gQ09OTkVDVElPTl9TVFJJTkcuc3BsaXQoJy8nKTtcbiAgY29uc3QgZGJOYW1lUGFydCA9IHNwbGl0LnBvcCgpO1xuICBjb25zdCBbZGJOYW1lLCBxdWVyeVN0cl0gPSBkYk5hbWVQYXJ0LnNwbGl0KCc/Jyk7XG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBzcGxpdC5qb2luKCcvJyk7XG4gIGNvbnN0IHF1ZXJ5ID0gKHF1ZXJ5U3RyICYmIHBhcnNlKHF1ZXJ5U3RyKSkgfHwge307XG4gIGlmIChxdWVyeS5zc2wgPT0gJ3RydWUnKSB7XG4gICAgcXVlcnkuc3NsID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gTW9uZ29DbGllbnQuY29ubmVjdChDT05ORUNUSU9OX1NUUklORywgcXVlcnkpLnRoZW4oYXN5bmMgZGIgPT4ge1xuICAgIF9jYWNoZWREYiA9IGRiO1xuICAgIGNhY2hlZERiID0gZGIuZGIoZGJOYW1lKTtcbiAgICByZXR1cm4gY2FjaGVkRGI7XG4gIH0pO1xufTtcbmV4cG9ydCBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgaWYgKGNhY2hlZERiICYmIGNhY2hlZERiLnNlcnZlckNvbmZpZy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgcmV0dXJuIF9jYWNoZWREYi5jbG9zZSgpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG5cbmNvbnN0IGVuaGFuY2UgPSBhc3luYyAobWV0aG9kLCBjb2xsZWN0aW9uLCAuLi5hcmdzKSA9PiB7XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBkYiA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKENPTk5FQ1RJT05fU1RSSU5HKTtcbiAgICByZXR1cm4gZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKVttZXRob2RdKC4uLmFyZ3MpO1xuICB9XG4gIHJldHVybiBjb2xsZWN0aW9uKClbbWV0aG9kXSguLi5hcmdzKTtcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm0gPSBpdGVtID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICByZXR1cm4gaXRlbS5tYXAodHJhbnNmb3JtKTtcbiAgfSBlbHNlIGlmIChpdGVtICYmIGl0ZW0uX2lkKSB7XG4gICAgcmV0dXJuIHsgLi4uaXRlbSwgaWQ6IGl0ZW0uX2lkIH07XG4gIH1cbiAgcmV0dXJuIGl0ZW07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZE9uZSA9IChjb2xsZWN0aW9uLCBmaWx0ZXIpID0+IHtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVuaGFuY2UoJ2ZpbmRPbmUnLCBjb2xsZWN0aW9uLCB7IF9pZDogbmV3IE9iamVjdElEKGZpbHRlcikgfSkudGhlbihcbiAgICAgIHRyYW5zZm9ybVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGVuaGFuY2UoJ2ZpbmRPbmUnLCBjb2xsZWN0aW9uLCBmaWx0ZXIpLnRoZW4odHJhbnNmb3JtKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVPbmUgPSAoY29sbGVjdGlvbiwgcXVlcnksIGRhdGEpID0+IHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgZGF0YSA9IHF1ZXJ5IHx8IHt9O1xuICAgIHF1ZXJ5ID0gbnVsbDtcbiAgfSBlbHNlIGlmIChxdWVyeSAmJiB0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgcXVlcnkgPSB7IF9pZDogbmV3IE9iamVjdElEKHF1ZXJ5KSB9O1xuICB9IGVsc2UgaWYgKHF1ZXJ5ICYmIHF1ZXJ5IGluc3RhbmNlb2YgT2JqZWN0SUQpIHtcbiAgICBxdWVyeSA9IHsgX2lkOiBxdWVyeSB9O1xuICB9XG4gIGlmIChxdWVyeSkge1xuICAgIHJldHVybiBlbmhhbmNlKFxuICAgICAgJ2ZpbmRBbmRNb2RpZnknLFxuICAgICAgY29sbGVjdGlvbixcbiAgICAgIHF1ZXJ5LFxuICAgICAgW10sXG4gICAgICB7ICRzZXQ6IGRhdGEgfSxcbiAgICAgIHtcbiAgICAgICAgcmVtb3ZlOiBmYWxzZSxcbiAgICAgICAgbmV3OiB0cnVlLFxuICAgICAgICB1cHNlcnQ6IHRydWUsXG4gICAgICB9XG4gICAgKVxuICAgICAgLnRoZW4oeCA9PiB4LnZhbHVlKVxuICAgICAgLnRoZW4odHJhbnNmb3JtKTtcbiAgfVxuICByZXR1cm4gZW5oYW5jZSgnaW5zZXJ0T25lJywgY29sbGVjdGlvbiwgZGF0YSlcbiAgICAudGhlbih4ID0+IHgub3BzWzBdKVxuICAgIC50aGVuKHRyYW5zZm9ybSk7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZCA9IChjb2xsZWN0aW9uLCBmaWx0ZXIsIC4uLmFyZ3MpID0+IHtcbiAgaWYgKGZpbHRlciAmJiBBcnJheS5pc0FycmF5KGZpbHRlcikpIHtcbiAgICByZXR1cm4gZW5oYW5jZSgnZmluZCcsIGNvbGxlY3Rpb24sIHtcbiAgICAgIF9pZDogeyAkaW46IGZpbHRlci5tYXAoeCA9PiBuZXcgT2JqZWN0SUQoeCkpIH0sXG4gICAgfSlcbiAgICAgIC50aGVuKHggPT4geC50b0FycmF5KCkpXG4gICAgICAudGhlbih0cmFuc2Zvcm0pO1xuICB9XG4gIHJldHVybiBlbmhhbmNlKCdmaW5kJywgY29sbGVjdGlvbiwgZmlsdGVyLCAuLi5hcmdzKVxuICAgIC50aGVuKHggPT4geC50b0FycmF5KCkpXG4gICAgLnRoZW4odHJhbnNmb3JtKTtcbn07XG4iXX0=
