/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    tinyMCE:{
      load: true,
      version: 4.4,
      sriHash: 'sha384-UZSyGLGIxzE8WkhLcUfTE3QaH6CqksfVD81Skbe8PXMP/dnz26QRhvQ0RruUlw9U'
    }
  };
};
