'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _hashids = require('hashids');

var _hashids2 = _interopRequireDefault(_hashids);

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (options) {
  if (!options.uri) {
    throw new Error('Missing URI for mongodb');
  }

  var dictionary = options.dictionary || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._*';

  var adapter = new _adapter2.default(options);

  return {
    resolvers: {
      ID: (0, _type2.default)(options.hash ? new _hashids2.default(options.hash, 0, dictionary) : null)
    },
    context: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var db;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return adapter.connectToDatabase();

              case 2:
                db = _context.sent;
                return _context.abrupt('return', {
                  updateOne: adapter.updateOne,
                  findOne: adapter.findOne,
                  find: adapter.find,
                  done: adapter.done,
                  transform: adapter.transform,
                  toID: adapter.toID,

                  adapter: adapter,
                  collection: db.collection,
                  db: db
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function context() {
        return _ref.apply(this, arguments);
      }

      return context;
    }()
  };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL21vbmdvZGIvaW5kZXguZXM2Il0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmkiLCJFcnJvciIsImRpY3Rpb25hcnkiLCJhZGFwdGVyIiwicmVzb2x2ZXJzIiwiSUQiLCJoYXNoIiwiY29udGV4dCIsImNvbm5lY3RUb0RhdGFiYXNlIiwiZGIiLCJ1cGRhdGVPbmUiLCJmaW5kT25lIiwiZmluZCIsImRvbmUiLCJ0cmFuc2Zvcm0iLCJ0b0lEIiwiY29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWUsbUJBQVc7QUFDeEIsTUFBSSxDQUFDQSxRQUFRQyxHQUFiLEVBQWtCO0FBQ2hCLFVBQU0sSUFBSUMsS0FBSixDQUFVLHlCQUFWLENBQU47QUFDRDs7QUFFRCxNQUFNQyxhQUNKSCxRQUFRRyxVQUFSLElBQ0Esb0VBRkY7O0FBSUEsTUFBTUMsVUFBVSxzQkFBWUosT0FBWixDQUFoQjs7QUFFQSxTQUFPO0FBQ0xLLGVBQVc7QUFDVEMsVUFBSSxvQkFBS04sUUFBUU8sSUFBUixHQUFlLHNCQUFZUCxRQUFRTyxJQUFwQixFQUEwQixDQUExQixFQUE2QkosVUFBN0IsQ0FBZixHQUEwRCxJQUEvRDtBQURLLEtBRE47QUFJTEs7QUFBQSw0RUFBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUNVSixRQUFRSyxpQkFBUixFQURWOztBQUFBO0FBQ0RDLGtCQURDO0FBQUEsaURBRUE7QUFDTEMsNkJBQVdQLFFBQVFPLFNBRGQ7QUFFTEMsMkJBQVNSLFFBQVFRLE9BRlo7QUFHTEMsd0JBQU1ULFFBQVFTLElBSFQ7QUFJTEMsd0JBQU1WLFFBQVFVLElBSlQ7QUFLTEMsNkJBQVdYLFFBQVFXLFNBTGQ7QUFNTEMsd0JBQU1aLFFBQVFZLElBTlQ7O0FBUUxaLGtDQVJLO0FBU0xhLDhCQUFZUCxHQUFHTyxVQVRWO0FBVUxQO0FBVkssaUJBRkE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBVDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUpLLEdBQVA7QUFvQkQsQyIsImZpbGUiOiJwYWNrYWdlcy9tb25nb2RiL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhc2hpZHMgZnJvbSAnaGFzaGlkcyc7XG5pbXBvcnQgdHlwZSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucyA9PiB7XG4gIGlmICghb3B0aW9ucy51cmkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgVVJJIGZvciBtb25nb2RiJyk7XG4gIH1cblxuICBjb25zdCBkaWN0aW9uYXJ5ID1cbiAgICBvcHRpb25zLmRpY3Rpb25hcnkgfHxcbiAgICAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjEyMzQ1Njc4OTAtLl8qJztcblxuICBjb25zdCBhZGFwdGVyID0gbmV3IEFkYXB0ZXIob3B0aW9ucyk7XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlcnM6IHtcbiAgICAgIElEOiB0eXBlKG9wdGlvbnMuaGFzaCA/IG5ldyBIYXNoaWRzKG9wdGlvbnMuaGFzaCwgMCwgZGljdGlvbmFyeSkgOiBudWxsKVxuICAgIH0sXG4gICAgY29udGV4dDogYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGIgPSBhd2FpdCBhZGFwdGVyLmNvbm5lY3RUb0RhdGFiYXNlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cGRhdGVPbmU6IGFkYXB0ZXIudXBkYXRlT25lLFxuICAgICAgICBmaW5kT25lOiBhZGFwdGVyLmZpbmRPbmUsXG4gICAgICAgIGZpbmQ6IGFkYXB0ZXIuZmluZCxcbiAgICAgICAgZG9uZTogYWRhcHRlci5kb25lLFxuICAgICAgICB0cmFuc2Zvcm06IGFkYXB0ZXIudHJhbnNmb3JtLFxuICAgICAgICB0b0lEOiBhZGFwdGVyLnRvSUQsXG5cbiAgICAgICAgYWRhcHRlcixcbiAgICAgICAgY29sbGVjdGlvbjogZGIuY29sbGVjdGlvbixcbiAgICAgICAgZGJcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcbiJdfQ==
