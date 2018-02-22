'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwksRsa = require('jwks-rsa');

var _jwksRsa2 = _interopRequireDefault(_jwksRsa);

var _auth = require('auth0');

var _getToken = require('./get-token');

var _getToken2 = _interopRequireDefault(_getToken);

var _transformUser = require('./transform-user');

var _transformUser2 = _interopRequireDefault(_transformUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (options) {
  var MANAGEMENT_CLIENT_ID = options.managementClientId;
  var MANAGEMENT_CLIENT_SECRET = options.managementClientSecret;
  var MANAGEMENT_CLIENT_AUDIENCE = options.managementClientAudience;
  var DOMAIN = options.domain;
  var AUDIENCE = options.audience;
  var ACCESS = options.access || 'https://' + options.domain + '/access';
  var TOKEN_ISSUER = options.issuer || 'https://' + options.domain + '/';
  var JWKS_URI = options.jwks || 'https://' + options.domain + '/.well-known/jwks.json';
  var MANAGEMENT_SCOPES = options.managementScopes || 'read:users';

  var auth0 = void 0;
  var getManagementClient = function getManagementClient() {
    if (!auth0) {
      auth0 = new _auth.ManagementClient({
        domain: DOMAIN,
        clientId: MANAGEMENT_CLIENT_ID,
        clientSecret: MANAGEMENT_CLIENT_SECRET,
        audience: MANAGEMENT_CLIENT_AUDIENCE || 'https://' + DOMAIN + '/api/v2/',
        scope: MANAGEMENT_SCOPES
      });
    }
    return Promise.resolve(auth0);
  };

  var cache = {};
  // Reusable Authorizer function, set on `authorizer` field in serverless.yml
  var auth = function auth(tokenString) {
    if (!tokenString) {
      return Promise.resolve(null);
    }
    if (cache[tokenString]) {
      return Promise.resolve(cache[tokenString]);
    }
    var token = (0, _getToken2.default)(tokenString);
    var client = (0, _jwksRsa2.default)({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 10, // Default value
      jwksUri: JWKS_URI
    });

    return new Promise(function (yay, nay) {
      var decoded = _jsonwebtoken2.default.decode(token, { complete: true });
      if (!decoded) {
        return nay(new Error('Malformed jwt'));
      }
      var kid = decoded.header.kid;


      client.getSigningKey(kid, function (err, key) {
        if (err) {
          nay(err);
        } else {
          var signingKey = key.publicKey || key.rsaPublicKey;
          _jsonwebtoken2.default.verify(token, signingKey, { audience: AUDIENCE, issuer: TOKEN_ISSUER, algorithms: ['RS256'] }, function (err, decoded) {
            if (err) {
              nay(err);
            } else {
              cache[tokenString] = {
                isAuthenticated: true,
                userId: decoded.sub,
                access: decoded[ACCESS] ? decoded[ACCESS] : {},
                scope: decoded.scope,
                token: token
              };
              yay(cache[tokenString]);
            }
          });
        }
      });
    });
  };

  var context = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref) {
      var event = _ref.event;

      var accessToken, promises, _ref3, _ref4, auth0, context;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              accessToken = event.headers.Authorization || event.headers.authorization;
              promises = [getManagementClient()];

              if (accessToken) {
                promises.push(auth(accessToken).catch(function (err) {
                  return {};
                }));
              }
              _context2.next = 5;
              return Promise.all(promises);

            case 5:
              _ref3 = _context2.sent;
              _ref4 = _slicedToArray(_ref3, 2);
              auth0 = _ref4[0];
              context = _ref4[1];
              return _context2.abrupt('return', Object.assign({}, context, {
                auth0: auth0,
                getUser: function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var user;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (context.userId) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt('return', null);

                          case 2:
                            _context.next = 4;
                            return auth0.getUser({ id: context.userId });

                          case 4:
                            user = _context.sent;
                            return _context.abrupt('return', (0, _transformUser2.default)(user));

                          case 6:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, undefined);
                  }));

                  function getUser() {
                    return _ref5.apply(this, arguments);
                  }

                  return getUser;
                }()
              }));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function context(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return { context: context };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLWFwaS1hdXRoMC9pbmRleC5lczYiXSwibmFtZXMiOlsiTUFOQUdFTUVOVF9DTElFTlRfSUQiLCJvcHRpb25zIiwibWFuYWdlbWVudENsaWVudElkIiwiTUFOQUdFTUVOVF9DTElFTlRfU0VDUkVUIiwibWFuYWdlbWVudENsaWVudFNlY3JldCIsIk1BTkFHRU1FTlRfQ0xJRU5UX0FVRElFTkNFIiwibWFuYWdlbWVudENsaWVudEF1ZGllbmNlIiwiRE9NQUlOIiwiZG9tYWluIiwiQVVESUVOQ0UiLCJhdWRpZW5jZSIsIkFDQ0VTUyIsImFjY2VzcyIsIlRPS0VOX0lTU1VFUiIsImlzc3VlciIsIkpXS1NfVVJJIiwiandrcyIsIk1BTkFHRU1FTlRfU0NPUEVTIiwibWFuYWdlbWVudFNjb3BlcyIsImF1dGgwIiwiZ2V0TWFuYWdlbWVudENsaWVudCIsImNsaWVudElkIiwiY2xpZW50U2VjcmV0Iiwic2NvcGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhY2hlIiwiYXV0aCIsInRva2VuU3RyaW5nIiwidG9rZW4iLCJjbGllbnQiLCJyYXRlTGltaXQiLCJqd2tzUmVxdWVzdHNQZXJNaW51dGUiLCJqd2tzVXJpIiwieWF5IiwibmF5IiwiZGVjb2RlZCIsImRlY29kZSIsImNvbXBsZXRlIiwiRXJyb3IiLCJraWQiLCJoZWFkZXIiLCJnZXRTaWduaW5nS2V5IiwiZXJyIiwia2V5Iiwic2lnbmluZ0tleSIsInB1YmxpY0tleSIsInJzYVB1YmxpY0tleSIsInZlcmlmeSIsImFsZ29yaXRobXMiLCJpc0F1dGhlbnRpY2F0ZWQiLCJ1c2VySWQiLCJzdWIiLCJjb250ZXh0IiwiZXZlbnQiLCJhY2Nlc3NUb2tlbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYXV0aG9yaXphdGlvbiIsInByb21pc2VzIiwicHVzaCIsImNhdGNoIiwiYWxsIiwiZ2V0VXNlciIsImlkIiwidXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFD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QUFBO0FBQUEsS0FBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFOOztBQXlCQSxTQUFPLEVBQUVaLGdCQUFGLEVBQVA7QUFDRCxDIiwiZmlsZSI6InBhY2thZ2VzL29seW1wLWFwaS1hdXRoMC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCBqd2tzQ2xpZW50IGZyb20gJ2p3a3MtcnNhJztcbmltcG9ydCB7IE1hbmFnZW1lbnRDbGllbnQgfSBmcm9tICdhdXRoMCc7XG5pbXBvcnQgZ2V0VG9rZW4gZnJvbSAnLi9nZXQtdG9rZW4nO1xuaW1wb3J0IHRyYW5zZm9ybVVzZXIgZnJvbSAnLi90cmFuc2Zvcm0tdXNlcic7XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnMgPT4ge1xuICBjb25zdCBNQU5BR0VNRU5UX0NMSUVOVF9JRCA9IG9wdGlvbnMubWFuYWdlbWVudENsaWVudElkO1xuICBjb25zdCBNQU5BR0VNRU5UX0NMSUVOVF9TRUNSRVQgPSBvcHRpb25zLm1hbmFnZW1lbnRDbGllbnRTZWNyZXQ7XG4gIGNvbnN0IE1BTkFHRU1FTlRfQ0xJRU5UX0FVRElFTkNFID0gb3B0aW9ucy5tYW5hZ2VtZW50Q2xpZW50QXVkaWVuY2U7XG4gIGNvbnN0IERPTUFJTiA9IG9wdGlvbnMuZG9tYWluO1xuICBjb25zdCBBVURJRU5DRSA9IG9wdGlvbnMuYXVkaWVuY2U7XG4gIGNvbnN0IEFDQ0VTUyA9IG9wdGlvbnMuYWNjZXNzIHx8IGBodHRwczovLyR7b3B0aW9ucy5kb21haW59L2FjY2Vzc2A7XG4gIGNvbnN0IFRPS0VOX0lTU1VFUiA9IG9wdGlvbnMuaXNzdWVyIHx8IGBodHRwczovLyR7b3B0aW9ucy5kb21haW59L2A7XG4gIGNvbnN0IEpXS1NfVVJJID1cbiAgICBvcHRpb25zLmp3a3MgfHwgYGh0dHBzOi8vJHtvcHRpb25zLmRvbWFpbn0vLndlbGwta25vd24vandrcy5qc29uYDtcbiAgY29uc3QgTUFOQUdFTUVOVF9TQ09QRVMgPSBvcHRpb25zLm1hbmFnZW1lbnRTY29wZXMgfHwgJ3JlYWQ6dXNlcnMnO1xuXG4gIGxldCBhdXRoMDtcbiAgY29uc3QgZ2V0TWFuYWdlbWVudENsaWVudCA9ICgpID0+IHtcbiAgICBpZiAoIWF1dGgwKSB7XG4gICAgICBhdXRoMCA9IG5ldyBNYW5hZ2VtZW50Q2xpZW50KHtcbiAgICAgICAgZG9tYWluOiBET01BSU4sXG4gICAgICAgIGNsaWVudElkOiBNQU5BR0VNRU5UX0NMSUVOVF9JRCxcbiAgICAgICAgY2xpZW50U2VjcmV0OiBNQU5BR0VNRU5UX0NMSUVOVF9TRUNSRVQsXG4gICAgICAgIGF1ZGllbmNlOiBNQU5BR0VNRU5UX0NMSUVOVF9BVURJRU5DRSB8fCBgaHR0cHM6Ly8ke0RPTUFJTn0vYXBpL3YyL2AsXG4gICAgICAgIHNjb3BlOiBNQU5BR0VNRU5UX1NDT1BFUyxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGF1dGgwKTtcbiAgfTtcblxuICBjb25zdCBjYWNoZSA9IHt9O1xuICAvLyBSZXVzYWJsZSBBdXRob3JpemVyIGZ1bmN0aW9uLCBzZXQgb24gYGF1dGhvcml6ZXJgIGZpZWxkIGluIHNlcnZlcmxlc3MueW1sXG4gIGNvbnN0IGF1dGggPSB0b2tlblN0cmluZyA9PiB7XG4gICAgaWYgKCF0b2tlblN0cmluZykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gICAgaWYgKGNhY2hlW3Rva2VuU3RyaW5nXSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjYWNoZVt0b2tlblN0cmluZ10pO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IGdldFRva2VuKHRva2VuU3RyaW5nKTtcbiAgICBjb25zdCBjbGllbnQgPSBqd2tzQ2xpZW50KHtcbiAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgcmF0ZUxpbWl0OiB0cnVlLFxuICAgICAgandrc1JlcXVlc3RzUGVyTWludXRlOiAxMCwgLy8gRGVmYXVsdCB2YWx1ZVxuICAgICAgandrc1VyaTogSldLU19VUkksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHlheSwgbmF5KSA9PiB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gand0LmRlY29kZSh0b2tlbiwgeyBjb21wbGV0ZTogdHJ1ZSB9KTtcbiAgICAgIGlmICghZGVjb2RlZCkge1xuICAgICAgICByZXR1cm4gbmF5KG5ldyBFcnJvcignTWFsZm9ybWVkIGp3dCcpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsga2lkIH0gPSBkZWNvZGVkLmhlYWRlcjtcblxuICAgICAgY2xpZW50LmdldFNpZ25pbmdLZXkoa2lkLCAoZXJyLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIG5heShlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNpZ25pbmdLZXkgPSBrZXkucHVibGljS2V5IHx8IGtleS5yc2FQdWJsaWNLZXk7XG4gICAgICAgICAgand0LnZlcmlmeShcbiAgICAgICAgICAgIHRva2VuLFxuICAgICAgICAgICAgc2lnbmluZ0tleSxcbiAgICAgICAgICAgIHsgYXVkaWVuY2U6IEFVRElFTkNFLCBpc3N1ZXI6IFRPS0VOX0lTU1VFUiwgYWxnb3JpdGhtczogWydSUzI1NiddIH0sXG4gICAgICAgICAgICAoZXJyLCBkZWNvZGVkKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBuYXkoZXJyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWNoZVt0b2tlblN0cmluZ10gPSB7XG4gICAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICB1c2VySWQ6IGRlY29kZWQuc3ViLFxuICAgICAgICAgICAgICAgICAgYWNjZXNzOiBkZWNvZGVkW0FDQ0VTU10gPyBkZWNvZGVkW0FDQ0VTU10gOiB7fSxcbiAgICAgICAgICAgICAgICAgIHNjb3BlOiBkZWNvZGVkLnNjb3BlLFxuICAgICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB5YXkoY2FjaGVbdG9rZW5TdHJpbmddKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNvbnRleHQgPSBhc3luYyAoeyBldmVudCB9KSA9PiB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPVxuICAgICAgZXZlbnQuaGVhZGVycy5BdXRob3JpemF0aW9uIHx8IGV2ZW50LmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtnZXRNYW5hZ2VtZW50Q2xpZW50KCldO1xuICAgIGlmIChhY2Nlc3NUb2tlbikge1xuICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgYXV0aChhY2Nlc3NUb2tlbikuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBbYXV0aDAsIGNvbnRleHRdID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5jb250ZXh0LFxuICAgICAgYXV0aDAsXG4gICAgICBnZXRVc2VyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghY29udGV4dC51c2VySWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXV0aDAuZ2V0VXNlcih7IGlkOiBjb250ZXh0LnVzZXJJZCB9KTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVVzZXIodXNlcik7XG4gICAgICB9LFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHsgY29udGV4dCB9O1xufTtcbiJdfQ==
