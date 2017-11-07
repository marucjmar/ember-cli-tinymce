/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-tinymce',
  contentFor: function(type, config) {
    var content = '';

    if (type === 'head-footer' && config['tinyMCE'] && config['tinyMCE']['load']) {
      var src = "//cdn.tinymce.com/"+ config['tinyMCE']['version'] +"/tinymce.min.js";
      content = '<script type="text/javascript" src="' + src + '"></script>';
    }
    return content;
  },
  included: function(app) {
    app.import('app/styles/addons.css');
  }
};
