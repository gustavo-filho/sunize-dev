const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@domain': 'src/domain',
    '@shared': 'src/shared',
  })(config);

  return config;
};
