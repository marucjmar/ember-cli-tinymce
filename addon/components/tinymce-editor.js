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
    this.set('value', this.get('editor').getContent())
  },

  setEvents: Ember.observer('editor', function() {
    let editor = this.get('editor'), self =  this
    editor.on('change keyup keydown keypress mousedown', function(){
      Ember.run.debounce(self, self.contentChanged, editor, 1);
    })
  }),

  // Initialize tinymce
  initTiny: Ember.on('didInsertElement', Ember.observer('options', function() {
    var self = this, options = this.get('options'), editor = this.get('editor');

    let customOptions = {
      selector: `#${self.get('elementId')}`,
      init_instance_callback : function(editor) {
        self.set('editor', editor);
      },
    };

    if (editor)
      editor.destroy()

    tinymce.init($.extend( customOptions, options ));
  }))
});
