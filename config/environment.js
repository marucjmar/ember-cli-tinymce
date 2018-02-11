/* eslint-env node */
'use strict';

module.exports = function() {
  return {
    tinyMCE: {
      load: 'cdn',
      version: 4.4,
      skin: 'lightgray',
      themes: [ 'modern' ],
      plugins: undefined
    }
  };
};
