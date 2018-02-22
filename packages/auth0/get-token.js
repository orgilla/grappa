"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// extract and return the Bearer Token from the Lambda event parameters
exports.default = function (tokenString) {
  if (!tokenString) {
    throw new Error("Expected 'event.authorizationToken' parameter to be set");
  }

  var match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error("Invalid Authorization token - '" + tokenString + "' does not match 'Bearer .*'");
  }
  return match[1];
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLWFwaS1hdXRoMC9nZXQtdG9rZW4uZXM2Il0sIm5hbWVzIjpbInRva2VuU3RyaW5nIiwiRXJyb3IiLCJtYXRjaCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7a0JBQ2UsdUJBQWU7QUFDNUIsTUFBSSxDQUFDQSxXQUFMLEVBQWtCO0FBQ2hCLFVBQU0sSUFBSUMsS0FBSixDQUFVLHlEQUFWLENBQU47QUFDRDs7QUFFRCxNQUFNQyxRQUFRRixZQUFZRSxLQUFaLENBQWtCLGVBQWxCLENBQWQ7QUFDQSxNQUFJLENBQUNBLEtBQUQsSUFBVUEsTUFBTUMsTUFBTixHQUFlLENBQTdCLEVBQWdDO0FBQzlCLFVBQU0sSUFBSUYsS0FBSixxQ0FDOEJELFdBRDlCLGtDQUFOO0FBR0Q7QUFDRCxTQUFPRSxNQUFNLENBQU4sQ0FBUDtBQUNELEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtYXBpLWF1dGgwL2dldC10b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3QgYW5kIHJldHVybiB0aGUgQmVhcmVyIFRva2VuIGZyb20gdGhlIExhbWJkYSBldmVudCBwYXJhbWV0ZXJzXG5leHBvcnQgZGVmYXVsdCB0b2tlblN0cmluZyA9PiB7XG4gIGlmICghdG9rZW5TdHJpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCAnZXZlbnQuYXV0aG9yaXphdGlvblRva2VuJyBwYXJhbWV0ZXIgdG8gYmUgc2V0XCIpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSB0b2tlblN0cmluZy5tYXRjaCgvXkJlYXJlciAoLiopJC8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgSW52YWxpZCBBdXRob3JpemF0aW9uIHRva2VuIC0gJyR7dG9rZW5TdHJpbmd9JyBkb2VzIG5vdCBtYXRjaCAnQmVhcmVyIC4qJ2BcbiAgICApO1xuICB9XG4gIHJldHVybiBtYXRjaFsxXTtcbn07XG4iXX0=
