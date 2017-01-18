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

##DDAU
By default the value is updated in the addon. If you want to follow DDAU guidlines please define the onValueChanged action.
```hbs
  {{tinymce-editor options=options value=text onValueChanged=(action "myOnChangedAction")}}
```

and in your controller
```hbs
  actions:{
    ...
    myOnChangedAction (value) => {
      // Do something with the value. 
      // At least the text should be updated:
      this.set('text', value)
    }
  }
```
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
    version: 4 //default 4.4
  }
}
```

#My reputation
If you used and love this addon You can help me with my reputation, when you give me a star on github :+1:


## MIT License

This README outlines the details of collaborating on this Ember addon.

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
