Ember-cli-tinymce
-----------------
This ember-cli addon provides you with a wysiwyg-editor component, based on [TinyMCE](https://www.tinymce.com/)


##Demo

[Demo page](http://marucjmar.github.io/ember-cli-tinymce)

#Installation
To get started simply install the addon:

     ember install ember-cli-tinymce


##Component


    {{tinymce-editor options=options value=text}}


 - *options* attribute is full powered to [tinymce documentation](https://www.tinymce.com/docs/configure/). when options did changed, then editor is update.
 - *value* - the html text generate by editor.

If you should display the *value*, use the *{{{value}}}* helper for HTML text in the handlebars.

##You can set the load partial

environment.js config

    ENV:{
      ...,
      tinyMCE:{
        load: false
      }
    }

In route

    beforeModel(){
      this._super(...arguments);
      if (typeof tinymce == 'undefined'){
        return Ember.$.getScript('//cdn.tinymce.com/4/tinymce.min.js');
      }
    }

##You can also set the version to fetch from the CDN
 - be aware *ver* is a semver reflection of the Tinymce CDN which can introduce issues if a bad release is automatically picked up by your application
```
ENV:{
  ...,
  tinyMCE:{
    ver: 4
  }
}
```



## MIT License


# Ember-cli-tinymce

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
