/* eslint-env node */
module.exports = {
  description: '',

  afterInstall: function () {
    return this.addPackagesToProject([
      { name: 'tinymce', target: '4.7.6' }
    ]);
  }
};
