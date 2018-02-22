'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _db = require('../lambda/db');

var _evernote = require('./evernote');

var _evernote2 = _interopRequireDefault(_evernote);

var _cloudinary = require('./cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _db.connectionString)(_jsYaml2.default.load(_fs2.default.readFileSync(_path2.default.resolve(__dirname, '..', 'lambda', 'env.yml'))).v1.MONGODB_URI);

var upload = (0, _cloudinary2.default)({
  cloudName: 'x',
  apiKey: 'x',
  apiSecret: 'x'
});

var client = (0, _evernote2.default)({
  token: 'x',
  sandbox: true,
  upload: upload
});

var work = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var docs;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client('gzk');

          case 2:
            docs = _context.sent;
            return _context.abrupt('return', Promise.all(docs.map(function (x) {
              return (0, _db.updateOne)('document', { rootId: x.rootId }, x);
            })));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function work() {
    return _ref.apply(this, arguments);
  };
}();

work().then(_db.close).then(function (x) {
  console.log('DONE');
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLWFwaS9leGFtcGxlL2luZGV4LmVzNiJdLCJuYW1lcyI6WyJsb2FkIiwicmVhZEZpbGVTeW5jIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsInYxIiwiTU9OR09EQl9VUkkiLCJ1cGxvYWQiLCJjbG91ZE5hbWUiLCJhcGlLZXkiLCJhcGlTZWNyZXQiLCJjbGllbnQiLCJ0b2tlbiIsInNhbmRib3giLCJ3b3JrIiwiZG9jcyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJyb290SWQiLCJ4IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsMEJBQ0UsaUJBQUtBLElBQUwsQ0FBVSxhQUFHQyxZQUFILENBQWdCLGVBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixJQUF4QixFQUE4QixRQUE5QixFQUF3QyxTQUF4QyxDQUFoQixDQUFWLEVBQ0dDLEVBREgsQ0FDTUMsV0FGUjs7QUFLQSxJQUFNQyxTQUFTLDBCQUFXO0FBQ3hCQyxhQUFXLEdBRGE7QUFFeEJDLFVBQVEsR0FGZ0I7QUFHeEJDLGFBQVc7QUFIYSxDQUFYLENBQWY7O0FBTUEsSUFBTUMsU0FBUyx3QkFBUztBQUN0QkMsU0FBTyxHQURlO0FBRXRCQyxXQUFTLElBRmE7QUFHdEJOO0FBSHNCLENBQVQsQ0FBZjs7QUFNQSxJQUFNTztBQUFBLHdFQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1FILE9BQU8sS0FBUCxDQURSOztBQUFBO0FBQ0xJLGdCQURLO0FBQUEsNkNBRUpDLFFBQVFDLEdBQVIsQ0FDTEYsS0FBS0csR0FBTCxDQUFTO0FBQUEscUJBQUssbUJBQVUsVUFBVixFQUFzQixFQUFFQyxRQUFRQyxFQUFFRCxNQUFaLEVBQXRCLEVBQTRDQyxDQUE1QyxDQUFMO0FBQUEsYUFBVCxDQURLLENBRkk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFOOztBQU9BTixPQUNHTyxJQURILFlBRUdBLElBRkgsQ0FFUSxhQUFLO0FBQ1RDLFVBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0QsQ0FKSCIsImZpbGUiOiJwYWNrYWdlcy9vbHltcC1hcGkvZXhhbXBsZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHlhbWwgZnJvbSAnanMteWFtbCc7XG5pbXBvcnQgeyB1cGRhdGVPbmUsIGNvbm5lY3Rpb25TdHJpbmcsIGNsb3NlIH0gZnJvbSAnLi4vbGFtYmRhL2RiJztcbmltcG9ydCBldmVybm90ZSBmcm9tICcuL2V2ZXJub3RlJztcbmltcG9ydCBjbG91ZGluYXJ5IGZyb20gJy4vY2xvdWRpbmFyeSc7XG5cbmNvbm5lY3Rpb25TdHJpbmcoXG4gIHlhbWwubG9hZChmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJ2xhbWJkYScsICdlbnYueW1sJykpKVxuICAgIC52MS5NT05HT0RCX1VSSVxuKTtcblxuY29uc3QgdXBsb2FkID0gY2xvdWRpbmFyeSh7XG4gIGNsb3VkTmFtZTogJ3gnLFxuICBhcGlLZXk6ICd4JyxcbiAgYXBpU2VjcmV0OiAneCcsXG59KTtcblxuY29uc3QgY2xpZW50ID0gZXZlcm5vdGUoe1xuICB0b2tlbjogJ3gnLFxuICBzYW5kYm94OiB0cnVlLFxuICB1cGxvYWQsXG59KTtcblxuY29uc3Qgd29yayA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgZG9jcyA9IGF3YWl0IGNsaWVudCgnZ3prJyk7XG4gIHJldHVybiBQcm9taXNlLmFsbChcbiAgICBkb2NzLm1hcCh4ID0+IHVwZGF0ZU9uZSgnZG9jdW1lbnQnLCB7IHJvb3RJZDogeC5yb290SWQgfSwgeCkpXG4gICk7XG59O1xuXG53b3JrKClcbiAgLnRoZW4oY2xvc2UpXG4gIC50aGVuKHggPT4ge1xuICAgIGNvbnNvbGUubG9nKCdET05FJyk7XG4gIH0pO1xuIl19
