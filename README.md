<div align="center">
  <a href="https://github.com/bkniffler/grappa">
    <img alt="grappa" src="https://raw.githubusercontent.com/bkniffler/grappa/master/assets/logo.png" height="250px" />
  </a>
</div>

<div align="center">
  <h2>grappa</h2>
  <strong>An easy GraphQL API composer with plugins</strong>
  <br />
  <br />
  <a href="https://travis-ci.org/bkniffler/grappa">
    <img src="https://img.shields.io/travis/bkniffler/grappa.svg?style=flat-square" alt="Build Status">
  </a>
  <a href="https://codecov.io/github/bkniffler/grappa">
    <img src="https://img.shields.io/codecov/c/github/bkniffler/grappa.svg?style=flat-square" alt="Coverage Status">
  </a>
  <a href="https://www.npmjs.com/package/@grappa/core">
    <img src="https://img.shields.io/npm/dm/@grappa/core.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://github.com/bkniffler/grappa">
    <img src="https://img.shields.io/github/issues/bkniffler/grappa.svg?style=flat-square" alt="Issues">
  </a>
  <a href="https://github.com/bkniffler/grappa">
    <img src="https://img.shields.io/github/package-json/v/bkniffler/grappa.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://github.com/bkniffler/grappa">
    <img src="https://img.shields.io/github/forks/bkniffler/grappa.svg?style=flat-square" alt="Forks">
  </a>
  <a href="https://github.com/bkniffler/grappa">
    <img src="https://img.shields.io/github/stars/bkniffler/grappa.svg?style=flat-square" alt="Stars">
  </a>
  <a href="https://github.com/bkniffler/grappa/master/LICENSE">
    <img src="https://img.shields.io/github/license/bkniffler/grappa.svg?style=flat-square" alt="License">
  </a>
  <br />
  <br />
</div>

An easy GraphQL API composer with plugins. It uses graphql-yoga under the hood.

## Kickstart

```bash
npm i @grappa/api
# More
npm i @grappa/mongodb @grappa/auth0 @grappa/type-date @grappa/type-json
```

```jsx
import api from '@grappa/api';
import createAuth0 from '@grappa/auth0';
import createTypeJSON from '@grappa/type-json';
import createTypeDate from '@grappa/type-date';
import createMongoDB from '@grappa/mongodb';

const client = api({
  typeDefs: `
    type User {
      id: ID!
      name: String
    }
    type Query {
      user(id: ID): String
      endpoint(id: ID): String
    }
  `,
  resolvers: {
    Query: {
      // Get user with auth0
      user: (parent, args, { getUser }) => getUser(),
      // Find item by id
      endpoint: (parent, { id }, { find }) => find('collection1', id),
    },
  },
  plugins: [
    createAuth0({
      managementClientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      managementClientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      managementClientAudience: process.env.AUTH0_MANAGEMENT_CLIENT_AUDIENCE,
      domain: process.env.AUTH0_DOMAIN,
      audience: process.env.AUTH0_AUDIENCE,
    }),
    createTypeDate(),
    createTypeJSON(),
    createMongoDB({
      uri: process.env.MONGODB_URI,
      hash: process.env.MONGODB_URI,
    }),
  ],
});

export const { playground, server, voyager } = client;
```

## Plugins

### Databases

* [@grappa/mongodb](https://github.com/bkniffler/grappa/tree/master/packages/mongodb): MongoDB plugin

### Services

* [@grappa/auth0](https://github.com/bkniffler/grappa/tree/master/packages/auth0): Auth0 plugin

### Types

* [@grappa/type-date](https://github.com/bkniffler/grappa/tree/master/packages/type-date): Date/DateTime types
* [@grappa/type-json](https://github.com/bkniffler/grappa/tree/master/packages/type-json): Json type

## Motivation

## Contributing

Contributions always welcome, feel free to PR with new features/plugins or bugfixes if you like.

## Ref

* [graphql](https://github.com/graphql/graphql): GraphQL
* [graphql-yoga](https://github.com/facebook/graphql-yoga): Graphql Yoga.
