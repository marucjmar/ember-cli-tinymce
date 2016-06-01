import Ember from 'ember';
import layout from '../templates/components/tinymce-editor';

export default Ember.Component.extend({
  layout,
  classNames: ['tinymce-content'],
  editor: undefined,


  _change(editor){
    this.set('value', this.get('editor').getContent())
  },

  setEvents: Ember.observer('editor', function() {
    let editor = this.get('editor'), self =  this
    editor.on('change keyup keydown keypress mousedown', function(){
      Ember.run.debounce(self, self._change, editor, 1);
    })
  }),

  randomId: Ember.computed(function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }),


  initTiny: Ember.on('didInsertElement', Ember.observer('options', function(){
     this._ititTiny()
  })),

  _ititTiny(){
    var self = this, options = this.get('options'), editor = this.get('editor');

    let customOptions = {
      selector: `#${self.get('randomId')}`,
      init_instance_callback : function(editor) {
        self.set('editor', editor)
      },
    };

    if (editor)
      editor.destroy()

    tinymce.init($.extend( customOptions, options ));
  }
});
