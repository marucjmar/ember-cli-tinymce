import Ember from 'ember';

export default Ember.Component.extend({
  editor: undefined,
  tagName: 'textarea',

  // Change the editor content if value changes
  valueChanged: Ember.observer('value', function() {
    let editor = this.get('editor');
    if (editor && editor.getContent() !== this.get('value')) {
      editor.setContent(this.get('value') || '');
    }
  }),

  // Change de value if editor content changes
  contentChanged(editor) {
    this.set('value', editor.getContent());
  },

  //Bind events to function
  setEvents: Ember.observer('editor', function() {
    let editor = this.get('editor'), self =  this;
    editor.on('change keyup keydown keypress mousedown', function(){
      Ember.run.debounce(self, self.contentChanged, editor, 1);
    });
  }),

  // Initialize tinymce
  initTiny: Ember.on('didInsertElement', Ember.observer('options', function() {
    var self = this, options = this.get('options'), editor = this.get('editor');

    let customOptions = {
      selector: `#${self.get('elementId')}`,
      init_instance_callback : function(editor) {
        self.set('editor', editor);
        self.get('editor').setContent(self.get('value')); //Set content with default text  
      },
    };

    if (editor){
      editor.destroy();
    }

    tinymce.init(Ember.$.extend( customOptions, options ));
  }))
});
