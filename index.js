/* eslint-env node */
'use strict';

var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var defaultConfig = require('./config/environment')();
var map = require('broccoli-stew').map;
var fs = require('fs');
var files = ['tinymce.min.js'];

module.exports = {
  name: 'ember-cli-tinymce',
  contentFor: function(type, config) {
    config = Object.assign(defaultConfig, config)
    var content = '';

    if (type === 'head-footer' && config['tinyMCE'] && config['tinyMCE']['load'] === 'cdn') {
      var src = "//cdn.tinymce.com/"+ config['tinyMCE']['version'] +"/tinymce.min.js";
      content = '<script type="text/javascript" src="' + src + '"></script>';
    }

    return content;
  },

  treeForVendor(vendorTree) {
    var config = this.project.config() || {};
    
    var tinymce = new Funnel(
      path.join(this.project.root, 'node_modules', 'tinymce'),
      { files: files, destDir: 'tinymce' }
    );

    tinymce = map(
      tinymce,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return vendorTree ? new MergeTrees([vendorTree, tinymce]) : tinymce;
  },

  included: function(app) {
    app.import('app/styles/addons.css');

    const config = Object.assign(defaultConfig.tinyMCE, this.project.config().tinyMCE) || {};

    if (config.load !== 'assets') return
    const skin = config.skin;
    var assets = walkSync(path.join(this.project.root, 'node_modules', 'tinymce', 'skins', `${skin}/`));

    assets.forEach((asset) => {
      let opts = {
        destDir: `assets/skins/${skin}/` + (asset.includes('/') ? asset.split('/')[0] : '')
      }
      if (asset.includes('.css')) opts.outputFile = `${opts.destDir}/${asset}`
      
      app.import(['node_modules', 'tinymce', 'skins', `${skin}`, asset].join('/'), opts);
    })

    config.themes.forEach(function(theme) {
      files.push(`themes/${theme}/theme.min.js`)
    })

    config.themes.forEach(function(theme) {
      files.push(`themes/${theme}/theme.min.js`)
    })

    var plugins = config.plugins || fs.readdirSync(path.join(this.project.root, 'node_modules', 'tinymce', 'plugins'));
    
    plugins.forEach(function(pluginName) {
      files.push(`plugins/${pluginName}/plugin.min.js`)
    })

    files.forEach(function(file) {
      app.import(`vendor/tinymce/${file}`, { destDir: 'tinymce' });
    })
  }
};


var walkSync = function(dir, filelist, subDirName = '') {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist, `${file}/`);
    }
    else {
      filelist.push(`${subDirName}${file}`);
    }
  });
  return filelist;
};