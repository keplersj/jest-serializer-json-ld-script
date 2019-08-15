# jest-serializer-json-ld-script

[![Build Status](https://travis-ci.org/keplersj/jest-serializer-json-ld-script.svg?branch=master)](https://travis-ci.org/keplersj/jest-preset-gatsby)
[![npm version](https://badge.fury.io/js/jest-serializer-json-ld-script.svg)](https://badge.fury.io/js/jest-preset-gatsby)

Jest Snapshot serializer to better visualize React `<script>` elements containing LD+JSON data.

## Installation

Install preset using npm:

```shell
npm install --save-dev jest-serializer-json-ld-script
```

or yarn:

```shell
yarn add --dev jest-serializer-json-ld-script
```

## Usage

Configure Jest to use the serializer in `jest.config.js`:

```js
module.exports = {
  snapshotSerializers: ["jest-serializer-json-ld-script"]
};
```

or `package.json`:

```json
{
  "jest": {
    "snapshotSerializers": ["jest-serializer-json-ld-script"]
  }
}
```

## Related Packages

- [`jest-runner-prettier`](https://github.com/keplersj/jest-runner-prettier) - Use Jest to check your codebase against `prettier`
- [`jest-preset-gatsby`](https://github.com/keplersj/jest-preset-gatsby) - Jest preset to ease unit testing a Gatsby project
- [`jest-serializer-react-helmet`](https://github.com/keplersj/jest-serializer-react-helmet) - Jest snapshot serializer to include React Helmet side effects in snapshots
- [`jest-raw-loader`](https://github.com/keplersj/jest-raw-loader) - Load the raw content of files in Jest, replicating the behavior of `webpack`'s `raw-loader`

## License

Copyright 2019 Kepler Sticka-Jones. Licensed ISC
