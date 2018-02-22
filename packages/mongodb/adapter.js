'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongodb = require('mongodb');

var _querystring = require('querystring');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var transform = function transform(item) {
  if (Array.isArray(item)) {
    return item.map(transform);
  } else if (item && item._id) {
    return Object.assign({}, item, { id: item._id });
  }
  return item;
};

var done = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(x) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (x && x.toArray) {
              x = x.toArray();
            }
            _context.next = 3;
            return Promise.resolve(x);

          case 3:
            x = _context.sent;
            return _context.abrupt('return', transform(x));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function done(_x) {
    return _ref.apply(this, arguments);
  };
}();

var toID = function toID(x) {
  if (!x) {
    return x;
  }
  return new _mongodb.ObjectID(x);
};

var Adapter = function Adapter(_ref2) {
  var _this = this;

  var uri = _ref2.uri,
      before = _ref2.before,
      after = _ref2.after;

  _classCallCheck(this, Adapter);

  this.done = done;
  this.transform = transform;
  this.toID = toID;
  this.cachedDb = null;
  this._cachedDb = null;
  this.uri = null;

  this.connectToDatabase = function () {
    if (_this.cachedDb && _this.cachedDb.serverConfig.isConnected()) {
      return Promise.resolve(_this.cachedDb);
    }

    var split = _this.uri.split('/');
    var dbNamePart = split.pop();

    var _dbNamePart$split = dbNamePart.split('?'),
        _dbNamePart$split2 = _slicedToArray(_dbNamePart$split, 2),
        dbName = _dbNamePart$split2[0],
        queryStr = _dbNamePart$split2[1];

    var query = queryStr && (0, _querystring.parse)(queryStr) || {};
    if (query.ssl == 'true') {
      query.ssl = true;
    }
    return _mongodb.MongoClient.connect(_this.uri, query).then(function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(db) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this._cachedDb = db;
                _this.cachedDb = db.db(dbName);
                return _context2.abrupt('return', _this.cachedDb);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
  };

  this.getDB = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this.connectToDatabase();

          case 2:
            return _context3.abrupt('return', _this.cachedDb);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  this.close = function () {
    if (_this.cachedDb && _this.cachedDb.serverConfig.isConnected()) {
      return _this._cachedDb.close();
    }
    return Promise.resolve();
  };

  this.enhance = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(method, collection) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var result, _db$collection, db, _collection;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_this.before) {
                _context4.next = 3;
                break;
              }

              _context4.next = 3;
              return Promise.resolve(_this.before.apply(_this, [method, collection].concat(_toConsumableArray(args))));

            case 3:
              result = void 0;

              if (!(typeof collection === 'string')) {
                _context4.next = 13;
                break;
              }

              _context4.next = 7;
              return _this.connectToDatabase();

            case 7:
              db = _context4.sent;
              _context4.next = 10;
              return (_db$collection = db.collection(collection))[method].apply(_db$collection, _toConsumableArray(args));

            case 10:
              result = _context4.sent;
              _context4.next = 16;
              break;

            case 13:
              _context4.next = 15;
              return (_collection = collection())[method].apply(_collection, _toConsumableArray(args));

            case 15:
              result = _context4.sent;

            case 16:
              return _context4.abrupt('return', result);

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x3, _x4) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.finish = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(method, collection, result) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return done(result);

            case 2:
              result = _context5.sent;

              if (!_this.after) {
                _context5.next = 10;
                break;
              }

              _context5.next = 6;
              return Promise.resolve(_this.after(method, collection, result));

            case 6:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 9;
                break;
              }

              _context5.t0 = result;

            case 9:
              result = _context5.t0;

            case 10:
              return _context5.abrupt('return', result);

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x5, _x6, _x7) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.findOne = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(collection, filter) {
      var result;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              result = void 0;

              if (!(typeof filter === 'string')) {
                _context6.next = 7;
                break;
              }

              _context6.next = 4;
              return _this.enhance('findOne', collection, {
                _id: new _mongodb.ObjectID(filter)
              });

            case 4:
              result = _context6.sent;
              _context6.next = 8;
              break;

            case 7:
              result = _this.enhance('findOne', collection, filter);

            case 8:
              return _context6.abrupt('return', _this.finish('findOne', collection, result));

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x8, _x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.updateOne = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(collection, query, data) {
      var result;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!data) {
                data = query || {};
                query = null;
              } else if (query && typeof query === 'string') {
                query = { _id: new _mongodb.ObjectID(query) };
              } else if (query && query instanceof _mongodb.ObjectID) {
                query = { _id: query };
              }

              result = void 0;

              if (!query) {
                _context7.next = 8;
                break;
              }

              _context7.next = 5;
              return _this.enhance('findAndModify', collection, query, [], { $set: data }, {
                remove: false,
                new: true,
                upsert: true
              });

            case 5:
              result = _context7.sent.value;
              _context7.next = 11;
              break;

            case 8:
              _context7.next = 10;
              return _this.enhance('insertOne', collection, data);

            case 10:
              result = _context7.sent.ops[0];

            case 11:
              return _context7.abrupt('return', _this.finish('insertOne', collection, result));

            case 12:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x10, _x11, _x12) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.find = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(collection, filter) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var result;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              result = void 0;

              if (!(filter && Array.isArray(filter))) {
                _context8.next = 7;
                break;
              }

              _context8.next = 4;
              return _this.enhance('find', collection, {
                _id: { $in: filter.map(function (x) {
                    return new _mongodb.ObjectID(x);
                  }) }
              });

            case 4:
              result = _context8.sent.toArray();
              _context8.next = 10;
              break;

            case 7:
              _context8.next = 9;
              return _this.enhance.apply(_this, ['find', collection, filter].concat(_toConsumableArray(args)));

            case 9:
              result = _context8.sent.toArray();

            case 10:
              return _context8.abrupt('return', _this.finish('find', collection, result));

            case 11:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x13, _x14) {
      return _ref9.apply(this, arguments);
    };
  }();

  this.uri = uri;
  this.before = before;
  this.after = after;
  this.connectToDatabase();
}

// Connection


// Methods
;

exports.default = Adapter;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL21vbmdvZGIvYWRhcHRlci5lczYiXSwibmFtZXMiOlsidHJhbnNmb3JtIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbSIsIm1hcCIsIl9pZCIsImlkIiwiZG9uZSIsIngiLCJ0b0FycmF5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0b0lEIiwiQWRhcHRlciIsInVyaSIsImJlZm9yZSIsImFmdGVyIiwiY2FjaGVkRGIiLCJfY2FjaGVkRGIiLCJjb25uZWN0VG9EYXRhYmFzZSIsInNlcnZlckNvbmZpZyIsImlzQ29ubmVjdGVkIiwic3BsaXQiLCJkYk5hbWVQYXJ0IiwicG9wIiwiZGJOYW1lIiwicXVlcnlTdHIiLCJxdWVyeSIsInNzbCIsImNvbm5lY3QiLCJ0aGVuIiwiZGIiLCJnZXREQiIsImNsb3NlIiwiZW5oYW5jZSIsIm1ldGhvZCIsImNvbGxlY3Rpb24iLCJhcmdzIiwicmVzdWx0IiwiZmluaXNoIiwiZmluZE9uZSIsImZpbHRlciIsInVwZGF0ZU9uZSIsImRhdGEiLCIkc2V0IiwicmVtb3ZlIiwibmV3IiwidXBzZXJ0IiwidmFsdWUiLCJvcHMiLCJmaW5kIiwiJGluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVksT0FBUTtBQUN4QixNQUFJQyxNQUFNQyxPQUFOLENBQWNDLElBQWQsQ0FBSixFQUF5QjtBQUN2QixXQUFPQSxLQUFLQyxHQUFMLENBQVNKLFNBQVQsQ0FBUDtBQUNELEdBRkQsTUFFTyxJQUFJRyxRQUFRQSxLQUFLRSxHQUFqQixFQUFzQjtBQUMzQiw2QkFBWUYsSUFBWixJQUFrQkcsSUFBSUgsS0FBS0UsR0FBM0I7QUFDRDtBQUNELFNBQU9GLElBQVA7QUFDRCxDQVBEOztBQVNBLElBQU1JO0FBQUEsd0VBQU8saUJBQU1DLENBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYLGdCQUFJQSxLQUFLQSxFQUFFQyxPQUFYLEVBQW9CO0FBQ2xC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LE9BTEQ7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFPYSxNQUFLeUIsT0FBTCxlQUNkLE1BRGMsRUFFZEUsVUFGYyxFQUdkSyxNQUhjLDRCQUlYSixJQUpXLEdBUGI7O0FBQUE7QUFPSEMsb0JBUEcsa0JBWUE3QixPQVpBOztBQUFBO0FBQUEsZ0RBY0UsTUFBSzhCLE1BQUwsQ0FBWSxNQUFaLEVBQW9CSCxVQUFwQixFQUFnQ0UsTUFBaEMsQ0FkRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXBHNkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ2xDLE9BQUt4QixHQUFMLEdBQVdBLEdBQVg7QUFDQSxPQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLRyxpQkFBTDtBQUNEOztBQUVEOzs7QUE4QkE7OztrQkE5Q21CTixPIiwiZmlsZSI6InBhY2thZ2VzL21vbmdvZGIvYWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50LCBPYmplY3RJRCB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdxdWVyeXN0cmluZyc7XG5cbmNvbnN0IHRyYW5zZm9ybSA9IGl0ZW0gPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIHJldHVybiBpdGVtLm1hcCh0cmFuc2Zvcm0pO1xuICB9IGVsc2UgaWYgKGl0ZW0gJiYgaXRlbS5faWQpIHtcbiAgICByZXR1cm4geyAuLi5pdGVtLCBpZDogaXRlbS5faWQgfTtcbiAgfVxuICByZXR1cm4gaXRlbTtcbn07XG5cbmNvbnN0IGRvbmUgPSBhc3luYyB4ID0+IHtcbiAgaWYgKHggJiYgeC50b0FycmF5KSB7XG4gICAgeCA9IHgudG9BcnJheSgpO1xuICB9XG4gIHggPSBhd2FpdCBQcm9taXNlLnJlc29sdmUoeCk7XG4gIHJldHVybiB0cmFuc2Zvcm0oeCk7XG59O1xuXG5jb25zdCB0b0lEID0geCA9PiB7XG4gIGlmICgheCkge1xuICAgIHJldHVybiB4O1xuICB9XG4gIHJldHVybiBuZXcgT2JqZWN0SUQoeCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGFwdGVyIHtcbiAgZG9uZSA9IGRvbmU7XG4gIHRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgdG9JRCA9IHRvSUQ7XG5cbiAgY2FjaGVkRGIgPSBudWxsO1xuICBfY2FjaGVkRGIgPSBudWxsO1xuICB1cmkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHsgdXJpLCBiZWZvcmUsIGFmdGVyIH0pIHtcbiAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICB0aGlzLmJlZm9yZSA9IGJlZm9yZTtcbiAgICB0aGlzLmFmdGVyID0gYWZ0ZXI7XG4gICAgdGhpcy5jb25uZWN0VG9EYXRhYmFzZSgpO1xuICB9XG5cbiAgLy8gQ29ubmVjdGlvblxuICBjb25uZWN0VG9EYXRhYmFzZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jYWNoZWREYiAmJiB0aGlzLmNhY2hlZERiLnNlcnZlckNvbmZpZy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY2FjaGVkRGIpO1xuICAgIH1cblxuICAgIGNvbnN0IHNwbGl0ID0gdGhpcy51cmkuc3BsaXQoJy8nKTtcbiAgICBjb25zdCBkYk5hbWVQYXJ0ID0gc3BsaXQucG9wKCk7XG4gICAgY29uc3QgW2RiTmFtZSwgcXVlcnlTdHJdID0gZGJOYW1lUGFydC5zcGxpdCgnPycpO1xuICAgIGNvbnN0IHF1ZXJ5ID0gKHF1ZXJ5U3RyICYmIHBhcnNlKHF1ZXJ5U3RyKSkgfHwge307XG4gICAgaWYgKHF1ZXJ5LnNzbCA9PSAndHJ1ZScpIHtcbiAgICAgIHF1ZXJ5LnNzbCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBNb25nb0NsaWVudC5jb25uZWN0KHRoaXMudXJpLCBxdWVyeSkudGhlbihhc3luYyBkYiA9PiB7XG4gICAgICB0aGlzLl9jYWNoZWREYiA9IGRiO1xuICAgICAgdGhpcy5jYWNoZWREYiA9IGRiLmRiKGRiTmFtZSk7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZWREYjtcbiAgICB9KTtcbiAgfTtcbiAgZ2V0REIgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGhpcy5jb25uZWN0VG9EYXRhYmFzZSgpO1xuICAgIHJldHVybiB0aGlzLmNhY2hlZERiO1xuICB9O1xuICBjbG9zZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jYWNoZWREYiAmJiB0aGlzLmNhY2hlZERiLnNlcnZlckNvbmZpZy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FjaGVkRGIuY2xvc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIC8vIE1ldGhvZHNcbiAgZW5oYW5jZSA9IGFzeW5jIChtZXRob2QsIGNvbGxlY3Rpb24sIC4uLmFyZ3MpID0+IHtcbiAgICBpZiAodGhpcy5iZWZvcmUpIHtcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmJlZm9yZShtZXRob2QsIGNvbGxlY3Rpb24sIC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBkYiA9IGF3YWl0IHRoaXMuY29ubmVjdFRvRGF0YWJhc2UoKTtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oY29sbGVjdGlvbilbbWV0aG9kXSguLi5hcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgY29sbGVjdGlvbigpW21ldGhvZF0oLi4uYXJncyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIGZpbmlzaCA9IGFzeW5jIChtZXRob2QsIGNvbGxlY3Rpb24sIHJlc3VsdCkgPT4ge1xuICAgIHJlc3VsdCA9IGF3YWl0IGRvbmUocmVzdWx0KTtcbiAgICBpZiAodGhpcy5hZnRlcikge1xuICAgICAgcmVzdWx0ID1cbiAgICAgICAgKGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmFmdGVyKG1ldGhvZCwgY29sbGVjdGlvbiwgcmVzdWx0KSkpIHx8XG4gICAgICAgIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgZmluZE9uZSA9IGFzeW5jIChjb2xsZWN0aW9uLCBmaWx0ZXIpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5lbmhhbmNlKCdmaW5kT25lJywgY29sbGVjdGlvbiwge1xuICAgICAgICBfaWQ6IG5ldyBPYmplY3RJRChmaWx0ZXIpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gdGhpcy5lbmhhbmNlKCdmaW5kT25lJywgY29sbGVjdGlvbiwgZmlsdGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmluaXNoKCdmaW5kT25lJywgY29sbGVjdGlvbiwgcmVzdWx0KTtcbiAgfTtcbiAgdXBkYXRlT25lID0gYXN5bmMgKGNvbGxlY3Rpb24sIHF1ZXJ5LCBkYXRhKSA9PiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICBkYXRhID0gcXVlcnkgfHwge307XG4gICAgICBxdWVyeSA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChxdWVyeSAmJiB0eXBlb2YgcXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBxdWVyeSA9IHsgX2lkOiBuZXcgT2JqZWN0SUQocXVlcnkpIH07XG4gICAgfSBlbHNlIGlmIChxdWVyeSAmJiBxdWVyeSBpbnN0YW5jZW9mIE9iamVjdElEKSB7XG4gICAgICBxdWVyeSA9IHsgX2lkOiBxdWVyeSB9O1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5lbmhhbmNlKFxuICAgICAgICAnZmluZEFuZE1vZGlmeScsXG4gICAgICAgIGNvbGxlY3Rpb24sXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgICBbXSxcbiAgICAgICAgeyAkc2V0OiBkYXRhIH0sXG4gICAgICAgIHtcbiAgICAgICAgICByZW1vdmU6IGZhbHNlLFxuICAgICAgICAgIG5ldzogdHJ1ZSxcbiAgICAgICAgICB1cHNlcnQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgKSkudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IChhd2FpdCB0aGlzLmVuaGFuY2UoJ2luc2VydE9uZScsIGNvbGxlY3Rpb24sIGRhdGEpKS5vcHNbMF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZpbmlzaCgnaW5zZXJ0T25lJywgY29sbGVjdGlvbiwgcmVzdWx0KTtcbiAgfTtcbiAgZmluZCA9IGFzeW5jIChjb2xsZWN0aW9uLCBmaWx0ZXIsIC4uLmFyZ3MpID0+IHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChmaWx0ZXIgJiYgQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5lbmhhbmNlKCdmaW5kJywgY29sbGVjdGlvbiwge1xuICAgICAgICBfaWQ6IHsgJGluOiBmaWx0ZXIubWFwKHggPT4gbmV3IE9iamVjdElEKHgpKSB9XG4gICAgICB9KSkudG9BcnJheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSAoYXdhaXQgdGhpcy5lbmhhbmNlKFxuICAgICAgICAnZmluZCcsXG4gICAgICAgIGNvbGxlY3Rpb24sXG4gICAgICAgIGZpbHRlcixcbiAgICAgICAgLi4uYXJnc1xuICAgICAgKSkudG9BcnJheSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maW5pc2goJ2ZpbmQnLCBjb2xsZWN0aW9uLCByZXN1bHQpO1xuICB9O1xufVxuIl19
