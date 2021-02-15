/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-tinymce',
  contentFor: function (type, config) {
    const apiKey = config['tinyMCE']['apiKey'];

    if (!apiKey) {
      throw Error('No `apiKey` in tinyMCE env config');
    }

    if (
      type === 'head-footer' &&
      config['tinyMCE'] &&
      config['tinyMCE']['load']
    ) {
      const version = config['tinyMCE']['version'];
      const referrerpolicy = config['tinyMCE']['refererPolicy'] || 'origin';
      const src = config['tinyMCE']['scriptSrc'] || `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${version}/tinymce.min.js`;

      return `<script type='text/javascript' src='${src}' crossorigin='${referrerpolicy}'></script>`;
    }
    return '';
  },
  included: function (app) {
    app.import('app/styles/addons.css');
  },
};
