'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return {
    typeDefs: '\n      scalar DateTime\n      scalar Date\n    ',
    resolvers: {
      Date: _type2.default,
      DateTime: _type2.default
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLWFwaS10eXBlLWRhdGUvaW5kZXguZXM2Il0sIm5hbWVzIjpbInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiRGF0ZSIsIkRhdGVUaW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O2tCQUVlLG1CQUFXO0FBQ3hCLFNBQU87QUFDTEEsZ0VBREs7QUFLTEMsZUFBVztBQUNUQywwQkFEUztBQUVUQztBQUZTO0FBTE4sR0FBUDtBQVVELEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtYXBpLXR5cGUtZGF0ZS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIGZyb20gJy4vdHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnMgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGVEZWZzOiBgXG4gICAgICBzY2FsYXIgRGF0ZVRpbWVcbiAgICAgIHNjYWxhciBEYXRlXG4gICAgYCxcbiAgICByZXNvbHZlcnM6IHtcbiAgICAgIERhdGU6IHR5cGUsXG4gICAgICBEYXRlVGltZTogdHlwZSxcbiAgICB9LFxuICB9O1xufTtcbiJdfQ==
