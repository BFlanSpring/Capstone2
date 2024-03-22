const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": false,
      "stream": false,
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
};
